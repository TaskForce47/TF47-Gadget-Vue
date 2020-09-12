<template>
	<v-dialog v-model="showModal" max-width="300">
		<v-card>
			<v-card-title class="headline"><slot name="header"></slot></v-card-title>

			<v-card-text>
				<slot name="text"></slot>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn color="blue darken-1" text @click="showModal = false">
					Cancel
				</v-btn>

				<v-btn color="blue darken-1" text @click="$emit('confirm')">
					Confirm
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class ConfirmationModal extends Vue {
	@Prop({ default: false, type: Boolean }) private showModal: boolean | undefined;
	@Watch('showModal')
	onValueChange(value: boolean) {
		if (!value) {
			this.$emit('close');
		}
	}
}
</script>

<style scoped></style>
