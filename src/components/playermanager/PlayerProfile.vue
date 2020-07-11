<template>
	<div>
		<template v-if="ready && userDetails">
			<v-row no-gutters style="flex-wrap: nowrap;">
				<v-col :cols="profileCols" class="flex-shrink-1 flex-grow-0">
					<div class="d-flex">
						<v-img :src="userImg" style="max-width: 128px; max-height: 128px">
							<template v-slot:placeholder>
								<v-row class="fill-height ma-0" align="center" justify="center">
									<v-progress-circular
										v-if="!ready"
										indeterminate
										color="grey lighten-5"
									></v-progress-circular>
									<span v-if="ready && userImg === ''">No Image</span>
								</v-row>
							</template>
						</v-img>
						<div class="ml-4" v-if="userDetails">
							<h1>{{ this.userDetails.name }}</h1>
							<h3 style="color: grey;" class="mb-2">
								{{ userDetails.uid }}
								<span v-if="userDetails.uid == null" style="color: red">not set</span>
							</h3>
							<template v-if="ready && userDetails.gadgetUser">
								<v-chip
									v-for="role in userDetails.gadgetUser.roles"
									v-bind:key="role"
									style="margin-right: 0.25rem; margin-top: 0.25rem"
								>
									{{ role }}
								</v-chip>
							</template>
						</div>
						<v-btn class="ml-auto mr-4" outlined disabled>
							<v-icon>mdi-chart-line-variant</v-icon>
							Stats
						</v-btn>
					</div>
					<v-card class="mt-8 mr-4">
						<v-card-title>
							Notes
							<v-spacer></v-spacer>
							<v-btn style="margin-left: 2rem" @click="addModal = true"><v-icon>mdi-plus</v-icon></v-btn>
						</v-card-title>
						<v-card-text>
							<v-data-table
								:headers="headers"
								:items="notes"
								item-key="timeWritten"
								:sort-by="['timeWritten']"
								:sort-desc="['timeWritten']"
								:single-expand="true"
								show-expand
							>
								<template v-slot:item.timeWritten="{ item }">
									<span>{{ new Date(item.timeWritten).toLocaleString('en-GB') }}</span>
								</template>
								<template v-slot:expanded-item="{ headers, item }">
									<td :colspan="headers.length">
										{{ item.note }}
									</td>
								</template>
								<template v-slot:item.type="{ item }">
									<v-chip style="color: black" :color="getColor(item.type)" dark>{{
										item.type
									}}</v-chip>
								</template>
							</v-data-table>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col :cols="whitelistCols" class="flex-grow-1 flex-shrink-0">
					<v-card>
						<v-card-title>Whitelist</v-card-title>
						<v-card-text class="d-flex flex-column justify-space-between" v-if="whitelists">
							<v-checkbox
								v-for="whitelist of whitelists"
								color="accent"
								:label="whitelist.whitelistName"
								:key="whitelist.id"
								v-model="whitelist.enabled"
								@change="updateWhitelist(userDetails.id, whitelist.id, whitelist.enabled)"
								hide-details
							></v-checkbox>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<v-dialog id="addModal" v-model="addModal" max-width="600" persistent>
				<v-card>
					<v-card-title class="headline">Add Note</v-card-title>

					<v-card-text>
						<v-form v-model="isFormValid">
							<v-select
								label="Type"
								:items="types"
								:rules="rules.ruleType"
								v-model="formModel.type"
							></v-select>
							<v-textarea
								v-model="formModel.note"
								:rules="rules.ruleNote"
								clearable
								clear-icon="mdi-close-circle"
								color="info"
								label="Text"
							>
							</v-textarea>
						</v-form>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>

						<v-btn color="blue darken-1" text @click="addModal = false">
							Close
						</v-btn>
						<v-btn color="blue darken-1" :disabled="!isFormValid" text @click="addNote()">
							Submit
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</template>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
		<template v-if="ready && !userDetails">
			<h1>No player found</h1>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
	NoteAddUpdate,
	NotesEntity,
	Player,
	PlayerNotes,
	WhitelistPlayer,
	WhitelistPlayerAdd,
	WhitelistsEntity,
} from '@/services/utils/models';
import { getPlayerDetails, getPlayerNotes } from '@/services/player';
import { applyWhitelist, getPlayerWhitelist } from '@/services/whitelist';
import { addPlayerNote } from '@/services/playerNotes';
@Component
export default class PlayerProfile extends Vue {
	private userDetails: Player | null = null;
	private roles: Array<string> | undefined = [];
	private userImg = '';
	private show: number | null = null;
	private whitelistCols = 2;
	private profileCols = 10;
	private playerId: number;
	private whitelists: WhitelistsEntity[] | null | undefined = [];
	private ready = false;
	private notes: Array<NotesEntity> | undefined | null = [];
	private addModal = false;
	private isFormValid = false;
	private headers = [
		{
			text: 'Moderator',
			align: 'start',
			sortable: false,
			value: 'authorName',
		},
		{ text: 'Date', value: 'timeWritten' },
		{ text: 'Type', value: 'type' },
		{ text: '', value: 'data-table-expand' },
	];
	private rules = {
		ruleType: [(value: string) => !!value || 'Required.'],
		ruleNote: [(value: string) => !!value || 'Required.'],
	};
	private formModel: NoteAddUpdate = {
		note: '',
		type: '',
		playerId: 0,
	};
	private types = ['Warning', 'Ban', 'Info'];
	constructor() {
		super();
		this.ready = false;
		this.playerId = 0;
	}
	created() {
		this.playerId = Number(this.$route.params.id);
		this.getUserDetails();
		this.getPlayerWhitelist();
		window.addEventListener('resize', () => [this.calcCols()]);
		this.calcCols();
		this.getUserNotes();
	}
	@Watch('$route.params.id')
	onRouteParamChanged(value: string) {
		this.ready = false;
		this.playerId = Number(value);
		this.getUserDetails();
		this.userImg = '';
		this.getPlayerWhitelist();
		this.getUserNotes();
	}

	@Watch('userDetails')
	onPropertyChanged(value: Player) {
		if (value && value.gadgetUser && value.gadgetUser.avatarUrl) {
			this.userImg = `https://forum.taskforce47.com${this.userDetails?.gadgetUser?.avatarUrl}`;
		}
	}

	private expand(index: number) {
		if (this.show === index) {
			this.show = null;
		} else {
			this.show = index;
		}
	}

	private calcCols() {
		if (document.documentElement.clientWidth - 124 < 1600) {
			this.whitelistCols = 2;
			this.profileCols = 10;
		} else if (document.documentElement.clientWidth - 124 > 1900) {
			this.whitelistCols = 1;
			this.profileCols = 11;
		}
	}

	private getUserDetails() {
		if (this.playerId)
			getPlayerDetails(this.playerId).then((response: Player) => {
				this.userDetails = response;
				this.ready = true;
			});
	}

	private getPlayerWhitelist() {
		if (this.playerId) {
			getPlayerWhitelist(this.playerId).then((response: Array<WhitelistPlayer>) => {
				this.whitelists = response[0].whitelists;
			});
		}
	}

	private getColor(type: string) {
		if (type == 'Info') return 'white';
		else if (type == 'Ban') return 'red';
		else return 'orange';
	}

	private updateWhitelist(playerId: number, whitelistId: number, enabled: boolean) {
		const whitelist: Array<WhitelistPlayerAdd> = [];
		whitelist.push({
			playerId: playerId,
			enabled: enabled,
			whitelistId: whitelistId,
		});
		applyWhitelist(whitelist).then((response: boolean) => {
			if (response) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully updated the Whitelist',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to update Whitelist',
					type: 'error',
				});
			}
		});
	}
	private getUserNotes() {
		getPlayerNotes(this.playerId).then((response: PlayerNotes) => {
			this.notes = response.notes;
		});
	}

	private addNote() {
		this.addModal = false;
		this.formModel.playerId = this.playerId;
		addPlayerNote(this.formModel).then((response: boolean) => {
			if (response) {
				this.getUserNotes();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully added Note to Player',
					type: 'success',
				});
				this.formModel = {
					note: '',
					type: '',
					playerId: 0,
				};
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to add Note to Player',
					type: 'error',
				});
			}
		});
	}
}
</script>

<style scoped></style>
