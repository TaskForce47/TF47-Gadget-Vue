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
					<Navigation></Navigation>
				</v-app-bar>

				<v-main
					class="mt-9 px-9"
					:style="{ background: $vuetify.theme.themes[theme].background }"
					style="padding-bottom: 5rem"
				>
					<router-view />
					<v-snackbar
						v-model="$tstore.state.snackbar.showing"
						:color="$vuetify.theme.themes[theme][$tstore.state.snackbar.type]"
						:timeout="$tstore.state.snackbar.timeout"
						@input="$emit('update:open', false)"
					>
						{{ $tstore.state.snackbar.text }}
						<v-btn color="black" text @click="$tstore.state.snackbar.showing = false">
							Close
						</v-btn>
					</v-snackbar>
				</v-main>

				<v-footer color="transparent elevation-0" app absolute>
					<v-tooltip top>
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
          <notifications></notifications>
          <div class="ml-sm-auto text-right">
            &copy; 2020 Task Force 47
          </div>
        </v-footer>
			</v-app>
		</div>
		<div
			v-else-if="loggedIn === null && ready"
			style="display: flex; justify-content: center; align-items: center; height: 100%; color: white"
		>
			<h1>No connection to api</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Notifications from '@/components/notifications/notifications.vue';
import { authenticate, getRoles } from '@/services/user';
import Navigation from '@/components/shared/Navigation.vue';

@Component({
	components: { Navigation, Notifications },
})
export default class App extends Vue {
	public dark = true;
	private roles: Array<string> = [];
	private loggedIn: boolean | null = null;
	private ready = false;
	public get theme() {
		return this.$vuetify.theme.dark ? 'dark' : 'light';
	}
	created() {
		this.$vuetify.theme.dark = this.dark;
		this.ready = false;
		authenticate().then(
			(authenticated: boolean) => {
				this.loggedIn = authenticated;
				this.$tstore.dispatch('setLoggedIn', this.loggedIn);
				this.ready = true;
			},
			error => {
				this.ready = true;
			}
		);
	}
	@Watch('loggedIn')
	onPropertyChanged(value: boolean) {
		if (value) {
			this.getRoles();
		}
	}

	private getRoles() {
		getRoles().then((roles: Array<string>) => {
			this.roles = roles;
			this.$tstore.dispatch('setRoles', this.roles);
		});
	}
}
</script>
<style>
.v-list--nav {
	color: white;
}
html {
	background-color: #2c3139;
	font-family: 'Oswald', sans-serif;
}
.v-footer {
	padding-bottom: 0px !important;
}
</style>
