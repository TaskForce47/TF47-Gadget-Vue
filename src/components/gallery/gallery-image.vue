<template>
	<v-card height="240px" width="240px" elevation="5" class="pa-2 ml-2 mt-2 mt-md-0">
		<v-img contain :src="imgLink" height="173px" width="240px" :alt="imgTitle"> </v-img>
		<v-divider class="mt-2"></v-divider>
		<div>
			<span class="d-inline-block text-truncate" style="max-width: 240px">Beep Boop Farming Group</span>
			<div class="d-flex">
				<span class="pl-1 grey--text text--darken-2 font-weight-light caption align-self-center"
					>by RednecksRevenge</span
				>
				<div class="d-flex ml-auto">
					<span class="pl-1 grey--text text--darken-2 font-weight-light caption align-self-center">35</span>
					<v-btn icon>
						<v-icon color="error">mdi-heart</v-icon>
					</v-btn>
				</div>
			</div>
		</div>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Gallery extends Vue {
	@Prop({ default: '', type: String }) private imgLink: string | undefined;
	@Prop({ default: '', type: String }) private imgTitle: string | undefined;
}
</script>

<style scoped>
</style>
