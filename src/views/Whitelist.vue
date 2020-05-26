<template>
  <div>
    <WhitelistTable></WhitelistTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import WhitelistTable from "@/components/whitelist/whitelistTable.vue";
@Component({
  components: { WhitelistTable }
})
export default class Whitelist extends Vue {}
</script>

<style scoped></style>
