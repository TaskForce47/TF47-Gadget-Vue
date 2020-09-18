<template>
	<div v-resize="getDimensions">
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
		<template v-if="players">
			<v-text-field id="search" class="mx-2" prepend-icon="mdi-magnify" v-model="filter"></v-text-field>
			<v-virtual-scroll :items="filterPlayers" item-height="50" :height="height" :width="width">
				<template v-slot="{ item }">
					<v-list-item active-class="active" :to="`/administration/playermanager/${item.id}`">
						<v-list-item-content>
							<v-list-item-title>{{ item.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</template>
			</v-virtual-scroll>
		</template>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getAllPlayers } from '@/services/player';
import { Player } from '@/models/models';
@Component
export default class PlayerManagerTable extends Vue {
	public players: Array<Player> = [];
	public height = 100;
	public width = 925;
	private filter = '';
	private ready = false;
	mounted() {
		getAllPlayers().then((response: Array<Player>) => {
			this.players = response;
			this.ready = true;
			this.getDimensions();
		});
	}

	private get filterPlayers() {
		const filter = this.filter.toLowerCase();

		return this.players.filter((m: { name: string }) => m.name.toLowerCase().includes(filter));
	}

	private getDimensions() {
		const playerManager = document.getElementsByClassName('playermanager')[0];
		if (document.body.clientWidth < 1264 && playerManager) {
			this.height = 350;
			this.width = playerManager.clientWidth;
		} else {
			this.width = 250;
			this.height = playerManager.clientHeight - 70;
		}
	}
}
</script>

<style scoped>
.active {
	background-color: #3e3e3e;
	color: white;
}
</style>
