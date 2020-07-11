<template>
	<router-view> </router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EventTable from '@/components/events/event-table.vue';
@Component({
	components: {
		EventTable,
	},
})
export default class Events extends Vue {}
</script>

<style scoped></style>
