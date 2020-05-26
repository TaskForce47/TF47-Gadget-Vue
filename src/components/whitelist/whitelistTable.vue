<template>
	<div>
		<v-card>
			<v-card-title>
				Whitelist
				<v-spacer></v-spacer>
				<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
				<v-btn @click="refreshUserData" style="margin-left: 2rem" :disabled="!user"><v-icon>mdi-autorenew</v-icon></v-btn>
			</v-card-title>
			<v-data-table :headers="headers" :items="user" :search="search" :items-per-page.sync="numItems">
				<template v-slot:item="{ item }">
					<tr>
						<td v-for="(col, columnIndex) in headers" v-bind:key="columnIndex">
							<v-layout justify-center>
								<div v-if="columnIndex > 1">
									<v-checkbox
										dense
										color="accent"
										v-model="item.whitelists[col.value].enabled"
										@change="updateWhitelist(item.id, item.whitelists[col.value].id, item.whitelists[col.value].enabled)"
									></v-checkbox>
								</div>
								<div v-else-if="columnIndex === 0 || columnIndex === 1">
									<p>{{ item[col.value] }}</p>
								</div>
							</v-layout>
						</td>
					</tr>
				</template>
			</v-data-table>
		</v-card>
		<snackbar v-if="open" :color="color" :text="text" :open.sync="open"></snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { applyWhitelist, getAvailableWhitelist, getWhitelistAllUser } from "@/services/api";
import SetWhitelistUser from "@/models/SetWhitelistUser";
import UserWhitelist from "@/models/UserWhitelist";
import Snackbar from "@/components/snackbar/snackbar.vue";
@Component({
	components: { Snackbar },
})
export default class WhitelistTable extends Vue {
	constructor() {
		super();
		this.numItems = Number(WhitelistTable.getItemsPerPage);
	}
	private color = "";
	private numItems: number | null;
	private text = "";
	public open = false;
	public search = "";
	public headers = [
		{
			text: "Player Uid",
			align: "center",
			sortable: true,
			value: "playerUid",
		},
		{ text: "Name", value: "playerName", align: "center", sortable: true },
	];
	public user: UserWhitelist[] = [];
	created() {
		getAvailableWhitelist().then(availableWhitelist => {
			availableWhitelist.forEach(avWhitelist => {
				this.headers.push({
					value: `${avWhitelist.id - 1}`,
					text: avWhitelist.description,
					sortable: false,
					align: "center",
				});
			});
		});
		this.refreshUserData();
	}

	@Watch("numItems")
	onPropertyChanged(value: number) {
		if (value) {
			localStorage.setItem("itemsPerPageWhitelist", value.toString());
		}
	}

	private static get getItemsPerPage() {
		return localStorage.getItem("itemsPerPageWhitelist") !== null ? localStorage.getItem("itemsPerPageWhitelist") : "10";
	}

	private updateWhitelist(playerId: number, whitelistId: number, enabled: boolean) {
		const whitelist: SetWhitelistUser[] = [];
		whitelist.push({
			playerId: playerId,
			enabled: enabled,
			whitelistId: whitelistId,
		});
		if (applyWhitelist(whitelist)) {
			this.color = "green";
			this.text = "Successfully whitelisted User";
			this.open = true;
		} else {
			this.color = "red";
			this.text = "Failed to whitelist User";
			this.open = true;
		}
	}

	private refreshUserData() {
		getWhitelistAllUser().then(data => {
			this.user = data;
		});
	}
}
</script>

<style scoped></style>
