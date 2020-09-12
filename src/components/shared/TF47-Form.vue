<template>
	<div>
		<v-form ref="form" v-model="formValid">
			<v-jsf v-model="model" :schema="schema" :options="options" />
		</v-form>
		<div>
			<v-btn color="primary" class="ml-auto d-flex mt-5" :disabled="!formValid">Submit</v-btn>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface FormSettings {
  endpoint: ''
}

@Component
export default class TF47Form extends Vue {
	private formValid: boolean = false;
	private formSettings: FormSettings = {};
	@Prop() private model;
	@Prop() private schema;
	@Prop() private options;
	@Prop() private id;

	private submitForm(){
	  this.$emit('submit');
  }
}
</script>

<style scoped></style>
