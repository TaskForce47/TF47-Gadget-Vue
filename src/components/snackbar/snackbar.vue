<template>
	<div>
		<v-snackbar v-model="fakeOpen" :color="color" :timeout="timeout" @input="$emit('update:open', false)">
			{{ text }}
			<v-btn color="black" text @click="fakeOpen = false">
				Close
			</v-btn>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class Snackbar extends Vue {
	@Prop({ default: 3000, type: Number }) private timeout!: number;
	@Prop({ default: false, type: Boolean }) private open!: boolean;
	@Prop({ default: "", type: String }) private color!: string;
	@Prop({ default: "", type: String }) private text!: string;
	private fakeOpen = false;
	constructor() {
		super();
		this.fakeOpen = this.open;
	}
}
</script>

<style scoped></style>
