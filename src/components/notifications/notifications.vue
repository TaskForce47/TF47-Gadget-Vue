<template>
	<div>
		<v-menu top offset-y :close-on-content-click="false">
			<template v-slot:activator="{ on, attrs }">
				<v-btn icon fab small depressed v-bind="attrs" v-on="on">
					<v-icon>mdi-bell</v-icon>
				</v-btn>
			</template>
			<div class="notifications">
				<div class="d-flex mx-4">
					<h2>Notifications</h2>
					<v-btn icon class="ml-auto" @click="tmp = []">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</div>

				<v-divider></v-divider>
				<template v-if="tmp.length">
					<v-virtual-scroll :items="tmp" height="250" width="400" item-height="50">
						<template v-slot="{ item }">
							<div class="d-flex w-full align-self-center mx-4 my-4">
								<v-icon color="success" v-if="item.success">mdi-check-circle-outline</v-icon>
								<v-icon color="error" v-if="!item.success">mdi-close-circle-outline</v-icon>
								<span class="mt-2 ml-1">{{ item.name }}</span>
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
	private tmp = [
		{
			name: 'Whitelisted Player',
			success: true,
		},
		{
			name: 'Removed Squad',
			success: true,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
		{
			name: 'Failed to remove Squad',
			success: false,
		},
	];
}
</script>

<style scoped>
.notifications {
	min-height: 287px;
	min-width: 400px;
	background-color: #131416;
}
</style>
