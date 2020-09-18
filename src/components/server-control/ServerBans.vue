<template>
	<div class="d-flex flex-column">
		<div class="d-flex">
			<v-btn @click="refreshBans()" class="ml-auto" :disabled="loading">
				<v-icon>mdi-autorenew</v-icon>
			</v-btn>
		</div>

		<v-data-table
			:headers="headers"
			:items="bans"
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ServerBans extends Vue {
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}
	private loading = false;

	private numItems: number | null;

	private bans = [];

	private headers = [
		{ text: 'Name', align: 'center', sortable: false, value: 'name' },
		{ text: 'Banned Date', value: 'time', align: 'center', sortable: false },
		{ text: 'Unban Date', value: 'score', align: 'center', sortable: false },
		{ text: 'Reason', value: 'guid', align: 'center', sortable: false },
		{ text: 'Actions', value: 'actions', sortable: false },
	];
	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}

	private refreshBans() {
		this.loading = true;
		this.loading = false;
	}
}
</script>

<style scoped></style>
