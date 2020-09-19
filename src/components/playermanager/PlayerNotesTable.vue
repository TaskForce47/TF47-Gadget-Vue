<template>
	<v-card class="mt-8" flat>
		<v-card-title>
			Notes
			<v-spacer></v-spacer>
			<v-btn style="margin-left: 2rem" @click="addModal = true"><v-icon>mdi-plus</v-icon></v-btn>
		</v-card-title>
		<v-card-text>
			<v-data-table
				:headers="headers"
				:items="notes"
				item-key="nodeId"
				:sort-by="['timeWritten']"
				:sort-desc="['timeWritten']"
				:items-per-page="numItems"
				:single-expand="true"
				:footer-props="{
					'items-per-page-options': $tstore.state.globalRowsPerTable,
				}"
				show-expand
			>
				<template v-slot:item.timeWritten="{ item }">
					<span>{{ new Date(item.timeWritten).toLocaleString('en-GB') }}</span>
				</template>
				<template v-slot:expanded-item="{ headers, item }">
					<td :colspan="headers.length">
						<div class="d-flex ml-3">
							<div style="width: 98%">
								{{ item.note }}
							</div>
							<div
								class="d-flex"
								v-if="
									$tstore.state.auth.roles.includes('Admin') ||
										['Ban', 'Warning', 'Info'].includes(item.type)
								"
							>
								<v-btn color="warning" icon x-small @click="openNoteEditModal(item)">
									<v-icon>mdi-pencil</v-icon>
								</v-btn>
								<v-btn color="error" icon x-small @click="openNoteDeleteModal(item)">
									<v-icon>mdi-delete</v-icon>
								</v-btn>
							</div>
						</div>
					</td>
				</template>
				<template v-slot:item.type="{ item }">
					<v-chip style="color: black" :color="color(item.type)" dark>{{ item.type }}</v-chip>
				</template>
			</v-data-table>
		</v-card-text>
		<ConfirmationModal :show-modal="showDeleteModal" v-on:confirm="deleteNote" v-on:close="showDeleteModal = false">
			<template v-slot:header>
				Delete Note
			</template>
			<template v-slot:text>
				<p>
					Do you really want to delete the note ?
				</p>
			</template>
		</ConfirmationModal>
		<v-dialog id="editNoteModal" v-model="showEditModal" max-width="600" persistent>
			<v-card>
				<v-card-title class="headline">Add Note</v-card-title>
				<v-card-text>
					<v-form v-model="isFormValid">
						<v-select
							label="Type"
							:items="types"
							:rules="rules.ruleType"
							v-model="noteToEditModel.type"
						></v-select>
						<v-textarea
							v-model="noteToEditModel.note"
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
					<v-btn color="blue darken-1" text @click="showEditModal = false">
						Close
					</v-btn>
					<v-btn color="blue darken-1" :disabled="!isFormValid" text @click="updateNote()">
						Submit
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog id="addModal" v-model="addModal" max-width="600" persistent>
			<v-card>
				<v-card-title class="headline">Add Note</v-card-title>
				<v-card-text>
					<v-form v-model="isFormValid">
						<v-select label="Type" :items="types" :rules="rules.ruleType" v-model="formModel.type"></v-select>
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
	</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { NoteAddUpdate, NotesEntity, PlayerNotes } from '@/models/models';
import { addPlayerNote, deletePlayerNote, updatePlayerNote } from '@/services/playerNotes';
import { getPlayerNotes } from '@/services/player';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import { getColor } from '@/services/utils/color';
@Component({
	components: { ConfirmationModal },
})
export default class PlayerNotesTable extends Vue {
	@Prop() playerId: number | undefined;
	@Prop() reloadNotes: boolean | undefined;
	private addModal: boolean = false;
	private isFormValid: boolean = false;
	private showEditModal: boolean = false;
	private showDeleteModal: boolean = false;
	private rules = {
		ruleType: [(value: string) => !!value || 'Required.'],
		ruleNote: [(value: string) => !!value || 'Required.'],
	};
	private formModel: NoteAddUpdate = {
		note: '',
		type: '',
		playerId: 0,
	};
	private types = ['Warning', 'Info'];
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}
	created() {
		this.getUserNotes();
	}
	@Watch('$route.params.id')
	onRouteParamChanged(value: string) {
		this.getUserNotes();
	}
	@Watch('reloadNotes')
	onReload(value: string) {
		this.getUserNotes();
	}
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
	private notes: Array<NotesEntity> | undefined | null = [];

	private noteToEditModel: NotesEntity | undefined = {
		authorId: 0,
		authorName: '',
		isModified: false,
		lastTimeModified: null,
		nodeId: 0,
		note: '',
		timeWritten: '',
		type: '',
	};

	private color(type: string) {
		return getColor(type);
	}
	private noteToDeleteModel: NotesEntity | undefined;
	private numItems: number | null;

	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}

	private openNoteEditModal(item: NotesEntity) {
		this.noteToEditModel = item;
		this.showEditModal = true;
	}
	private openNoteDeleteModal(item: NotesEntity) {
		this.noteToDeleteModel = item;
		this.showDeleteModal = true;
	}

	private getUserNotes() {
		getPlayerNotes(this.playerId as number).then((response: PlayerNotes) => {
			this.notes = response.notes;
		});
	}

	private updateNote() {
		updatePlayerNote(this.noteToEditModel?.nodeId, this.noteToEditModel).then((response: boolean) => {
			if (response) {
				this.getUserNotes();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully edited Note',
					type: 'success',
				});
				this.formModel = {
					note: '',
					type: '',
					playerId: 0,
				};
				this.showEditModal = false;
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to edit Note',
					type: 'error',
				});
			}
		});
	}

	private deleteNote() {
		deletePlayerNote(this.noteToDeleteModel?.nodeId).then((response: boolean) => {
			if (response) {
				this.getUserNotes();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully removed Note',
					type: 'success',
				});
				this.formModel = {
					note: '',
					type: '',
					playerId: 0,
				};
				this.showDeleteModal = false;
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to remove Note',
					type: 'error',
				});
			}
		});
	}

	private addNote() {
		this.addModal = false;
		if (this.playerId != null) {
			this.formModel.playerId = this.playerId;
		}
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
