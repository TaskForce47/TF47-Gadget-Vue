<template>
	<div>
		<PoweredBy></PoweredBy>
		<iframe
			src="https://planning.gruppe-adler.de"
			width="100%"
			style="position: absolute; height: 100%; border: none"
		></iframe>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PoweredBy from '@/components/shared/PoweredBy.vue';
@Component({
	components: { PoweredBy },
})
export default class Planning extends Vue {}
</script>

<style scoped></style>
