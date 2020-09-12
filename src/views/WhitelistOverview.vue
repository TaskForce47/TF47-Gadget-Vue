<template>
	<div>
		<v-card>
			<v-card-title>
				Whitelist
				<v-spacer></v-spacer>
				<div class="d-flex">
					<v-select
							:items="whitelists"
							label="Type"
							item-text="description"
							item-value="id"
							single-line
							hide-details
							class="mr-2"
							v-model="selectedWhitelist"
							@change="getPlayerWhitelist()"
					></v-select>
					<v-btn @click="refresh()" style="margin-left: 1rem">
						<v-icon>mdi-autorenew</v-icon>
					</v-btn>
				</div>
			</v-card-title>
			<v-data-table
					:headers="headers"
					:items="whitelistPlayer.usersByWhitelist"
					:search="search"
					:loading="loading"
					:server-items-length="whitelistPlayer.totalUsersWithWhitelist"
					:page.sync="currentPage"
					v-on:update:page="getPlayerWhitelist()"
					v-on:update:items-per-page="getPlayerWhitelist()"
					:items-per-page.sync="numItems"
					:footer-props="{
					'items-per-page-options': $tstore.state.globalRowsPerTable,
				}"
			>
				<template v-slot:item.type="{ item }">
					<v-chip style="color: black" :color="color(item.type)" dark>{{ item.type }}</v-chip>
				</template>
			</v-data-table>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {getAvailableWhitelist, getUserByWhitelist} from "@/services/whitelist";
import {AvailableWhitelist, PlayerByWhitelist} from "@/services/utils/models";
@Component
export default class WhitelistOverview extends Vue {
	private whitelists: Array<AvailableWhitelist> = [];
	private whitelistPlayer: PlayerByWhitelist = {};
	private currentPage: number = 1;
	private search = '';
	private loading = true;
	private numItems: number;
	private headers = [
		{ text: 'Player Name', align: 'center', sortable: false, value: 'playerName' },
	]
	private selectedWhitelist : number = 1;
	private getAvailableWhitelists(){
		getAvailableWhitelist().then((whitelists: Array<AvailableWhitelist>) => {
			this.whitelists = whitelists;
		})
	}
	private getPlayerWhitelist(){
		getUserByWhitelist(this.currentPage, this.numItems, this.selectedWhitelist).then((whitelistPlayer: PlayerByWhitelist) =>{
			this.whitelistPlayer = whitelistPlayer;
			this.loading = false;
		})
	}
	mounted(){
		this.getAvailableWhitelists();
		this.getPlayerWhitelist();
	}
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}

	private refresh(){
		this.getPlayerWhitelist();
		this.getAvailableWhitelists();
	}

	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}
}
</script>

<style scoped></style>
