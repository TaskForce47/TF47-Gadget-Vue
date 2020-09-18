<template>
	<v-chip class="mr-1" @click="filterValue = getChipName">
		<v-avatar left class="grey darken-4">
			{{ getTagCount }}
		</v-avatar>
		{{ getChipName }}</v-chip
	>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class GalleryTag extends Vue {
	@Prop({ default: '', type: String }) private tagName: string | undefined;
	@Prop({ default: 0, type: Number }) private tagCount: number = 0;
	private filterValue: string = '';

	private get getChipName() {
		return this.tagName;
	}

	private get getTagCount() {
		return this.tagCount;
	}
}
</script>

<style scoped></style>
