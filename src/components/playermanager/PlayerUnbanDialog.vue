<template>
	<div class="d-flex flex-column">
		<v-btn outlined @click="showModal = true">
			Unban
			<v-icon>mdi-account-check</v-icon>
		</v-btn>

		<v-dialog v-model="showModal" scrollable max-width="500px" persistent>
			<v-card>
				<v-card-title>Unban Player {{ getPlayerName }}</v-card-title>
				<v-card-text>Do you really want to unban {{ getPlayerName }} ?</v-card-text>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="showModal = false">Close</v-btn>
					<v-btn
						color="blue darken-1"
						text
						@click="
							unbanPlayer();
							showModal = false;
						"
						>Confirm</v-btn
					>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { unbanPlayer } from '@/services/player';
import { addPlayerNote } from '@/services/playerNotes';
import { NoteAddUpdate } from '@/models/models';
@Component
export default class PlayerUnbanDialog extends Vue {
	@Prop() private playerName: string | undefined;
	@Prop() private playerId: number | undefined;
	private showModal: boolean = false;

	private formModel: NoteAddUpdate = {
		note: 'Unbanned Player',
		type: 'Unban',
		playerId: 0,
	};

	private get getPlayerName() {
		return this.playerName;
	}

	private unbanPlayer() {
		unbanPlayer(this.playerId as number).then((response: boolean) => {
			if (response) {
				this.formModel.playerId = this.playerId as number;
				addPlayerNote(this.formModel).then((response: boolean) => {
					if (response) {
						this.$tstore.dispatch('setSnackbar', {
							showing: true,
							text: 'Successfully unbanned Player',
							type: 'success',
						});
						this.formModel = {
							note: '',
							type: '',
							playerId: 0,
						};
						this.$emit('unban');
					} else {
						this.$tstore.dispatch('setSnackbar', {
							showing: true,
							text: 'Failed to unban Player',
							type: 'error',
						});
					}
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to unban Player',
					type: 'error',
				});
			}
		});
	}
}
</script>

<style scoped></style>
