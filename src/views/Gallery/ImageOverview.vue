<template>
	<v-card height="fit-content">
		<v-card-title>
			Gallery
			<v-spacer></v-spacer>
			<v-btn color="success" outlined><v-icon>mdi-plus</v-icon></v-btn></v-card-title
		>
    <div class="d-flex flex-wrap container justify-center">
        <gallery-image img-link="https://taskforce47.com/img/TF47_GER_100.18e7cd93.svg"></gallery-image>
        <gallery-image img-link="https://pbs.twimg.com/media/EcpW40fXsAAvgbt?format=jpg&name=small"></gallery-image>
        <gallery-image img-link="https://i.imgur.com/ilBhjV6.jpg"></gallery-image>
    </div>
	</v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import GalleryImage from "@/components/gallery/gallery-image.vue";
@Component({
  components: {GalleryImage}
})
export default class ImageOverview extends Vue {}
</script>

<style scoped></style>
