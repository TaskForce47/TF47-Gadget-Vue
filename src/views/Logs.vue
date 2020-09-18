<template>
	<v-card>
		<v-card-title>Logs</v-card-title>
		<v-tabs centered color="info" show-arrows>
			<v-tab>Chat</v-tab>
			<v-tab>Ticket</v-tab>
			<v-tab>Server</v-tab>
			<v-tab>Gadget</v-tab>
			<v-tab-item>
				<ChatLogTable></ChatLogTable>
			</v-tab-item>
			<v-tab-item>
				<TicketLogTable></TicketLogTable>
			</v-tab-item>
			<v-tab-item>
				<ServerLogTable></ServerLogTable>
			</v-tab-item>
			<v-tab-item>
				<GadgetLogTable></GadgetLogTable>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import GadgetLogTable from '@/components/logs/GadgetLogTable.vue';
import TicketLogTable from '@/components/logs/TicketLogTable.vue';
import ChatLogTable from '@/components/logs/ChatLogTable.vue';
import ServerLogTable from '@/components/logs/ServerLogTable.vue';
@Component({
	components: { ServerLogTable, ChatLogTable, TicketLogTable, GadgetLogTable },
})
export default class Logs extends Vue {}
</script>

<style scoped></style>
