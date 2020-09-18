<template>
	<v-list-item :key="item.id" class="elevation-2 mt-2">
		<v-list-item-content>
			<v-list-item-title v-html="item.title"></v-list-item-title>
			<v-list-item-subtitle v-html="item.currentVersion + ' - ' + item.lastUpdated"></v-list-item-subtitle>
		</v-list-item-content>
		<v-list-item-action>
			<v-btn icon>
				<v-icon color="grey lighten-1">mdi-information</v-icon>
			</v-btn>
		</v-list-item-action>
	</v-list-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class ServerModItem extends Vue {
	@Prop({ default: undefined, type: Object }) private item:
		| {
				id: number;
				title: string;
				workshopID: number;
				currentVersion: string;
				installedVersion: string;
				lastUpdate: string;
		  }
		| undefined;
}
</script>

<style scoped></style>
