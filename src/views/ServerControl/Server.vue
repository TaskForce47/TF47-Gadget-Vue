<template>
	<v-card height="fit-content">
		<div class="d-flex flex-column flex-md-row pt-6 px-6">
			<v-tooltip right>
				<template v-slot:activator="{ on, attrs }">
					<v-btn outlined active-class="" v-on="on" v-bind="attrs" to="/administration/server-control">
						<v-icon>mdi-chevron-left</v-icon>
					</v-btn>
				</template>
				<span>Back</span>
			</v-tooltip>
			<v-spacer></v-spacer>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-icon v-on="on" v-bind="attrs" class="d-none d-md-block align-self-center">mdi-content-copy</v-icon>
				</template>
				<span>Copy Server IP</span>
			</v-tooltip>
			<v-btn class="ml-md-2 mt-4 mt-md-0" color="green" outlined @click="uploadSquadPictureModal = true">
				Restart Mission
				<v-icon>mdi-restart</v-icon>
			</v-btn>
			<v-btn class="ml-md-2 mt-4 mt-md-0" color="warning" outlined>
				Lock
				<v-icon>mdi-lock</v-icon>
			</v-btn>
			<v-btn class="ml-md-2 mt-4 mt-md-0" color="warning" outlined>
				Restart
				<v-icon>mdi-restart</v-icon>
			</v-btn>
			<v-btn class="ml-md-2 mt-4 mt-md-0" color="error" outlined>
				Shutdown
				<v-icon>mdi-power</v-icon>
			</v-btn>
		</div>
		<div class="ml-4 d-flex mt-6">
			<div class="ml-4 mt-2">
				<div class="d-flex">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								class="mr-2 mt-1"
								fab
								v-bind="attrs"
								v-on="on"
								color="green"
								height="15"
								width="15"
								depressed
							></v-btn>
						</template>
						<span>Online</span>
					</v-tooltip>
					<h3>[TF47] MilSim Public Server #1 ACE|TFAR|RHS GER/ENG</h3>
				</div>
				<div class="mt-4 ml-8 mt-md-0">
					<div class="d-flex flex-column">
						<div class="d-flex">
							<span>Current Mission: </span
							><span class="ml-2 text--disabled"> TF47 KP Liberation Altis</span>
						</div>
						<div class="d-flex"><span>Current Map:</span><span class="ml-2 text--disabled"> Altis</span></div>
						<div class="d-flex">
							<span>IP:</span><span class="ml-2 text--disabled"> 116.202.164.243:2302</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-tabs color="info" grow class="mt-4 px-4" show-arrows>
			<!--<v-tab>Graphs</v-tab>-->
			<v-tab>Players</v-tab>
			<v-tab>Mods</v-tab>
			<v-tab>Missions</v-tab>
			<v-tab>Bans</v-tab>
			<v-tab>Configuration</v-tab>
			<!--<v-tab-item class="mt-4"> </v-tab-item>-->
			<v-tab-item class="mt-4">
				<ServerPlayers></ServerPlayers>
			</v-tab-item>
			<v-tab-item class="mt-4">
				<ServerMods></ServerMods>
			</v-tab-item>
			<v-tab-item class="mt-4"> </v-tab-item>
			<v-tab-item class="mt-4">
				<ServerBans></ServerBans>
			</v-tab-item>
			<v-tab-item class="mt-4">
				<server-configuration-form></server-configuration-form>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerConfigurationForm from '@/components/server-control/ServerConfigurationForm.vue';
import ServerPlayers from '@/components/server-control/ServerPlayers.vue';
import ServerMods from '@/components/server-control/ServerMods.vue';
import ServerBans from '@/components/server-control/ServerBans.vue';
@Component({
	components: { ServerBans, ServerMods, ServerPlayers, ServerConfigurationForm },
})
export default class Server extends Vue {}
</script>

<style scoped></style>
