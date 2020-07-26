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
			<div class="d-flex">
				<v-spacer></v-spacer>
				<v-btn @click="getLatestChat()" style="margin-right: 1rem" :disabled="loading">
					<v-icon>mdi-autorenew</v-icon>
				</v-btn>
			</div>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ChatLatest, LatestNotes, NotesEntity, ChatsEntity } from '../../services/utils/models';
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
			sortable: true,
			value: 'channel',
		},
		{ text: 'Date', value: 'timeSend' },
		{ text: 'Player', value: 'playerName' },
		{ text: 'Message', value: 'message' },
	];
	private messages: ChatsEntity[] | null | undefined = [];
	mounted() {
		this.getLatestChat();
	}

	private getLatestChat() {
		this.loading = true;
		getLatestChat(this.currentPage).then((res: ChatLatest) => {
			this.messages = res.chats;
			this.totalNotes = res.totalChatCount;
			this.loading = false;
		});
	}
}
</script>

<style scoped></style>
