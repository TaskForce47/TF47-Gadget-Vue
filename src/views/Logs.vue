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
import { NotesLatest } from '@/services/utils/models';
import { getLatestNotes } from '@/services/playerNotes';
@Component
export default class Logs extends Vue {
	private headers = [
		{
			text: 'Moderator',
			align: 'start',
			sortable: false,
			value: 'author',
		},
		{ text: 'Date', value: 'timeWritten' },
		{ text: 'Type', value: 'type' },
		{ text: '', value: 'data-table-expand' },
	];
	private notes: Array<NotesLatest> | Array<undefined> = [];
	mounted() {
		getLatestNotes().then((res: Array<NotesLatest>) => {
			this.notes = res;
		});
	}
	private getColor(type: string) {
		if (type == 'Info') return 'white';
		else if (type == 'Ban') return 'red';
		else return 'orange';
	}
}
</script>

<style scoped></style>
