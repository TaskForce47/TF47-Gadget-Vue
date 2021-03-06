<template>
	<v-data-table
		:headers="headers"
		:items="tickets"
		item-key="id"
		:sort-by="['ticketChangeTime']"
		:sort-desc="['ticketChangeTime']"
		:server-items-length="totalTicketUpdates"
		:loading="loading"
		:page.sync="currentPage"
		v-on:update:page="getLatestTickets()"
		:footer-props="{
			'items-per-page-options': [20],
		}"
	>
		<template v-slot:item.ticketChangeTime="{ item }">
			<span>{{ new Date(item.ticketChangeTime).toLocaleString('en-GB') }}</span>
		</template>
		<template v-slot:item.ticketChange="{ item }">
			<v-chip :color="color(item.ticketChange)" dark>{{ item.ticketChange }}</v-chip>
		</template>
		<template v-slot:top>
			<div class="d-flex flex-column flex-sm-row pa-4">
				<v-spacer></v-spacer>
				<v-btn :disabled="loading" @click="getLatestTickets()" class="mr-1">
					<v-icon>mdi-autorenew</v-icon>
				</v-btn>
			</div>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { TicketsLatest, TicketLogEntity } from '@/models/models';
import { getColor } from '@/services/utils/color';
import { getLatestTicketChanges } from '@/services/stats';
@Component
export default class TicketLogTable extends Vue {
	private color(type: string) {
		return getColor(type);
	}
	private loading: boolean = false;
	private currentPage: number = 1;
	private totalTicketUpdates: number = 0;
	private headers = [
		{ text: 'Date', value: 'ticketChangeTime', sortable: false },
		{ text: 'Mission', value: 'missionName', sortable: false },
		{ text: 'Message', value: 'message', sortable: false },
		{ text: 'Current Ticket Count', value: 'ticketNow', sortable: false },
		{ text: 'Change', value: 'ticketChange', sortable: false },
	];
	private tickets: TicketLogEntity[] | null | undefined = [];
	mounted() {
		this.getLatestTickets();
	}

	private getLatestTickets() {
		this.loading = true;
		getLatestTicketChanges(this.currentPage).then((res: TicketsLatest) => {
			this.tickets = res.ticketLog;
			this.totalTicketUpdates = res.totalTicketCount;
			this.loading = false;
		});
	}
}
</script>

<style scoped></style>
