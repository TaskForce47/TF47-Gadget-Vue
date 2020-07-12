<template>
	<div>
		<v-text-field id="search" class="mx-2" prepend-icon="mdi-magnify" v-model="filter"></v-text-field>
		<v-virtual-scroll :items="filterPlayers" item-height="50" height="500px">
			<template v-slot="{ item }">
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title>{{ item.forumName }}</v-list-item-title>
					</v-list-item-content>

					<v-list-item-action>
						<v-btn depressed small @click="addSquadMember(item)" color="success">
							Add
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</template>
		</v-virtual-scroll>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { getAllGadgetUser } from '@/services/gadgetUser';
import { GadgetUser } from '@/services/utils/models';
import { addSquadMember } from '@/services/squad';
@Component
export default class SquadMemberTable extends Vue {
	private filter = '';
	private players: Array<GadgetUser> = [];
	private height = 100;
	@Prop(Number) squadId: number | undefined;
	@Prop(Array) squadMember: Array<number> | undefined;
	mounted() {
		this.getAllPlayers();
	}
	private get filterPlayers() {
		const filter = this.filter.toLowerCase();

		return this.players.filter((m: { forumName: string }) => m.forumName.toLowerCase().includes(filter));
	}

	private getAllPlayers() {
		getAllGadgetUser().then((response: Array<GadgetUser>) => {
			this.players = response.filter((x: { id: number }) => this.squadMember?.indexOf(x.id) === -1);
		});
	}
	private addSquadMember(item: { id: number }) {
		this.squadMember?.push(item.id);
		this.getAllPlayers();
		addSquadMember(this.squadId, { gadgetUserId: item.id }).then((response: boolean) => {
			if (response) {
				this.$emit('addedSquadMember');
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully added Player to Squad',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to add Player to Squad',
					type: 'error',
				});
			}
		});
	}
}
</script>

<style scoped></style>
