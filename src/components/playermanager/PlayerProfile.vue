<template>
	<div>
		<template v-if="ready && userDetails">
			<v-row no-gutters class="flex-wrap">
				<v-col :cols="profileCols">
					<div class="d-flex flex-column flex-md-row ml-sm-4">
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
						<div class="d-flex flex-wrap flex-fill">
							<div class="ml-sm-4" v-if="userDetails">
								<div class="d-flex flex-wrap">
									<div class="text-sm-h3 text-h4">{{ userDetails.name }}</div>
									<span class="align-self-center ml-sm-2 grey--text" v-if="userDetails.gadgetUser"
										>({{ userDetails.gadgetUser.forumName }})</span
									>
								</div>

								<h3 class="mb-2">
									<a
										style="color: grey;"
										:href="`https://www.steamcommunity.com/profiles/${this.userDetails.uid}`"
										target="_blank"
										>{{ userDetails.uid }}</a
									>

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
							<div v-if="playerStats" class="d-flex flex-column ml-md-auto mt-4 ml-4">
								<span class="red--text" v-if="userDetails.bannedUntil !== null">
									Banned until: {{ new Date(userDetails.bannedUntil).toDateString() }}
								</span>
								<span
									>First Time seen:
									{{ new Date(playerStats.playerFirstTimeSeen).toLocaleString('en-GB') }}</span
								>
								<span
									>Last Time seen:
									{{ new Date(playerStats.lastTimeSeen).toLocaleString('en-GB') }}</span
								>
								<span>Connections: {{ playerStats.numberConnections }}</span>
							</div>
						</div>
					</div>
					<v-card class="mt-8" flat v-if="whitelistCols === 2 || whitelistCols === 1">
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
					</v-card>
				</v-col>
				<v-col :cols="whitelistCols">
					<div class="ml-4 d-flex flex-column mt-2 mt-lg-0">
						<v-btn outlined disabled>
							Stats
							<v-icon>mdi-chart-line-variant</v-icon>
						</v-btn>
						<v-btn outlined class="mt-2" @click.stop="chatModal = true">
							Chatlog
							<v-icon>mdi-chat</v-icon>
						</v-btn>
					</div>
					<v-card flat>
						<v-card-title>Whitelist</v-card-title>
						<v-card-text
							class="d-flex flex-lg-column justify-space-between flex-wrap flex-lg-nowrap text-no-wrap"
							v-if="whitelists"
						>
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
			<v-row no-gutters v-if="whitelistCols === 12">
				<v-col cols="12">
					<v-card class="mt-8 mr-4" flat>
						<v-card-title>
							Notes
							<v-spacer></v-spacer>
							<v-btn style="margin-left: 2rem" @click="addModal = true"><v-icon>mdi-plus</v-icon></v-btn>
						</v-card-title>
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
							<v-menu
								v-if="formModel.type === 'Ban'"
								ref="menu"
								v-model="menu"
								:close-on-content-click="false"
								:return-value.sync="bannedUntil"
								transition="scale-transition"
								offset-y
								min-width="290px"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="bannedUntil"
										label="Banned until"
										prepend-icon="mdi-calendar"
										readonly
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker v-model="bannedUntil" no-title scrollable>
									<v-spacer></v-spacer>
									<v-btn text color="buttons" @click="menu = false">Cancel</v-btn>
									<v-btn text color="buttons" @click="$refs.menu.save(bannedUntil)">OK</v-btn>
								</v-date-picker>
							</v-menu>
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
			<ConfirmationModal
				:show-modal="showDeleteModal"
				v-on:confirm="deleteNote"
				v-on:close="showDeleteModal = false"
			>
				<template v-slot:header>
					Delete Note
				</template>
				<template v-slot:text>
					<p>
						Do you really want to delete the note ?
					</p>
				</template>
			</ConfirmationModal>
			<PlayerChatDialog
				v-if="userDetails && chatModal"
				:show-modal="chatModal"
				v-on:close="chatModal = false"
				:search-player-name="userDetails.name"
			></PlayerChatDialog>
		</template>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
		<template v-if="ready && !userDetails"> <h1>No player found</h1> </template>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import {
	NoteAddUpdate,
	NotesEntity,
	Player,
	PlayerNotes,
	PlayerStats,
	WhitelistPlayer,
	WhitelistPlayerAdd,
	WhitelistsEntity,
} from '@/services/utils/models';
import { banPlayer, getPlayerDetails, getPlayerNotes, unbanPlayer } from '@/services/player';
import { applyWhitelist, getPlayerWhitelist } from '@/services/whitelist';
import { addPlayerNote, deletePlayerNote, updatePlayerNote } from '@/services/playerNotes';
import { getColor } from '@/services/utils/color';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import StatTables from '@/components/stats/StatTables.vue';
import { getStatsForPlayer } from '@/services/stats';
import PlayerChatDialog from '@/components/playermanager/PlayerChatDialog.vue';
@Component({
	components: { PlayerChatDialog, StatTables, ConfirmationModal },
})
export default class PlayerProfile extends Vue {
	private userDetails: Player | null = null;
	private userImg = '';
	private whitelistCols = 2;
	private profileCols = 10;
	private playerId: number;
	private whitelists: WhitelistsEntity[] | null | undefined = [];
	private ready = false;
	private notes: Array<NotesEntity> | undefined | null = [];
	private addModal: boolean = false;
	private isFormValid: boolean = false;
	private showEditModal: boolean = false;
	private showDeleteModal: boolean = false;
	private menu: boolean = false;
	private numItems: number | null;
	private bannedUntil = new Date().toISOString().substr(0, 10);
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
	private noteToDeleteModel: NotesEntity | undefined;
	private chatModal: boolean = false;
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
	private playerStats: PlayerStats | null = null;
	constructor() {
		super();
		this.ready = false;
		this.playerId = 0;
		this.numItems = Number(this.getItemsPerPage);
	}

	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}

	created() {
		this.playerId = Number(this.$route.params.id);
		this.getUserDetails();
		this.getPlayerWhitelist();
		window.addEventListener('resize', () => [this.calcCols()]);
		this.calcCols();
		this.getUserNotes();
		this.getStatsForPlayer();
	}
	@Watch('$route.params.id')
	onRouteParamChanged(value: string) {
		this.ready = false;
		this.playerId = Number(value);
		this.getUserDetails();
		this.userImg = '';
		this.getPlayerWhitelist();
		this.getUserNotes();
		this.getStatsForPlayer();
	}

	@Watch('userDetails')
	onPropertyChanged(value: Player) {
		if (value && value.gadgetUser && value.gadgetUser.avatarUrl) {
			this.userImg = `https://forum.taskforce47.com${this.userDetails?.gadgetUser?.avatarUrl}`;
		}
	}

	private color(type: string) {
		return getColor(type);
	}

	private calcCols() {
		if (document.documentElement.clientWidth < 1200) {
			this.whitelistCols = 12;
			this.profileCols = 12;
		} else if (document.documentElement.clientWidth < 1900) {
			this.whitelistCols = 2;
			this.profileCols = 10;
		} else {
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

	private unbanPlayer() {
		unbanPlayer(this.playerId).then((response: boolean) => {
			if (response) {
				this.getUserDetails();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully unbanned Player',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to unban Player',
					type: 'error',
				});
			}
		});
	}

	private addNote() {
		this.addModal = false;
		this.formModel.playerId = this.playerId;
		if (this.formModel.type == 'Ban') {
			banPlayer(this.playerId, { bannedUntil: new Date(this.bannedUntil).toISOString() }).then(() => {
				this.getUserDetails();
				this.bannedUntil = new Date().toISOString().substr(0, 10);
			});
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

	private openNoteEditModal(item: NotesEntity) {
		this.noteToEditModel = item;
		this.showEditModal = true;
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

	private openNoteDeleteModal(item: NotesEntity) {
		this.noteToDeleteModel = item;
		this.showDeleteModal = true;
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

	private getStatsForPlayer() {
		getStatsForPlayer(this.playerId).then((playerStats: PlayerStats) => {
			this.playerStats = playerStats;
		});
	}
}
</script>

<style scoped lang="scss"></style>
