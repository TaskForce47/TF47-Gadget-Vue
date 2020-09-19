<template>
	<div>
		<ServerAdd></ServerAdd>
		<div class="d-flex flex-column">
			<ServerCard></ServerCard>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerCard from '@/components/server-control/ServerCard.vue';
import ServerAdd from '@/components/server-control/ServerAdd.vue';
@Component({
	components: { ServerAdd, ServerCard },
})
export default class ServerOverview extends Vue {
	private value = 50;
}
</script>

<style scoped></style>
