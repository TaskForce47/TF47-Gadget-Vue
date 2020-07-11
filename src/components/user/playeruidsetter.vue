<template>
	<div>
		<v-row align="center" justify="center" style="margin-top: 1rem;">
			<v-card width="25rem" style=" padding: 2rem">
				<v-form v-model="formValid">
					<div style="display: flex;">
						<v-text-field
							v-model="playerUid"
							:rules="rules"
							label="Player Uid"
							maxlength="17"
							minlength="17"
							counter
							:success="formValid"
						></v-text-field>
						<v-btn
							style="margin-left: 0.5rem; margin-top: 1rem"
							:disabled="!formValid || requestInProgress"
							@click="setPlayerUid(playerUid)"
							>Set</v-btn
						>
					</div>
				</v-form>
			</v-card>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setUserPlayerUid } from '@/services/user';
import { InputValidationRules } from 'vuetify';
@Component
export default class Playeruidsetter extends Vue {
	private text = '';
	private color = '';
	public open = false;
	private playerUid: number | null = null;
	private rules: InputValidationRules = [
		value => !!value || 'Required.',
		value => (value && value.length == 17) || 'The Player Uid is 17 characters long',
		value => (value && !isNaN(value)) || 'The Player Uid only consist of numbers',
	];
	private formValid = false;
	private requestInProgress = false;
	private setPlayerUid(playerUid: number) {
		this.requestInProgress = true;
		setUserPlayerUid({ playerUid: playerUid.toString() }).then((response: boolean) => {
			if (response) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully set Player Uid',
					type: 'success',
				});
				this.playerUid = null;
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to set Player Uid',
					type: 'error',
				});
			}
			// TODO EMIT USER DETAILS RELOAD
			this.requestInProgress = false;
		});
	}
}
</script>

<style scoped></style>
