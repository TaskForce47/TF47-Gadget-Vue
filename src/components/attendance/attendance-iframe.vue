<template>
	<div>
		<PoweredBy></PoweredBy>
		<iframe :src="iframeUrl" width="100%" style="position: absolute; height: 100%; border: none"></iframe>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import PoweredBy from '@/components/shared/PoweredBy.vue';
@Component({
	components: { PoweredBy },
})
export default class AttendanceIframe extends Vue {
	@Prop({ default: undefined, type: Number }) private uid: number | undefined;
	private url = 'https://stasi.taskforce47.com';

	get iframeUrl() {
		if (this.uid !== undefined) {
			this.url += `?uid=${this.uid}`;
		}
		return this.url;
	}
}
</script>

<style scoped></style>
