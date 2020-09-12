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
		<v-tabs color="info" grow class="mt-4 px-4">
			<v-tab>Graphs</v-tab>
			<v-tab>Players</v-tab>
			<v-tab>Mods</v-tab>
			<v-tab>Configuration</v-tab>
			<v-tab-item class="mt-4"> </v-tab-item>
			<v-tab-item class="mt-4">
				<v-data-table
					:headers="headers"
					:items="players"
					:items-per-page="numItems"
					:loading="loading"
					:footer-props="{
						'items-per-page-options': $tstore.state.globalRowsPerTable,
					}"
				>
					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2">
							mdi-magnify
						</v-icon>
						<v-icon small class="mr-2" @click="item" color="red">
							mdi-close-circle
						</v-icon>
					</template>
				</v-data-table>
			</v-tab-item>
			<v-tab-item> </v-tab-item>
			<v-tab-item>
				<server-configuration-form></server-configuration-form>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerConfigurationForm from '@/components/server-control/ServerConfigurationForm.vue';
@Component({
	components: { ServerConfigurationForm },
})
export default class Server extends Vue {
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}
	private loading = false;

	private numItems: number | null;
	private players = [
		{
			name: 'Lucke',
			time: '1.5h',
			score: '69',
			guid: '6d703719e35473ccf770ef4d4f57b1dd',
		},
		{
			name: 'BlackPixxel',
			time: '2.5h',
			score: '500',
			guid: '6d703719e35473ccf770ef4d4f57b1dd',
		},
		{
			name: 'Symrex',
			time: '0.2h',
			score: '0',
			guid: '6d703719e35473cad234dfsfddfasd17',
		},
		{
			name: 'Mudokon',
			time: '5.0h',
			score: '> 9000',
			guid: '6d703719e35473ccdfgvbvvbcx57b1dd',
		},
		{
			name: 'RednecksRevenge',
			time: '1337h',
			score: '8000',
			guid: '6d703719e35473037370ef4d4f57b1dd',
		},
	];

	public headers = [
		{ text: 'Name', align: 'center', sortable: false, value: 'name' },
		{ text: 'Time', value: 'time', align: 'center', sortable: false },
		{ text: 'Score', value: 'score', align: 'center', sortable: false },
		{ text: 'GUID', value: 'guid', align: 'center', sortable: false },
		{ text: 'Actions', value: 'actions', sortable: false },
	];
	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}
}
</script>

<style scoped></style>
