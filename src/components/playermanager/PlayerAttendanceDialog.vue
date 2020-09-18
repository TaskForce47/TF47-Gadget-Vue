<template>
	<div>
		<v-dialog v-model="modalOpen" scrollable width="fit-conteht" persistent>
			<v-card style="height: 80vh">
				<v-card-title
					>Event Attendance for {{ searchPlayerName
					}}<v-btn color="blue darken-1" text @click="showModal = false">Close</v-btn></v-card-title
				>
				<v-divider></v-divider>
				<div>
					<attendance-iframe></attendance-iframe>
				</div>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import AttendanceIframe from '@/components/attendance/attendance-iframe.vue';
@Component({
	components: { AttendanceIframe },
})
export default class PlayerAttendanceDialog extends Vue {
	@Prop({ default: false, type: Boolean }) private showModal: boolean | undefined;
	@Prop({ default: '', type: String }) private searchPlayerName: string | undefined;
	@Prop({ default: undefined, type: Number }) private searchForumUid: number | undefined;
	get modalOpen() {
		return this.showModal;
	}
	@Watch('showModal')
	onValueChange(value: boolean) {
		if (!value) {
			this.$emit('close');
		}
	}
}
</script>

<style scoped></style>
