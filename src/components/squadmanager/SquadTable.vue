<template>
	<div>
		<v-card>
			<v-card-title>
				Squadmanager
				<v-spacer></v-spacer>
				<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					label="Search"
					single-line
					hide-details
				></v-text-field>
				<v-btn @click="toggleAddDialog()" style="margin-left: 2rem"><v-icon>mdi-plus</v-icon></v-btn>
				<v-btn @click="refreshSquads()" style="margin-left: 1rem" :disabled="!squads">
					<v-icon>mdi-autorenew</v-icon>
				</v-btn>
			</v-card-title>
			<v-data-table
				:headers="headers"
				:items="squads"
				:search="search"
				:items-per-page="numItems"
				:loading="loading"
				:footer-props="{
					'items-per-page-options': $tstore.state.globalRowsPerTable,
				}"
			>
				<template v-slot:item.actions="{ item }">
					<v-icon small class="mr-2" @click="openSquad(item)">
						mdi-magnify
					</v-icon>
				</template>
			</v-data-table>
		</v-card>
		<v-dialog v-model="addDialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">Add Squad</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-form v-model="isFormValid">
							<v-text-field v-model="squadNick" label="Nick" :rules="rules.ruleSquadNick"></v-text-field>
							<v-text-field v-model="squadName" label="Name" :rules="rules.ruleSquadName"></v-text-field>
							<v-text-field
								v-model="squadEmail"
								label="E-Mail"
								:rules="rules.ruleSquadEmail"
							></v-text-field>
							<v-text-field v-model="squadWeb" label="Web" :rules="rules.ruleSquadWeb"></v-text-field>
							<v-text-field v-model="squadTitle" label="Title" :rules="rules.ruleSquadTitle"></v-text-field>
						</v-form>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="toggleAddDialog()">Cancel</v-btn>
					<v-btn color="blue darken-1" text :disabled="!isFormValid" @click="createSquad()">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<snackbar v-if="open" :color="color" :text="text" :open.sync="open"></snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { createSquad, getSquads } from '@/services/squad';
import Snackbar from '@/components/snackbar/snackbar.vue';
import { SquadI } from '@/services/utils/models';
@Component({
	components: { Snackbar },
})
export default class SquadTable extends Vue {
	constructor() {
		super();
		this.numItems = Number(this.getItemsPerPage);
	}
	private text = '';
	private color = '';
	public open = false;
	private squads: Array<SquadI> | Array<null> = [];
	private squadNick = '';
	private squadName = '';
	private squadEmail = '';
	private squadWeb = '';
	private squadTitle = '';
	private rules = {
		ruleSquadNick: [(value: string) => !!value || 'Required.'],
		ruleSquadName: [(value: string) => !!value || 'Required.'],
		ruleSquadEmail: [
			(value: string) => !!value || 'Required.',
			(value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid',
		],
		ruleSquadWeb: [(value: string) => !!value || 'Required.'],
		ruleSquadTitle: [(value: string) => !!value || 'Required.'],
	};
	private isFormValid = false;
	public search = '';
	private numItems: number | null;
	private addDialog = false;
	private loading = false;
	public headers = [
		{ text: 'ID', align: 'center', sortable: true, value: 'id' },
		{ text: 'Name', align: 'center', sortable: true, value: 'squadName' },
		{ text: 'Title', value: 'squadTitle', align: 'center', sortable: true },
		{ text: 'Nick', value: 'squadNick', align: 'center', sortable: true },
		{ text: 'Web', value: 'squadWeb', align: 'center', sortable: true },
		{ text: 'E-Mail', value: 'squadEmail', align: 'center', sortable: true },
		{ text: 'Actions', value: 'actions', sortable: false },
	];
	created() {
		this.refreshSquads();
	}

	private get getItemsPerPage() {
		return localStorage.getItem('defaultRowsPerPage') !== null ? localStorage.getItem('defaultRowsPerPage') : '10';
	}

	private refreshSquads() {
		this.loading = true;
		getSquads().then((response: Array<SquadI>) => {
			this.squads = response;
			this.loading = false;
		});
	}

	private openSquad(item: SquadI) {
		this.$router.push(`/administration/squadmanager/${item.id}`);
	}

	private createSquad() {
		createSquad({
			squadNick: this.squadNick,
			squadName: this.squadName,
			squadEmail: this.squadEmail,
			squadWeb: this.squadWeb,
			squadTitle: this.squadTitle,
		}).then((response: boolean) => {
			if (response) {
				this.refreshSquads();
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Successfully created Squad',
					type: 'success',
				});
			} else {
				this.$tstore.dispatch('setSnackbar', {
					showing: true,
					text: 'Failed to create Squad',
					type: 'error',
				});
			}
		});
		this.addDialog = false;
	}

	private toggleAddDialog() {
		this.addDialog = !this.addDialog;
	}
}
</script>

<style scoped></style>
