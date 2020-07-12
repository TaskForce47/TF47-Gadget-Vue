<template>
	<div>
		<v-menu top offset-y :close-on-content-click="false">
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon fab small depressed v-bind="attrs" v-on="on" @click="getNotifications">
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</template>
			<div class="notifications">
				<div class="d-flex mx-4">
					<h2>Notifications</h2>
					<v-btn icon class="ml-auto" @click="clearNotifications">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</div>

				<v-divider></v-divider>
				<template v-if="notifications.length">
					<v-virtual-scroll :items="notifications" height="250" width="400" item-height="70">
						<template v-slot="{ item }">
							<div class="d-flex w-full align-self-center mx-4 my-4">
								<v-icon color="success" v-if="item.type === 'success'">mdi-check-circle-outline</v-icon>
								<v-icon color="error" v-if="item.type === 'error'">mdi-close-circle-outline</v-icon>
								<div class="d-flex flex-column ml-2">
									<span>{{ item.text }}</span>
									<span class="subtitle-1 font-weight-thin">{{ new Date(item.timestamp).toLocaleString() }}</span>
								</div>
							</div>
						</template>
					</v-virtual-scroll>
				</template>
				<template v-else>
					<div class="d-flex justify-space-around mt-6">
						<v-icon style="font-size: 10em; opacity: 0.2">mdi-bell-off-outline</v-icon>
					</div>
					<div class="d-flex justify-space-around">
						<span>There are currently no notifications</span>
					</div>
				</template>
			</div>
		</v-menu>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Notifications extends Vue {
	private notifications: any = [];
	mounted(){
		this.getNotifications();
	}

	private getNotifications() {
		const storedNotifications = localStorage.getItem('notifications');
		if(storedNotifications){
			this.notifications = JSON.parse(storedNotifications);
			this.notifications.reverse();
		}else{
			this.notifications = [];
		}
	}

	private clearNotifications(){
		localStorage.removeItem('notifications');
		this.getNotifications();
	}
}
</script>

<style scoped>
.notifications {
	min-height: 287px;
	min-width: 400px;
	background-color: #131416;
}
</style>
