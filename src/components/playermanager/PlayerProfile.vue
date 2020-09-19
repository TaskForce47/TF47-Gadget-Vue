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
					<div v-if="whitelistCols === 2 || whitelistCols === 1">
						<PlayerNotesTable :reloadNotes="reloadNotes" :player-id="playerId"></PlayerNotesTable>
					</div>
				</v-col>
				<v-col :cols="whitelistCols">
					<div class="ml-4 d-flex flex-column mt-2 mt-lg-0">
						<PlayerBanDialog
							v-if="userDetails.bannedUntil == null"
							:player-name="userDetails.name"
							:player-id="playerId"
							v-on:ban="
								init();
								reloadNotes = !reloadNotes;
							"
						></PlayerBanDialog>
						<PlayerUnbanDialog
							v-if="userDetails.bannedUntil !== null"
							:player-name="userDetails.name"
							:player-id="playerId"
							v-on:unban="
								init();
								reloadNotes = !reloadNotes;
							"
						></PlayerUnbanDialog>
						<v-btn outlined class="mt-2" disabled>
							Stats
							<v-icon>mdi-chart-line-variant</v-icon>
						</v-btn>
						<PlayerAttendanceDialog
							v-if="userDetails && userDetails.gadgetUser"
							:show-modal="missionAttendanceModal"
							:search-player-name="userDetails.name"
							:search-forum-uid="userDetails.gadgetUser.id"
						>
						</PlayerAttendanceDialog>
						<PlayerChatDialog v-if="userDetails" :search-player-name="userDetails.name"></PlayerChatDialog>
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
					<PlayerNotesTable :reloadNotes="reloadNotes" :player-id="playerId"></PlayerNotesTable>
				</v-col>
			</v-row>
		</template>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
		<template v-if="ready && !userDetails"> <h1>No player found</h1> </template>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Player, PlayerStats, WhitelistPlayer, WhitelistPlayerAdd, WhitelistsEntity } from '@/models/models';
import { getPlayerDetails } from '@/services/player';
import { applyWhitelist, getPlayerWhitelist } from '@/services/whitelist';
import ConfirmationModal from '@/components/shared/ConfirmationModal.vue';
import StatTables from '@/components/stats/StatTables.vue';
import { getStatsForPlayer } from '@/services/stats';
import PlayerChatDialog from '@/components/playermanager/PlayerChatDialog.vue';
import PlayerAttendanceDialog from '@/components/playermanager/PlayerAttendanceDialog.vue';
import PlayerUnbanDialog from '@/components/playermanager/PlayerUnbanDialog.vue';
import PlayerNotesTable from '@/components/playermanager/PlayerNotesTable.vue';
import PlayerBanDialog from '@/components/playermanager/PlayerBanDialog.vue';
@Component({
	components: {
		PlayerBanDialog,
		PlayerNotesTable,
		PlayerUnbanDialog,
		PlayerAttendanceDialog,
		PlayerChatDialog,
		StatTables,
		ConfirmationModal,
	},
})
export default class PlayerProfile extends Vue {
	private userDetails: Player | null = null;
	private userImg = '';
	private whitelistCols = 2;
	private profileCols = 10;
	private playerId: number;
	private whitelists: WhitelistsEntity[] | null | undefined = [];
	private ready = false;
	private missionAttendanceModal: boolean = false;
	private playerStats: PlayerStats | null = null;
	private reloadNotes: boolean = false;
	constructor() {
		super();
		this.ready = false;
		this.playerId = 0;
	}

	created() {
		this.playerId = Number(this.$route.params.id);
		window.addEventListener('resize', () => [this.calcCols()]);
		this.calcCols();
		this.init();
	}
	@Watch('$route.params.id')
	onRouteParamChanged(value: string) {
		this.ready = false;
		this.playerId = Number(value);
		this.userImg = '';
		this.init();
	}

	private init() {
		this.$emit('profileChanged');
		this.getUserDetails();
		this.getPlayerWhitelist();
		this.getStatsForPlayer();
	}

	@Watch('userDetails')
	onPropertyChanged(value: Player) {
		if (value && value.gadgetUser && value.gadgetUser.avatarUrl) {
			this.userImg = `https://forum.taskforce47.com${this.userDetails?.gadgetUser?.avatarUrl}`;
		}
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

	private getStatsForPlayer() {
		getStatsForPlayer(this.playerId).then((playerStats: PlayerStats) => {
			this.playerStats = playerStats;
		});
	}
}
</script>

<style scoped lang="scss"></style>
