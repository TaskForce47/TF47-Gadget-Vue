<template>
	<div v-if="ready && squads && squads.length > 0">
		<v-card>
			<v-card-title>Your Squads</v-card-title>
			<div class="px-4 pb-4">
				<v-card v-for="squad of squads" v-bind:key="squad.squadId" outlined class="d-flex flex-wrap px-2 mt-4">
					<v-img
						:src="
							squad.squadHasPicture === true
								? `https://api.taskforce47.com/squadxml/${squad.squadNick}/logo.png`
								: ''
						"
						style="max-width: 128px; max-height: 128px; height: 128px; width: 128px"
					>
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular
									v-if="!ready"
									indeterminate
									color="grey lighten-5"
								></v-progress-circular>
								<div class="d-flex justify-center" v-if="ready && squad.squadHasPicture === false">
									<span class="align-self-center">No Image</span>
								</div>
							</v-row>
						</template>
					</v-img>
					<div class="d-flex flex-column mt-4 ml-2">
						<h1>{{ squad.squadTitle }} [{{ squad.squadNick }}]</h1>
						<span>Email: {{ squad.squadEmail }}</span>
						<span>Web: {{ squad.squadWeb }}</span>
						<span>Your Remark: {{ squad.remark }}</span>
					</div>
					<v-spacer></v-spacer>
					<div class="mt-5">
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn icon @click="copyXMLLink(squad.squadId)" v-on="on" v-bind="attrs" class="mr-2">
									<v-icon>mdi-content-copy</v-icon>
								</v-btn>
							</template>
							<span>Copy XML Link</span>
						</v-tooltip>
						<v-tooltip bottom>
							<template v-slot:activator="{ on, attrs }">
								<v-btn outlined color="error" v-on="on" v-bind="attrs" @click="leaveSquad(squad.squadId)">
									<v-icon>mdi-door</v-icon>
								</v-btn>
							</template>
							<span>Leave</span>
						</v-tooltip>
					</div>
				</v-card>
			</div>
		</v-card>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getSquads, leaveSquad } from '@/services/user';
import { GetSquad } from '@/services/utils/models';
import { getSquadXML } from '@/services/squad';
@Component
export default class MySquads extends Vue {
	private squads: Array<GetSquad> = [];
	private ready: boolean = false;
	constructor() {
		super();
		this.ready = false;
		this.getSquads();
	}

	private getSquads() {
		getSquads().then((response: Array<GetSquad>) => {
			this.squads = response;
			this.ready = true;
		});
	}

	private leaveSquad(squadId: number) {
		leaveSquad(squadId).then((response: boolean) => {
			if (response) {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully left Squad',
					type: 'success',
				});
				this.getSquads();
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to leave Squad',
					type: 'error',
				});
			}
		});
	}

	private copyXMLLink(squadId: number) {
		getSquadXML(squadId).then(xml => {
			if (xml) {
				navigator.clipboard.writeText(xml.squadLink);
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully copied Squad XML to clipboard',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to copy Squad XML to clipboard',
					type: 'error',
				});
			}
		});
	}
}
</script>

<style scoped></style>
