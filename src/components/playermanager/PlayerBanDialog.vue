<template>
	<div class="d-flex flex-column">
		<v-btn outlined @click="showModal = true">
			Ban
			<v-icon>mdi-account-cancel</v-icon>
		</v-btn>

		<v-dialog v-model="showModal" scrollable max-width="500px" persistent>
			<v-card>
				<v-card-title>Ban Player {{ getPlayerName }}</v-card-title>
				<div class="px-4">
					<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="bannedUntil"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="bannedUntil"
								label="Banned until"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="bannedUntil" no-title scrollable>
							<v-spacer></v-spacer>
							<v-btn text color="buttons" @click="menu = false">Cancel</v-btn>
							<v-btn text color="buttons" @click="$refs.menu.save(bannedUntil)">OK</v-btn>
						</v-date-picker>
					</v-menu>
					<v-textarea
						v-model="formModel.note"
						:rules="rules.ruleNote"
						clearable
						clear-icon="mdi-close-circle"
						color="info"
						label="Reason"
					>
					</v-textarea>
				</div>

				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="showModal = false">Close</v-btn>
					<v-btn
						color="blue darken-1"
						text
						@click="
							banPlayer();
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
import { addPlayerNote } from '@/services/playerNotes';
import { NoteAddUpdate } from '@/models/models';
import { banPlayer } from '@/services/player';
@Component
export default class PlayerBanDialog extends Vue {
	private bannedUntil = new Date().toISOString().substr(0, 10);
	@Prop() private playerName: string | undefined;
	@Prop() private playerId: number | undefined;
	private showModal: boolean = false;
	private menu: boolean = false;
	private formModel: NoteAddUpdate = {
		note: '',
		type: 'Ban',
		playerId: 0,
	};
	private rules = {
		ruleNote: [(value: string) => !!value || 'Required.'],
	};
	private get getPlayerName() {
		return this.playerName;
	}

	private banPlayer() {
		this.showModal = false;
		if (this.playerId != null) {
			this.formModel.playerId = this.playerId;
			banPlayer(this.playerId, { bannedUntil: new Date(this.bannedUntil).toISOString() }).then(() => {
				this.bannedUntil = new Date().toISOString().substr(0, 10);
			});
		}

		addPlayerNote(this.formModel).then((response: boolean) => {
			if (response) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully banned Player',
					type: 'success',
				});
				this.formModel = {
					note: '',
					type: '',
					playerId: 0,
				};
				this.$emit('ban');
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to ban Player',
					type: 'error',
				});
			}
		});
	}
}
</script>

<style scoped></style>
