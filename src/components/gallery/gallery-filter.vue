<template>
	<v-menu v-model="menu" :close-on-content-click="false" :nudge-left="210" offset-y>
		<template v-slot:activator="{ on, attrs }">
			<v-btn dark v-bind="attrs" v-on="on" class="ml-auto">
				Filter
				<v-icon v-if="!menu">mdi-filter</v-icon>
				<v-icon v-if="menu">mdi-filter-menu</v-icon>
			</v-btn>
		</template>
		<v-card>
			<div class="d-flex  flex-column pa-4">
				<v-select :items="sortingOptions" :value="sortingOptions[0]"></v-select>
				<h3>Image Tags</h3>
				<v-chip-group column>
					<gallery-tag tag-name="Meme"></gallery-tag>
					<gallery-tag tag-name="Screenshot"></gallery-tag>
					<gallery-tag tag-name="Test"></gallery-tag>
				</v-chip-group>
			</div>
		</v-card>
	</v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GalleryTag from '@/components/gallery/gallery-tag.vue';
@Component({
	components: { GalleryTag },
})
export default class GalleryFilter extends Vue {
	private sortingOptions: Array<string> = ['Newest', 'Most Popular', 'Oldest'];
}
</script>

<style scoped></style>
