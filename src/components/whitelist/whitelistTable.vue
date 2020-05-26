<template>
	<div>
		<v-card>
			<v-card-title>
				Whitelist
				<v-spacer></v-spacer>
				<v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
			</v-card-title>
			<v-data-table :headers="headers" :items="user" :search="search">
				<template v-slot:item="{ item }">
					<tr>
						<td v-for="(col, columnIndex) in headers" v-bind:key="columnIndex">
							<v-layout justify-center>
								<div v-if="columnIndex > 1">
									<v-checkbox color="accent" v-model="item.whitelists[col.value].enabled" r></v-checkbox>
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
import { Component, Vue } from "vue-property-decorator";
import { applyWhitelist, getAvailableWhitelist, getWhitelistAllUser } from "@/services/api";
import SetWhitelistUser from "@/models/SetWhitelistUser";
import UserWhitelist from "@/models/UserWhitelist";
import Snackbar from "@/components/snackbar/snackbar.vue";
import { DataTableHeader } from "vuetify";
@Component({
	components: { Snackbar },
})
export default class WhitelistTable extends Vue {
	public dialog = false;
	public player: UserWhitelist | string = "";
	private color = "";
	private text = "";
	public open = false;
	public openDialog(item: UserWhitelist) {
		this.dialog = true;
		this.player = item;
	}
	public save(player: UserWhitelist) {
		const whitelist: SetWhitelistUser[] = [];
		player.whitelists.forEach(userWhitelist => {
			whitelist.push({
				playerId: player.id,
				enabled: userWhitelist.enabled,
				whitelistId: userWhitelist.id,
			});
		});
		if (applyWhitelist(whitelist)) {
			this.dialog = false;
			this.color = "green";
			this.text = "Successfully whitelisted User";
			this.open = true;
		} else {
			this.color = "red";
			this.text = "Failed to whitelist User";
			this.open = true;
		}
	}
	public search = "";
	public headers = [
		{
			text: "Player Uid",
			align: "center",
			sortable: false,
			value: "playerUid",
		},
		{ text: "Name", value: "playerName", align: "center", sortable: false },
	];
	private customHeaders: DataTableHeader[] = [];
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
				this.customHeaders.push({
					value: `${avWhitelist.id - 1}`,
					text: avWhitelist.description,
					sortable: false,
				});
			});
		});
		getWhitelistAllUser().then(data => {
			this.user = data;
		});
	}
}
</script>

<style scoped></style>
