<template>
	<div>
		<v-card class="d-flex playermanager">
			<div>
				<PlayerManagerTable></PlayerManagerTable>
			</div>
			<div class="pa-6" style="width: 100%">
				<router-view></router-view>
			</div>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PlayerManagerTable from '@/components/playermanager/PlayerManagerTable.vue';
@Component({
	components: { PlayerManagerTable },
})
export default class PlayerManager extends Vue {}
</script>

<style scoped></style>
