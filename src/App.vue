<template>
	<div>
		<div
			v-if="loggedIn === false"
			style="display: flex; justify-content: center; align-items: center; height: 100%; color: white"
		>
			<h1>
				Please login first at
				<a href="https://forum.taskforce47.com">forum.taskforce47.com</a>
			</h1>
		</div>
		<div v-else-if="loggedIn !== false && loggedIn !== null">
			<v-app id="inspire">
				<v-app-bar app clipped-left color="backgroundTop">
					<v-toolbar-title class="ml-4"
						><b>Task Force 47</b>
						<span :style="{ color: $vuetify.theme.themes[theme].gadgetText }">Gadget</span></v-toolbar-title
					>
					<v-spacer></v-spacer>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn min-width="0" text v-on="on" to="/">
								<v-icon>mdi-home</v-icon>
							</v-btn>
						</template>
						<span>Dashboard</span>
					</v-tooltip>
					<!--<v-menu open-on-hover offset-y>
						<template v-slot:activator="{ on }">
							<v-btn color="info" text dark v-on="on">
								Statistics
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item-group>
								<v-list-item to="/statistics/members">
									<v-list-item-icon>
										<v-icon>mdi-account-group</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title>Members</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
								<v-list-item to="/statistics/events">
									<v-list-item-icon>
										<v-icon>mdi-calendar-month</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title>Events</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-menu>-->
					<v-menu open-on-hover offset-y v-if="roles.includes('Admin') || roles.includes('Moderator')">
						<template v-slot:activator="{ on }">
							<v-btn color="info" text dark v-on="on">
								Administration
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item-group>
								<v-list-item to="/administration/whitelist">
									<v-list-item-icon>
										<v-icon>mdi-account-cog</v-icon>
									</v-list-item-icon>
									<v-list-item-content>
										<v-list-item-title>Whitelist</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list-item-group>
						</v-list>
					</v-menu>
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-checkbox
								class="mt-5 mr-2 ml-5"
								v-model="$vuetify.theme.dark"
								on-icon="mdi-white-balance-sunny"
								off-icon="mdi-weather-night"
								color="white"
								v-on="on"
							></v-checkbox>
						</template>
						<span>Toggle Dark/Light</span>
					</v-tooltip>

					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-btn min-width="0" text v-on="on" to="/user">
								<v-icon>mdi-account</v-icon>
							</v-btn>
						</template>
						<span>Profile</span>
					</v-tooltip>
				</v-app-bar>

				<v-content class="mt-9 px-9" :style="{ background: $vuetify.theme.themes[theme].background }">
					<router-view />
				</v-content>

				<v-footer app color="transparent elevation-0" inset>
					<v-col class="text-right">
						&copy; 2020 Task Force 47
					</v-col>
				</v-footer>
			</v-app>
		</div>
		<div v-else style="display: flex; justify-content: center; align-items: center; height: 100%; color: white">
			<h1>No connection to api</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { checkIfLoggedIn, getRoles } from "@/services/api";
@Component
export default class App extends Vue {
	public dark = true;
	private roles: Array<string> = [];
	private loggedIn: boolean | null = null;
	public get theme() {
		return this.$vuetify.theme.dark ? "dark" : "light";
	}
	created() {
		this.$vuetify.theme.dark = this.dark;
		this.checkIfLoggedIn();
	}
	@Watch("loggedIn")
	onPropertyChanged(value: boolean) {
		if (value) {
			this.getRoles();
		}
	}
	private async checkIfLoggedIn() {
		this.loggedIn = await checkIfLoggedIn();
	}
	private async getRoles() {
		this.roles = await getRoles();
	}
}
</script>
<style>
.v-list--nav {
	color: white;
}
html {
	background-color: #2c3139;
	font-family: "Oswald", sans-serif;
}
</style>
