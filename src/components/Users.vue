<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div v-for="team in teams" :key="team" class="teamWrapper">
    <span class="teamTitle">{{ team }}</span>

    <el-carousel :interval="2000" type="card" height="100px">
      <el-carousel-item
        v-for="usr in usrs?.filter((x) => x.name == team)"
        :key="usr"
      >
        <img :src="getPicture(usr.icon)" style="width: 100px" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { supabase } from "../lib/supabaseClient";
import { defineComponent } from "vue";
import { gamers } from "../models/models";

/*
    <div style="display: flex" class="picturesRow">
      <img
        style="width: 100px"
        v-for="usr in usrs?.filter((x) => x.name == team)"
        :key="usr"
        :src="getPicture(usr.icon)"
      />
    </div>
*/
export default defineComponent({
  props: {
    //usr: Function,
  },
  data() {
    return {
      usrs: [] as gamers[] | null,
      teams: new Set(),
    };
  },
  async mounted() {
    await this.getGamers();
  },
  methods: {
    async getGamers() {
      await supabase.rpc("getusers").then((d) => {
        this.usrs = d.data;
        this.teams = new Set(d.data?.map((x) => x.name));
      });
    },
    getPicture(icon: string) {
      return require("../assets/images/" + icon);
    },
  },
});
</script>

<style>
.teamWrapper {
}

.teamTitle {
  padding: 15px;
  font-size: 20px;
  margin-bottom: 10px;
}

.picturesRow {
  overflow-x: scroll;
  width: fit-content;
}

ul.el-carousel__indicators.el-carousel__indicators--horizontal {
  display: none;
}
</style>
