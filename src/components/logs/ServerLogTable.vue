<template>
	<v-data-table
		:headers="headers"
		:items="serverLogs"
		item-key="id"
		:sort-by="['timeWritten']"
		:sort-desc="['timeWritten']"
		:single-expand="true"
		:server-items-length="totalNotes"
		:loading="loading"
		:page.sync="currentPage"
		v-on:update:page="null"
		:footer-props="{
			'items-per-page-options': [20],
		}"
		show-expand
	>
		<template v-slot:item.timeWritten="{ item }">
			<span>{{ new Date(item.timeWritten).toLocaleString('en-GB') }}</span>
		</template>
		<template v-slot:expanded-item="{ headers, item }">
			<td :colspan="headers.length">
				{{ item.note }}
			</td>
		</template>
		<template v-slot:item.type="{ item }">
			<v-chip style="color: black" :color="color(item.type)" dark>{{ item.type }}</v-chip>
		</template>
		<template v-slot:top>
			<div class="d-flex flex-column flex-sm-row pa-4">
				<v-spacer></v-spacer>
				<v-text-field
					@input="
						null;
						currentPage = 1;
					"
					append-icon="mdi-magnify"
					class="mr-2"
					hide-details
					label="Moderator Name"
					single-line
					v-model="searchModeratorName"
				></v-text-field>
				<v-btn :disabled="loading" @click="null" class="mr-1 mt-3 mt-sm-0">
					<v-icon>mdi-autorenew</v-icon>
				</v-btn>
			</div>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getColor } from '@/services/utils/color';
@Component
export default class ServerLogTable extends Vue {
	private color(type: string) {
		return getColor(type);
	}
	private loading: boolean = false;
	private currentPage: number = 1;
	private totalNotes: number = 0;
	private searchModeratorName: string = '';
	private headers = [
		{
			text: 'Moderator',
			align: 'start',
			sortable: false,
			value: 'author',
		},
		{
			text: 'Player',
			value: 'playerName',
			sortable: false,
		},
		{ text: 'Date', value: 'timeWritten', sortable: false },
		{ text: 'Type', value: 'type', sortable: false },
		{ text: '', value: 'data-table-expand', sortable: false },
	];
	private serverLogs = [];
	mounted() {
		/*this.getLatestNote();*/
	}

	/*	private getLatestNote() {
		this.loading = true;
		getLatestNotes(this.currentPage, this.searchModeratorName, this.searchPlayerName).then((res: LatestNotes) => {
			this.notes = res.notes;
			this.totalNotes = res.totalNoteCount;
			this.loading = false;
		});
	}*/
}
</script>

<style scoped></style>
