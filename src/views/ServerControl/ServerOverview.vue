<template>
	<div class="d-flex flex-column">
		<ServerCard></ServerCard>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerCard from '@/components/server-control/ServerCard.vue';
@Component({
	components: { ServerCard },
})
export default class ServerOverview extends Vue {
	private value = 50;
}
</script>

<style scoped></style>
