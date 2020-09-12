<template>
	<div>
		<TF47Form :schema="registerSchema"></TF47Form>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import TF47Form from '@/components/shared/TF47-Form.vue';
@Component({
	components: { TF47Form },
})
export default class Notifications extends Vue {
	private registerSchema = {
		type: 'object',
		required: ['userEmail', 'userName', 'userPassword'],
		properties: {
			userEmail: {
				type: 'string',
				title: 'Email',
				'x-props': {
					type: 'email',
				},
				pattern:
					'(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])',
			},
			userName: {
				type: 'string',
				title: 'Username',
				minLength: 10,
				maxLength: 100,
			},
			userPassword: {
				type: 'string',
				title: 'Password',
				minLength: 10,
				'x-props': {
					type: 'password',
				},
			},
		},
	};
}
</script>

<style scoped></style>
