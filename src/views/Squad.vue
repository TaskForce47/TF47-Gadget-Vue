<template>
	<div>
		<template v-if="squad && ready">
			<v-card>
				<v-card-title>
					<v-tooltip right>
						<template v-slot:activator="{ on, attrs }">
							<v-btn outlined active-class="" v-on="on" v-bind="attrs" to="/administration/squadmanager">
								<v-icon>mdi-chevron-left</v-icon>
							</v-btn>
						</template>
						<span>Back</span>
					</v-tooltip>
					<v-spacer></v-spacer>
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-icon @click="copyXMLLink()" v-on="on" v-bind="attrs">mdi-content-copy</v-icon>
						</template>
						<span>Copy XML Link</span>
					</v-tooltip>
					<v-btn style="margin-left: 1rem" color="green" outlined @click="uploadSquadPictureModal = true">
						Upload Image
						<v-icon>mdi-upload</v-icon>
					</v-btn>
					<v-btn @click="rebuildSquadXML()" style="margin-left: 1rem" color="warning" outlined>
						Rebuild XML
						<v-icon>mdi-autorenew</v-icon>
					</v-btn>
					<v-btn @click="editModal = true" style="margin-left: 1rem" color="buttons" outlined>
						<v-icon>mdi-pencil</v-icon>
					</v-btn>
					<v-btn @click="deleteModal = true" style="margin-left: 1rem" color="error" outlined>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</v-card-title>
				<div class="ml-4 d-flex mt-6">
					<v-img :src="squadImg" style="max-width: 128px; max-height: 128px">
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									v-if="!ready"
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
								<span v-if="ready && squadImg === ''">No Image</span>
							</v-row>
						</template>
					</v-img>
					<div class="ml-4">
						<div class="d-flex">
							<h1>{{ squad.squadName }}</h1>
							<h1 class="ml-2">[{{ squad.squadNick }}]</h1>
						</div>
						<div class="d-flex flex-column">
							<span>Email: {{ squad.squadEmail }}</span>
							<span>Web: {{ squad.squadWeb }}</span>
						</div>
					</div>
				</div>

				<v-card flat>
					<v-card-title>
						<h4>Members</h4>
						<v-spacer></v-spacer>
						<v-btn @click="addModal = true" style="margin-left: 2rem"><v-icon>mdi-plus</v-icon></v-btn>
					</v-card-title>
					<v-card-text>
						<v-data-table
							:headers="headers"
							:items="squad.squadUsers"
							:search="search"
							:items-per-page.sync="numItems"
							:loading="!ready"
							:footer-props="{
					'items-per-page-options': [15, 20],
				}"
						>
							<template v-slot:item.actions="{ item }">
								<v-icon small class="mr-2" @click="openEditSquadMemberModal(item)">
									mdi-pencil
								</v-icon>
								<v-icon small class="mr-2" @click="removeSquadMember(item)">
									mdi-delete
								</v-icon>
							</template>
						</v-data-table>
					</v-card-text>
				</v-card>
			</v-card>
			<v-dialog v-model="deleteModal" max-width="300">
				<v-card>
					<v-card-title class="headline">Delete Squad</v-card-title>

					<v-card-text>
						Do you really want to delete this squad?
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="blue darken-1" text @click="deleteModal = false">
							Cancel
						</v-btn>

						<v-btn color="blue darken-1" text @click="deleteSquad(squadId)">
							Confirm
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>

			<v-dialog id="addModal" v-model="addModal" max-width="600">
				<v-card>
					<v-card-title class="headline">Add Member</v-card-title>

					<v-card-text>
						<SquadMemberTable
							:squad-id="squadId"
							:squad-member="squadMember"
							v-on:addedSquadMember="getSquad()"
						></SquadMemberTable>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="blue darken-1" text @click="addModal = false">
							Close
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="editModal" max-width="500px">
				<v-card>
					<v-card-title>
						<span class="headline">Add Squad</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-form v-model="isFormValid">
								<v-text-field
									v-model="squadModel.squadNick"
									label="Nick"
									:rules="rules.ruleSquadNick"
								></v-text-field>
								<v-text-field
									v-model="squadModel.squadName"
									label="Name"
									:rules="rules.ruleSquadName"
								></v-text-field>
								<v-text-field
									v-model="squadModel.squadEmail"
									label="E-Mail"
									:rules="rules.ruleSquadEmail"
								></v-text-field>
								<v-text-field
									v-model="squadModel.squadWeb"
									label="Web"
									:rules="rules.ruleSquadWeb"
								></v-text-field>
								<v-text-field
									v-model="squadModel.squadTitle"
									label="Title"
									:rules="rules.ruleSquadTitle"
								></v-text-field>
							</v-form>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="editModal = false">Cancel</v-btn>
						<v-btn color="blue darken-1" text :disabled="!isFormValid" @click="editSquad()">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="editSquadMemberModal" max-width="500px">
				<v-card>
					<v-card-title>
						<span class="headline">Edit Squad Member</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<v-form v-model="isFormValid">
								<v-text-field
									v-model="squadMemberModel.email"
									label="E-Mail"
									:rules="rules.ruleSquadEmail"
								></v-text-field>
								<v-text-field
									v-model="squadMemberModel.remark"
									label="Remark"
									:rules="rules.ruleSquadWeb"
								></v-text-field>
							</v-form>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text @click="editSquadMemberModal = false">Cancel</v-btn>
						<v-btn color="blue darken-1" text :disabled="!isFormValid" @click="editSquadMember()">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
			<v-dialog v-model="uploadSquadPictureModal" max-width="500px" persistent>
				<v-card>
					<v-card-title>
						<span class="headline">Upload Squad Image</span>
					</v-card-title>
					<v-card-text>
						<v-container>
							<input
								type="file"
								:multiple="false"
								accept="image/jpeg, image/png, .gif"
								ref="avatar_upload"
							/>
						</v-container>
					</v-card-text>

					<v-card-actions>
						<template v-if="uploading">
							<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
							<span class="ml-2">Uploading Image....</span>
						</template>
						<v-spacer></v-spacer>
						<v-btn color="blue darken-1" text :disabled="uploading" @click="uploadSquadPictureModal = false"
							>Cancel</v-btn
						>
						<v-btn color="blue darken-1" text :disabled="uploading" @click="uploadAvatar()">Save</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
	getSquad,
	deleteSquad,
	rebuildSquadXml,
	getSquadXML,
	removeSquadMember,
	updateSquad,
	updateSquadMember,
	uploadSquadPicture,
} from '@/services/squad';
import SquadMemberTable from '@/components/squadmanager/SquadMemberTable.vue';
import { SquadI } from '@/services/utils/models';
@Component({
	components: { SquadMemberTable },
})
export default class Squad extends Vue {
	private squad: SquadI | null = null;
	private deleteModal = false;
	private addModal = false;
	private squadModel: SquadI | undefined;
	private headers = [
		{ text: 'ID', align: 'center', sortable: true, value: 'userId' },
		{ text: 'Name', align: 'center', sortable: true, value: 'userSquadName' },
		{
			text: 'E-Mail',
			value: 'userSquadEmail',
			align: 'center',
			sortable: true,
		},
		{ text: 'ICQ', value: 'userSquadIcq', align: 'center', sortable: true },
		{
			text: 'Remark',
			value: 'userSquadRemark',
			align: 'center',
			sortable: true,
		},
		{ text: 'Actions', value: 'actions', align: 'center', sortable: true },
	];
	private rules = {
		ruleSquadNick: [
			(value: string) => !!value || 'Required.',
			(value: string) =>
				/^[A-Z0-9 _]*[A-Z0-9][A-Z0-9 _]*$/.test(value) || 'Only A-Z, a-z, 0-9 and spaces are allowed',
		],
		ruleSquadName: [(value: string) => !!value || 'Required.'],
		ruleSquadEmail: [
			(value: string) => !!value || 'Required.',
			(value: string) => !/^(?:[-A-Za-z]+)(?:[-A-Za-z0-9 ]*)$/.test(value) || 'E-mail must be valid',
		],
		ruleSquadWeb: [(value: string) => !!value || 'Required.'],
		ruleSquadTitle: [(value: string) => !!value || 'Required.'],
	};
	private numItems = 5;
	private search = '';
	private squadId = 0;
	private squadMember: Array<number> = [];
	private isFormValid = false;
	private squadImg: string = '';
	private editModal = false;
	private squadMemberModel = { gadgetUserId: 0, email: '', remark: '' };
	private editSquadMemberModal = false;
	private ready: boolean = false;
	private uploadSquadPictureModal: boolean = false;
	private uploading = false;
	private avatar: File = new File([], 'yos');
	mounted() {
		this.squadId = Number(this.$route.params.id);
		this.getSquad();
	}


	private deleteSquad() {
		deleteSquad(this.squadId).then(() => {
			this.$router.push(`/administration/squadmanager/`);
			this.$tstore.dispatch('setSnackbar', {
				showing: true,
				text: 'Successfully deleted Squad',
				type: 'success',
			});
		});
	}

	private rebuildSquadXML() {
		rebuildSquadXml(this.squadId).then((response: boolean) => {
			if (response) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully rebuilded Squad XML',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to rebuild Squad XML',
					type: 'error',
				});
			}
		});
	}

	private uploadAvatar() {
		const uploadInput = this.$refs.avatar_upload as HTMLInputElement;
		if (!uploadInput.files) return;
		const file = uploadInput.files[0];
		if (!file) return;
		this.uploadSquadPicture(file);
	}

	private getSquad() {
		this.ready = false;
		getSquad(this.squadId).then(response => {
			this.squad = response;
			this.squadModel = {
				id: response.id,
				squadEmail: response.squadEmail,
				squadName: response.squadName,
				squadNick: response.squadNick,
				squadTitle: response.squadTitle,
				squadWeb: response.squadWeb,
			};
			this.squadImg = `https://api.taskforce47.com/squadxml/${response.squadNick}/logo.png`;
			this.ready = true;
			if (this.squad && this.squad.squadUsers) {
				this.squad.squadUsers.forEach(squadMember => {
					if (squadMember) {
						this.squadMember.push(squadMember.userId);
					}
				});
			}
		});
	}

	private copyXMLLink() {
		getSquadXML(this.squadId).then(xml => {
			if (xml) {
				navigator.clipboard.writeText(xml.squadLink);
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully copied Squad XML to clipboard',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to copy Squad XML to clipboard',
					type: 'error',
				});
			}
		});
	}
	private removeSquadMember(item: { userId: number }) {
		removeSquadMember(this.squadId, { gadgetUserId: item.userId }).then(res => {
			if (res) {
				this.getSquad();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully removed Member from Squad',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to remove Member from Squad',
					type: 'error',
				});
			}
		});
	}

	private editSquad() {
		updateSquad(this.squadId, this.squadModel).then((res: boolean) => {
			if (res) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully edited Squad',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to edit Squad',
					type: 'error',
				});
			}
			this.editModal = false;
		});
	}

	private editSquadMember() {
		updateSquadMember(this.squadId, this.squadMemberModel).then((response: boolean) => {
			if (response) {
				this.getSquad();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully edited Member',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to edit Member',
					type: 'error',
				});
			}
			this.editSquadMemberModal = false;
		});
	}

	openEditSquadMemberModal(item: { userId: number; userSquadEmail: string; userSquadRemark: string }) {
		this.squadMemberModel.gadgetUserId = item.userId;
		this.squadMemberModel.email = item.userSquadEmail;
		this.squadMemberModel.remark = item.userSquadRemark;
		this.editSquadMemberModal = true;
	}

	private uploadSquadPicture(file: File) {
		const data = new FormData();
		data.append('data', file);
		this.uploading = true;
		uploadSquadPicture(this.squadId, data).then((response: boolean) => {
			if (response) {
				this.getSquad();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully uploaded Image',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to upload Image',
					type: 'error',
				});
			}
			this.uploading = false;
			this.uploadSquadPictureModal = false;
		});
	}
}
</script>

<style scoped></style>
