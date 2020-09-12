<template>
	<div>
		<template v-if="ready">
			<v-card class="pa-6" height="fit-content">
				<v-row no-gutters>
					<v-col :cols="profileCols">
						<div class="d-flex flex-wrap">
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
							<div class="ml-sm-4" v-if="userDetails">
								<div class="text-sm-h3 text-h4">{{ this.userDetails.profileName }}</div>
								<h3 style="color: grey;" class="mb-2">
									{{ userDetails.playerUid }}
									<span v-if="userDetails.playerUid == null" style="color: red">not set</span>
								</h3>
								<template v-if="ready && userDetails.roles">
									<v-chip
										v-for="role in userDetails.roles"
										v-bind:key="role"
										style="margin-right: 0.25rem; margin-top: 0.25rem"
									>
										{{ role }}
									</v-chip>
								</template>
							</div>
						</div>
						<v-card flat>
							<v-card-title>Your Whitelist</v-card-title>
							<v-card-text class="d-flex justify-space-between text-no-wrap flex-wrap" v-if="whitelists">
								<v-checkbox
									v-for="whitelist of whitelists"
									color="accent"
									:label="whitelist.description"
									:key="whitelist.id"
									input-value="true"
									hide-details
									readonly
								></v-checkbox>
							</v-card-text>
						</v-card>
					</v-col>
					<v-col :cols="settingCols">
						<v-card flat>
							<v-card-title>Settings</v-card-title>
							<v-card-text class="d-flex flex-column justify-space-between">
								<UserSettings v-on:updatedSettings="getUserDetails"></UserSettings>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-card>
			<MySquads class="mt-4"></MySquads>
		</template>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { IUserDetails, WhitelistSelf } from '@/services/utils/models';

import { getUserDetails, getWhitelist } from '@/services/user';
import UserSettings from '@/components/user/UserSettings.vue';
import MySquads from '@/components/user/MySquads.vue';
@Component({
	components: { UserSettings, MySquads },
})
export default class Userdetails extends Vue {
	private userDetails: IUserDetails | null = null;
	private roles: string[] | null | undefined = [];
	private userImg: string | null = '';
	private ready: boolean = false;
	private settingCols = 5;
	private profileCols = 7;
	private whitelists: Array<WhitelistSelf> = [];
	constructor() {
		super();
		window.addEventListener('resize', () => {
			this.calcCols();
		});
	}
	created() {
		this.getUserDetails();
		this.roles = this.userDetails?.roles;
		this.calcCols();
		this.getWhitelist();
	}
	@Watch('userDetails')
	onPropertyChanged(value: IUserDetails) {
		if (value && value.avatar) {
			this.userImg = `https://forum.taskforce47.com${this.userDetails?.avatar}`;
		}
	}

	private getUserDetails() {
		this.ready = false;
		getUserDetails().then((response: IUserDetails) => {
			this.userDetails = response;
			this.ready = true;
		});
	}

	private calcCols() {
		if (document.documentElement.clientWidth - 124 < 968) {
			this.settingCols = 12;
			this.profileCols = 12;
		} else {
			this.settingCols = 5;
			this.profileCols = 7;
		}
	}
	private getWhitelist() {
		getWhitelist().then((response: Array<WhitelistSelf>) => {
			this.whitelists = response;
		});
	}
}
</script>

<style scoped></style>
