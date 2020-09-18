<template>
	<v-data-table
		:headers="headers"
		:items="messages"
		item-key="id"
		:sort-by="['timesend']"
		:sort-desc="['timesend']"
		:server-items-length="totalNotes"
		:loading="loading"
		:page.sync="currentPage"
		v-on:update:page="getLatestChat()"
		:footer-props="{
			'items-per-page-options': [20],
		}"
	>
		<template v-slot:item.timeSend="{ item }">
			<span>{{ new Date(item.timeSend).toLocaleString('en-GB') }}</span>
		</template>
		<template v-slot:item.channel="{ item }">
			<v-chip :color="color(item.channel)" dark>{{ item.channel }}</v-chip>
		</template>
		<template v-slot:top>
			<div class="d-flex flex-column flex-sm-row pa-4">
				<v-spacer></v-spacer>
				<v-select
					:items="channels"
					@change="
						getLatestChat();
						currentPage = 1;
					"
					class="mr-2"
					hide-details
					item-text="name"
					item-value="value"
					label="Channel"
					single-line
					v-model="selectedChannel"
				></v-select>
				<v-text-field
					@input="
						getLatestChat();
						currentPage = 1;
					"
					append-icon="mdi-magnify"
					class="mr-2"
					hide-details
					label="Player Name"
					single-line
					v-model="searchPlayerName"
				></v-text-field>
				<v-btn :disabled="loading" @click="getLatestChat()" class="mt-3 mt-sm-0 mr-1">
					<v-icon>mdi-autorenew</v-icon>
				</v-btn>
			</div>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ChatLatest, ChatsEntity } from '@/models/models';
import { getColor } from '@/services/utils/color';
import { getLatestChat } from '@/services/stats';
@Component
export default class ChatLogTable extends Vue {
	private color(type: string) {
		return getColor(type);
	}
	private loading: boolean = false;
	private currentPage: number = 1;
	private totalNotes: number = 0;
	private headers = [
		{
			text: 'Channel',
			align: 'start',
			sortable: false,
			value: 'channel',
		},
		{ text: 'Date', value: 'timeSend', sortable: false },
		{ text: 'Player', value: 'playerName', sortable: false },
		{ text: 'Mission', value: 'missionName', sortable: false },
		{ text: 'Message', value: 'message', sortable: false },
	];
	private channels = [
		{
			name: 'All',
			value: '',
		},
		{
			name: 'Direct',
			value: 'direct',
		},
		{
			name: 'Side',
			value: 'side',
		},
		{
			name: 'Global',
			value: 'global',
		},
		{
			name: 'Group',
			value: 'group',
		},
		{
			name: 'Vehicle',
			value: 'vehicle',
		},
		{
			name: 'Command',
			value: 'command',
		},
	];
	private selectedChannel: string = '';
	private searchPlayerName: string = '';
	private rows: number = 20;
	private messages: ChatsEntity[] | null | undefined = [];
	private autoReload: any;
	mounted() {
		this.getLatestChat();
		this.autoReload = setInterval(() => this.getLatestChat(), 10000);
	}
	$destroy() {
		clearInterval(this.autoReload);
	}

	private getLatestChat() {
		this.loading = true;
		getLatestChat(this.currentPage, this.searchPlayerName, this.selectedChannel, this.rows).then(
			(res: ChatLatest) => {
				this.messages = res.chats;
				this.totalNotes = res.totalChatCount;
				this.loading = false;
			}
		);
	}
}
</script>

<style scoped></style>
