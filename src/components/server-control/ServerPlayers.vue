<template>
	<div class="d-flex flex-column">
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
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ServerPlayers extends Vue {
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}
	private loading = false;

	private numItems: number | null;

	private players = [];

	public headers = [
		{ text: 'Name', align: 'center', sortable: false, value: 'name' },
		{ text: 'Time', value: 'time', align: 'center', sortable: false },
		{ text: 'Score', value: 'score', align: 'center', sortable: false },
		{ text: 'GUID', value: 'guid', align: 'center', sortable: false },
		{ text: 'Status', value: 'status', align: 'center', sortable: false },
		{ text: 'Actions', value: 'actions', sortable: false },
	];
	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}
}
</script>

<style scoped></style>
