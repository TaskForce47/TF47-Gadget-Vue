<template>
	<div class="user-settings">
		<v-form v-model="formValid" class="user-settings__form">
			<span>Default Table Rows</span>
			<v-slider
				color="gadgetText"
				v-model="tableRows"
				step="5"
				ticks="always"
				min="10"
				max="50"
				:hint="tableRows.toString()"
				persistent-hint
			></v-slider>
			<v-text-field
				v-model="playerUid"
				:rules="playerUid ? rules : []"
				label="Player Uid"
				maxlength="17"
				minlength="17"
				counter
				hint="Steam 64 ID"
			></v-text-field>
			<div class="d-flex">
				<v-btn
					class="ml-auto"
					outlined
					:color="formValid ? 'buttons' : 'info'"
					:disabled="!formValid || requestInProgress"
					@click="saveValues()"
					>Save</v-btn
				>
			</div>
		</v-form>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { setUserPlayerUid } from '@/services/user';
import { InputValidationRules } from 'vuetify';
@Component
export default class UserSettings extends Vue {
	private playerUid: number | null = null;
	private rules: InputValidationRules = [
		value => (value && value.length == 17) || 'The Player Uid is 17 characters long',
		value => (value && !isNaN(value)) || 'The Player Uid only consist of numbers',
	];
	private formValid = false;
	private requestInProgress = false;
	private tableRows = 20;
	mounted() {
		this.tableRows = Number(this.getItemsPerPage);
	}
	private saveValues() {
		if (this.playerUid !== null) {
			this.setPlayerUid(this.playerUid);
		}
		this.setDefaultRowsPerPage();
	}

	private setDefaultRowsPerPage() {
		if (localStorage.getItem('defaultRowsPerPage') !== null) {
			localStorage.removeItem('defaultRowsPerPage');
		}
		localStorage.setItem('defaultRowsPerPage', this.tableRows.toString());
		this.$tstore.dispatch('setSnackbar', {
			showing: true,
			text: 'Successfully updated settings',
			type: 'success',
		});
	}

	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '20';
	}

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
			this.requestInProgress = false;
			this.$emit('updatedSettings');
		});
	}
}
</script>

<style lang="scss" scoped>
.user-settings {
	&__form {
		.v-input {
			width: 90%;
		}
	}
}
</style>
