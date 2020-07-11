<template>
	<div>
		<v-progress-circular v-if="!ready" indeterminate color="grey lighten-5"></v-progress-circular>
		<template v-if="players">
			<v-text-field id="search" class="mx-2" prepend-icon="mdi-magnify" v-model="filter"></v-text-field>
			<v-virtual-scroll :items="filterPlayers" item-height="50" :height="height" width="250">
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
import { Component, Vue } from 'vue-property-decorator';
import { getAllPlayers } from '@/services/player';
import { Player } from '@/services/utils/models';
@Component
export default class PlayerManagerTable extends Vue {
	public players: Array<Player> = [];
	public height = 100;
	private filter = '';
	private ready = false;
	mounted() {
		this.getDimensions();
		window.addEventListener('resize', () => {
			this.getDimensions();
		});
		getAllPlayers().then((response: Array<Player>) => {
			this.players = response;
			this.ready = true;
		});
	}
	private get filterPlayers() {
		const filter = this.filter.toLowerCase();

		return this.players.filter((m: { name: string }) => m.name.toLowerCase().includes(filter));
	}
	private getDimensions() {
		const searchBar = document.getElementById('search');
		if (searchBar) {
			this.height =
				document.documentElement.clientHeight -
				document.getElementsByClassName('v-app-bar')[0].clientHeight -
				document.getElementsByClassName('v-footer')[0].clientHeight -
				searchBar.clientHeight -
				75;
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
