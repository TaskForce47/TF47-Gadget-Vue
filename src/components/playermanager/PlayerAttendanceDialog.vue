<template>
	<div class="d-flex flex-column">
		<v-btn outlined class="mt-2" @click.stop="showModal = true">
			Attendance
			<v-icon>mdi-flag-plus</v-icon>
		</v-btn>
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
	private showModal: boolean = false;
	@Prop({ default: '', type: String }) private searchPlayerName: string | undefined;
	@Prop({ default: undefined, type: Number }) private searchForumUid: number | undefined;
	get modalOpen() {
		return this.showModal;
	}
}
</script>

<style scoped></style>
