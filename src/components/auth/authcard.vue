<template>
	<v-container fill-height fluid>
		<v-row align="center" justify="center">
			<v-col>
				<v-card class="mx-auto my-auto pt-4" max-width="450" height="fit-content" min-height="650px">
          <v-img src="https://taskforce47.com/img/TF47_GER_100.18e7cd93.svg" class="mx-2"></v-img>
					<v-tabs grow centered color="info"  class="mt-4 px-4 ">
						<v-tab>Register</v-tab>
						<v-tab>Login</v-tab>
						<v-tab-item>
							<RegisterForm></RegisterForm>
						</v-tab-item>
						<v-tab-item>
							<LoginForm></LoginForm>
						</v-tab-item>
					</v-tabs>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import LoginForm from '@/components/auth/loginForm.vue';
import RegisterForm from '@/components/auth/registerForm.vue';
@Component({
	components: { RegisterForm, LoginForm },
})
export default class Authcard extends Vue {}
</script>

<style scoped></style>
