<template>
	<div>
		<v-form ref="form" v-model="formValid">
			<v-jsf v-model="formModel" :schema="schema" :options="options" />
		</v-form>
		<div>
			<div class="ml-auto d-flex mt-5" v-if="formSettings.customSubmit">
				<v-btn color="primary" v-if="formSettings.showReset" class="mr-2" @click="this.submitForm()">Reset</v-btn>
				<v-btn color="primary" :disabled="!formValid" @click="this.submitForm()">Submit</v-btn>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { submitForm } from '@/services/utils/form';

interface FormSettings {
	endpoint: string;
	resetAfterSubmit: boolean;
	showReset: boolean;
	customSubmit: boolean;
}

@Component
export default class TF47Form extends Vue {
	private formValid: boolean = false;
	private formModel: {} = {};
	@Prop() private formSettings: FormSettings = {
		endpoint: '',
		resetAfterSubmit: false,
		showReset: false,
		customSubmit: false,
	};
	@Prop() private model: {} = {};
	@Prop() private type: string | undefined;
	@Prop() private schema: {} | undefined;
	@Prop() private options: {} | undefined;
	@Prop() private id: number | undefined;

	mounted() {
		this.initForm();
	}

	private initForm() {
		this.formModel = this.model;
		if (this.type !== undefined && this.id !== undefined) {
			this.formSettings.endpoint = this.type + '/' + this.id;
		}
	}

	private submitForm() {
		if (!this.formValid) return;
		submitForm(this.formSettings.endpoint, this.model).then(() => {
			if (this.formSettings.resetAfterSubmit) this.formModel = {};
		});
		this.$emit('submit');
	}
}
</script>

<style scoped></style>
