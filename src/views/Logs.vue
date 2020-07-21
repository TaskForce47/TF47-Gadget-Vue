<template>
	<v-card>
		<v-card-title>Logs</v-card-title>
		<v-card-text v-if="notes">
			<v-data-table
				:headers="headers"
				:items="notes"
				item-key="id"
				:sort-by="['timeWritten']"
				:sort-desc="['timeWritten']"
				:single-expand="true"
				:server-items-length="totalNotes"
				:loading="loading"
				:page.sync="currentPage"
				v-on:update:page="getLatestNote()"
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
					<v-chip style="color: black" :color="getColor(item.type)" dark>{{ item.type }}</v-chip>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { LatestNotes, NotesEntity } from '@/services/utils/models';
import { getLatestNotes } from '@/services/playerNotes';
@Component
export default class Logs extends Vue {
	private loading: boolean = false;
	private currentPage: number = 1;
	private totalNotes: number = 0;
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
		},
		{ text: 'Date', value: 'timeWritten' },
		{ text: 'Type', value: 'type' },
		{ text: '', value: 'data-table-expand' },
	];
	private notes: NotesEntity[] | null | undefined = [];
	mounted() {
		this.getLatestNote();
	}

	private getColor(type: string) {
		switch (type) {
			case 'Warning':
				return 'orange';
			case 'Ban':
				return 'red';
			case 'Info':
				return 'white';
			case 'Whitelist added':
				return 'green';
			case 'Whitelist removed':
				return 'yellow';
			default:
				return 'orange';
		}
	}

	private getLatestNote() {
		this.loading = true;
		getLatestNotes(this.currentPage).then((res: LatestNotes) => {
			this.notes = res.notes;
			this.totalNotes = res.totalNoteCount;
			this.loading = false;
		});
	}
}
</script>

<style scoped></style>
