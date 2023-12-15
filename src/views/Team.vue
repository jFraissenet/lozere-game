<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="view-container" v-if="mounted">
    <div class="fs-30 fw-bold mg-y-6">{{ currentTeam?.name }}</div>
    <Missions :teamId="teamId" :handler="getMission" />
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { supabase } from "../lib/supabaseClient";
import { ref, onMounted, defineProps } from "vue";
import { team, mission } from "@/models/models";
import Missions from "@/components/Missions.vue";
import { useRoute, Router, useRouter } from "vue-router";
import router from "@/router/index";

// reactive state
let teamId: string | string[];
let mounted = ref(false);
let currentTeam = ref<team | null>();

// lifecycle hooks
onMounted(() => {
  debugger;
  const route = useRoute();
  teamId = route.params.id;
  getTeam();
  /*
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(queryString);
  if (urlParams.has("id")) {
    teamId = urlParams.get("id");
    getTeam();
  }
*/
  //const router = useRouter();
});

//
async function getMission(id: string) {
  //router.push({ name: "mission", params: { idm: id } });
  router.push({ name: "mission", params: { id: teamId, idm: id } });
}

async function getTeam() {
  await supabase
    .rpc("getteam", {
      var_id: teamId,
    })
    .then((d) => {
      if (d.data?.length > 0) {
        currentTeam = d.data[0];
        console.log(d.data[0]);
        console.log(currentTeam);
        mounted.value = true;
      }
    });
}
</script>
