<template>
	<div class="d-flex flex-column">
		<v-btn outlined class="mt-2" @click="showModal = true">
			Chatlog
			<v-icon>mdi-chat</v-icon>
		</v-btn>
		<v-dialog v-model="showModal" scrollable width="fit-conteht" persistent>
			<v-card>
				<v-card-title>Chatlog for {{ searchPlayerName }}</v-card-title>
				<v-divider></v-divider>
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
						'items-per-page-options': [10],
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
							<v-btn :disabled="loading" @click="getLatestChat()" class="mt-3 mt-sm-0 mr-1">
								<v-icon>mdi-autorenew</v-icon>
							</v-btn>
						</div>
					</template>
				</v-data-table>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="showModal = false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { getColor } from '@/services/utils/color';
import { ChatLatest, ChatsEntity } from '@/models/models';
import { getLatestChat } from '@/services/stats';
@Component
export default class PlayerChatDialog extends Vue {
	private showModal: boolean = false;
	@Prop({ default: '', type: String }) private searchPlayerName: string | undefined;
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
	private rows: number = 10;
	private messages: ChatsEntity[] | null | undefined = [];

	@Watch('showModal')
	onValueChange(value: boolean) {
		if (!value) {
			this.$emit('close');
		}
	}

	mounted() {
		this.getLatestChat();
	}
	get playerName() {
		return this.searchPlayerName;
	}

	private getLatestChat() {
		this.loading = true;
		getLatestChat(this.currentPage, this.playerName, this.selectedChannel, this.rows).then((res: ChatLatest) => {
			this.messages = res.chats;
			this.totalNotes = res.totalChatCount;
			this.loading = false;
		});
	}
}
</script>

<style scoped></style>
