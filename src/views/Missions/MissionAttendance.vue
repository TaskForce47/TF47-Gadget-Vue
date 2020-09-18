<template>
	<div>
		<attendance-iframe></attendance-iframe>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AttendanceIframe from '@/components/attendance/attendance-iframe.vue';
@Component({
	components: { AttendanceIframe },
})
export default class MissionAttendance extends Vue {}
</script>

<style lang="scss"></style>
