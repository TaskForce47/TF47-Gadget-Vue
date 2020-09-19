<template>
	<div>
		<v-card class="d-flex flex-lg-row flex-column" min-height="750">
			<PlayerManagerTable :profileChanged="profileChanged"></PlayerManagerTable>
			<div class="pa-6 playermanager" style="width: 100%">
				<router-view v-on:profileChanged="profileChanged = !profileChanged"></router-view>
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
export default class PlayerManager extends Vue {
	private profileChanged: boolean = false;
}
</script>

<style scoped></style>
