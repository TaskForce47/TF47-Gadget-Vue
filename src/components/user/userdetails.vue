<template>
  <div>
    <template v-if="ready">
      <v-row align="center" justify="center">
        <v-card width="25rem" v-if="userDetails" raised style="padding: 2rem">
          <v-card raised>
            <v-img v-if="userDetails.avatar" :src="userImg" contain>
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
          <v-row justify="center">
            <v-card-title>{{ userDetails.profileName }}</v-card-title>
          </v-row>
          <v-card-text>
            <p>
              PlayerUid: {{ userDetails.playerUid }}
              <span v-if="userDetails.playerUid == null" style="color: red"
                >not set</span
              >
            </p>
            <span style="margin-right: 0.5rem">Roles:</span>
            <v-chip
              v-for="role in userDetails.roles"
              v-bind:key="role"
              style="margin-right: 0.25rem"
            >
              {{ role }}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-row>
      <playeruidsetter v-on:setPlayerUid="getUserDetails"></playeruidsetter>
    </template>

    <v-progress-circular
      v-if="!ready"
      indeterminate
      color="grey lighten-5"
    ></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { IUserDetails } from "@/services/utils/models";
import Playeruidsetter from "@/components/user/playeruidsetter.vue";
import { getUserDetails } from "@/services/user";
@Component({
  components: { Playeruidsetter }
})
export default class Userdetails extends Vue {
  private userDetails: IUserDetails | null = null;
  private roles: string[] | null | undefined = [];
  private userImg: string | null = null;
  private ready: boolean = false;

  created() {
    this.getUserDetails();
    this.roles = this.userDetails?.roles;
  }
  @Watch("userDetails")
  onPropertyChanged(value: IUserDetails) {
    if (value) {
      this.userImg = `https://forum.taskforce47.com${this.userDetails?.avatar}`;
    }
  }

  private async getUserDetails() {
    this.ready = false;
    getUserDetails().then((response: IUserDetails) => {
      this.userDetails = response;
      this.ready = true;
    });
  }
}
</script>

<style scoped>
div.v-subheader {
}
</style>
