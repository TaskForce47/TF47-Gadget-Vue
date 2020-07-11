<template>
	<div>
		<!--<v-card height="fit-content" style="padding: 1rem">
			<v-row no-gutters>
				<v-col sm="6" class="px-5">
					<v-card raised height="100%">
						<v-card-title>Server</v-card-title>
						<v-card-text>
							<table style="width: 100%;">
								<tbody>
									<tr>
										<td>Name</td>
										<td>[TF47] MilSim Public Server #1 ACE|TFAR|RHS GER/EN</td>
									</tr>
									<tr>
										<td>Current Map</td>
										<td>Gulfcoast</td>
									</tr>
									<tr>
										<td>Current Mission</td>
										<td>tf47_kplib</td>
									</tr>
									<tr>
										<td>IP</td>
										<td>116.202.164.243:2302</td>
									</tr>
									<tr>
										<td>Ping</td>
										<td>46</td>
									</tr>
								</tbody>
							</table>
						</v-card-text>
					</v-card>
				</v-col>
				<v-col sm="6" class="pr-5">
					<v-card raised style="padding: 0.5rem">
						<v-card-title>
							Server Players
							<v-spacer></v-spacer>
							0 / 64
						</v-card-title>
						<v-simple-table height="300px" fixed-header>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Name</th>
										<th class="text-left">Time played</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in desserts" :key="item.name">
										<td>{{ item.name }}</td>
										<td>{{ item.calories }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card>
				</v-col>
			</v-row>
			<v-row no-gutters justify="center" class="pt-5">
				<v-col sm="6" class="px-5">
					<v-card raised height="100%"></v-card>
				</v-col>
				<v-col sm="6" class="pr-5 pl-0">
					<v-card raised style="padding: 0.5rem">
						<v-card-title
							>Mods
							<v-spacer></v-spacer>
							<v-btn><v-icon>mdi-download</v-icon>Export</v-btn>
						</v-card-title>
						<v-simple-table height="300px" fixed-header>
							<template v-slot:default>
								<thead>
									<tr>
										<th class="text-left">Name</th>
										<th class="text-left">Last updated</th>
										<th class="text-left">Workshop link</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="item in desserts" :key="item.name">
										<td>{{ item.name }}</td>
										<td>{{ item.calories }}</td>
										<td>{{ item.calories }}</td>
									</tr>
								</tbody>
							</template>
						</v-simple-table>
					</v-card>
				</v-col>
			</v-row>
		</v-card>-->
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Dashboard extends Vue {
	private desserts = [
		{
			name: 'Frozen Yogurt',
			calories: 159,
		},
		{
			name: 'Ice cream sandwich',
			calories: 237,
		},
		{
			name: 'Eclair',
			calories: 262,
		},
		{
			name: 'Cupcake',
			calories: 305,
		},
		{
			name: 'Gingerbread',
			calories: 356,
		},
		{
			name: 'Jelly bean',
			calories: 375,
		},
		{
			name: 'Lollipop',
			calories: 392,
		},
		{
			name: 'Honeycomb',
			calories: 408,
		},
		{
			name: 'Donut',
			calories: 452,
		},
		{
			name: 'KitKat',
			calories: 518,
		},
	];
}
</script>

<style lang="scss">
tr {
	height: 2rem;
}

.light::-webkit-scrollbar {
	width: 15px;
}

.theme--light::-webkit-scrollbar-track {
	background: #e6e6e6;
	border-left: 1px solid #dadada;
}

.light::-webkit-scrollbar-thumb {
	background: #b0b0b0;
	border: solid 3px #e6e6e6;
	border-radius: 7px;
}

.light::-webkit-scrollbar-thumb:hover {
	background: black;
}

.dark::-webkit-scrollbar {
	width: 15px;
}

.dark::-webkit-scrollbar-track {
	background: #202020;
	border-left: 1px solid #2c2c2c;
}

.dark::-webkit-scrollbar-thumb {
	background: #3e3e3e;
	border: solid 3px #202020;
	border-radius: 7px;
}

.dark::-webkit-scrollbar-thumb:hover {
	background: white;
}
</style>
