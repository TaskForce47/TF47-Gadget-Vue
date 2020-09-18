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
export default class LoginForm extends Vue {
	private registerSchema = {
		type: 'object',
		required: ['userName', 'userPassword'],
		properties: {
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
