<template>
	<div class="d-sm-flex d-none" style="position: absolute; z-index: 9; right: 1em; bottom: 1em">
		<span class="h1 align-self-center mr-2">POWERED BY</span>
		<a href="https://gruppe-adler.de" target="_blank"
			><img src="https://forum.gruppe-adler.de/assets/uploads/system/site-logo.png" height="35" width="35"
		/></a>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class PoweredBy extends Vue {}
</script>

<style scoped></style>
