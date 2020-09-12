<template>
	<div class="d-flex flex-column">
		<v-card min-height="200" max-width="700" class="px-4 pt-4 pb-1 d-flex flex-column mt-2">
			<div class="d-flex flex-wrap flex-column-reverse flex-md-row">
				<div class="d-flex">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								class="mr-2 mt-1"
								fab
								v-bind="attrs"
								v-on="on"
								color="green"
								height="15"
								width="15"
								depressed
							></v-btn>
						</template>
						<span>Online</span>
					</v-tooltip>
					<h3>[TF47] MilSim Public Server #1 ACE|TFAR|RHS GER/ENG</h3>
				</div>
				<v-btn class="mb-2 mb-md-0 ml-md-auto" outlined color="grey" @click="openServer">Manage</v-btn>
			</div>
			<div class="mt-4 mt-md-0">
				<div class="d-flex flex-column">
					<div class="d-flex">
						<span>Current Mission: </span><span class="ml-2 text--disabled"> TF47 KP Liberation Altis</span>
					</div>
					<div class="d-flex"><span>Current Map:</span><span class="ml-2 text--disabled"> Altis</span></div>
					<div class="d-flex">
						<span>IP:</span><span class="ml-2 text--disabled"> 116.202.164.243:2302</span>
					</div>
				</div>
			</div>

			<div class="mt-md-auto mt-4 text--disabled">
				<v-divider></v-divider>
				<div class="d-flex flex-md-row flex-column mt-1">
					<div>
						<v-btn text class="mr-1">Players:</v-btn>
						<span class="mr-4 self-align-center">50 / 64</span>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-progress-circular
									:value="value"
									v-bind="attrs"
									v-on="on"
									color="gadgetText"
								></v-progress-circular>
							</template>
							<span>50 / 64</span>
						</v-tooltip>
					</div>
					<v-divider vertical class="ml-2 mr-2"></v-divider>
					<div class="d-flex">
						<v-btn text class="mr-1">Ping:</v-btn>
						<span class="mr-2 align-self-center">28ms</span>
						<div class="ml-md-auto align-self-center">
							<v-tooltip bottom>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										fab
										v-bind="attrs"
										v-on="on"
										color="green"
										height="30"
										width="30"
										depressed
									></v-btn>
								</template>
								<span>28ms</span>
							</v-tooltip>
						</div>
					</div>
					<v-divider vertical class="ml-2 mr-2"></v-divider>
					<div class="mt-1 ml-md-auto ml-4">
						<span>Next restart in 270 minutes</span>
					</div>
				</div>
			</div>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ServerCard extends Vue {
	private value = 79;

  private openServer() {
    this.$router.push(`/administration/server-control/${1}`);
  }
}
</script>

<style scoped></style>
