<template>
	<v-card height="fit-content">
		<v-card-title>
			Gallery
			<v-spacer></v-spacer>
			<v-btn color="success" outlined>Add Image<v-icon>mdi-plus</v-icon></v-btn></v-card-title
		>
		<div class="container">
			<div class="d-flex">
				<gallery-filter></gallery-filter>
			</div>
			<div class="d-flex flex-wrap container justify-center">
				<gallery-image img-link="https://taskforce47.com/img/TF47_GER_100.18e7cd93.svg"></gallery-image>
			</div>
		</div>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GalleryImage from '@/components/gallery/gallery-image.vue';
import GalleryTag from '@/components/gallery/gallery-tag.vue';
import GalleryFilter from '@/components/gallery/gallery-filter.vue';
@Component({
	components: { GalleryFilter, GalleryTag, GalleryImage },
})
export default class ImageOverview extends Vue {}
</script>

<style scoped></style>
