<template>
	<v-row align="center" justify="center">
		<v-card width="25rem" v-if="userDetails" style="padding: 2rem">
			<v-img :src="userImg" contain>
				<template v-slot:placeholder>
					<v-row class="fill-height ma-0" align="center" justify="center">
						<v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
					</v-row>
				</template>
			</v-img>
			<v-card-title>{{ userDetails.profileName }}</v-card-title>
			<v-card-text>
				<p>
					PlayerUid: {{ userDetails.playerUid }}
					<span v-if="userDetails.playerUid == null" style="color: red">not set</span>
				</p>

				<v-list dense flat disabled>
					<v-subheader>ROLES:</v-subheader>
					<v-list-item-group v-model="userDetails.roles" color="primary">
						<v-list-item v-for="role in userDetails.roles" v-bind:key="role">
							<v-list-item-content>
								<v-list-item-title>{{ role }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-card-text>
		</v-card>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getUserDetails } from "@/services/api";
import UserDetails from "@/models/UserDetails";
@Component
export default class Userdetails extends Vue {
	private userDetails: UserDetails | null = null;
	private roles: Array<string> | undefined = [];
	private userImg: string | null = null;
	created() {
		this.getUserDetails();
		this.roles = this.userDetails?.roles;
	}
	@Watch("userDetails")
	onPropertyChanged(value: UserDetails) {
		if (value) {
			this.userImg = `https://forum.taskforce47.com${this.userDetails?.avatar}`;
		}
	}

	private async getUserDetails() {
		this.userDetails = await getUserDetails();
	}
}
</script>

<style scoped></style>
