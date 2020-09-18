<template>
	<v-row>
		<v-col cols="12" sm="6">
			<v-list two-line>
				<div class="d-flex flex-column flex-sm-row">
					<span class="grey--text">Available Mods ({{ items.length }})</span>
					<v-btn class="ml-auto" color="success" outlined>
						Add Mod
					</v-btn>
				</div>
				<draggable v-model="items" :options="{ group: 'mods' }" style="min-height: 64px">
					<template v-for="item in items">
						<ServerModItem :item="item" :key="item.id"></ServerModItem>
					</template>
				</draggable>
			</v-list>
		</v-col>
		<v-col cols="12" md="6">
			<v-list two-line>
				<div class="d-flex flex-column flex-sm-row">
					<span class="grey--text">Active Mods ({{ items2.length }})</span>
					<v-btn
						class="ml-auto"
						color="error"
						outlined
						@click="
							items = [...items2, ...items];
							items2 = [];
						"
					>
						Deactivate All
					</v-btn>
				</div>
				<draggable v-model="items2" :options="{ group: 'mods' }" style="min-height: 64px">
					<template v-for="item in items2">
						<ServerModItem :item="item" :key="item.id"></ServerModItem>
					</template>
				</draggable>
			</v-list>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import draggable from 'vuedraggable';
import ServerModItem from '@/components/server-control/ServerModItem.vue';
@Component({
	components: { ServerModItem, draggable },
})
export default class ServerMods extends Vue {
	constructor() {
		super();
	}

	private items = [
		{
			id: 1,
			title: 'CUP - Terrains',
			workshopLink: '',
			currentVersion: '1.0',
			lastUpdated: '16.09.2020',
		},
		{
			id: 2,
			title: 'CUP - Vehicles',
			workshopLink: '',
			currentVersion: '1.0',
			lastUpdated: '16.09.2020',
		},
		{
			id: 3,
			title: 'TFAR',
			workshopLink: '',
			currentVersion: '1.0',
			lastUpdated: '16.09.2020',
		},
	];
	private items2 = [
		{
			id: 4,
			title: 'Advanced Movement',
			workshopLink: '',
			currentVersion: '1.0',
			lastUpdated: '16.09.2020',
		},
		{
			id: 5,
			title: 'Bornholm',
			workshopLink: '',
			currentVersion: '1.0',
			lastUpdated: '16.09.2020',
		},
	];
}
</script>

<style scoped></style>
