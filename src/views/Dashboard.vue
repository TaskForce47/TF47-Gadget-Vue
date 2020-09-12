<template>
	<div>
    <authcard></authcard>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ServerCard from '@/components/server-control/ServerCard.vue';
import Authcard from "@/components/auth/authcard.vue";
@Component({
	components: {Authcard, ServerCard },
})
export default class Dashboard extends Vue {}
</script>

<style lang="scss"></style>
