<template>
	<div>
		<userdetails></userdetails>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Userdetails from '@/components/user/userdetails.vue';
@Component({
	components: { Userdetails },
})
export default class User extends Vue {}
</script>

<style scoped></style>
