<template>
	<div>
		<v-btn @click="dialogOpen = true"> Add Server <v-icon>mdi-plus</v-icon></v-btn>
		<v-dialog v-model="dialogOpen" max-width="500px" persistent>
			<v-card>
				<v-card-title>
					<span class="headline">Add Server</span>
				</v-card-title>
				<v-card-text>
					<v-container> </v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="blue darken-1" text @click="dialogOpen = false">Cancel</v-btn>
					<!--
          <v-btn color="blue darken-1" text :disabled="!isFormValid" @click="createSquad()">Save</v-btn>
        --></v-card-actions
				>
			</v-card>
		</v-dialog>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class ServerAdd extends Vue {
	private dialogOpen: boolean = false;
}
</script>

<style scoped></style>
