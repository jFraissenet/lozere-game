<template>
  <div
    class="mg-t-15"
    style="
      min-height: 100vh;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 10px;
    "
  >
    <div class="m-txt-right">
      <button
        class="d-clickable"
        style="background-color: black; color: aliceblue"
        @click="inds = !inds"
      >
        HELP
      </button>
    </div>
    <div class="fs-18 fw-bold mg-b-18 pd-t-10">
      {{ currentTeamMission?.mission.title }}
    </div>

    <pre class="pd-g-15 fs-15 m-txt-left" style="white-space: pre-wrap">{{
      currentTeamMission?.mission.description
    }}</pre>

    <Indices v-if="inds" :missionId="missionId" :teamId="teamId" />

    <div class="gen-code-confirm" v-if="!inds">
      <input v-model="code" />
      <button @click="checkCode()">Confirmer</button>
      <div>{{ currentTeamMission?.try }} Essaie</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { mission, team_mission } from "@/models/models";
import { useRoute, Router, useRouter } from "vue-router";
import router from "@/router/index";
import Indices from "@/components/Indices.vue";

interface Props {
  idm: string;
}

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
const teamId = ref<string | null>("");
const missionId = ref<string | null>("");
const route = useRoute();
//const router = useRouter();
const props = defineProps<Props>();
const code = ref<string>("");
const inds = ref<boolean>(false);
//let missionId: string | string[];
//let currentMission = ref<mission | null>();
let currentTeamMission = ref<team_mission | null>();
// reactive state

// lifecycle hooks
onMounted(() => {
  // Team ID in the URL
  //debugger;
  const route = useRoute();
  teamId.value = route.params.id;
  missionId.value = route.params.idm;
  getMission(missionId.value);
  /*
  if (urlParams.has("id")) {
    teamId.value = urlParams.get("id");
  }
  if (urlParams.has("mission")) {
    missionId.value = urlParams.get("mission");
    getMission(missionId.value);
  }*/
});

/**
 * @summary: Watch all update of route.param.idm
 */
watch(
  () => route.params.idm,
  (newId: string, oldId: string) => {
    console.log(newId + " " + oldId);
    // Load mission when url changes
    getMission(newId);
  }
);

async function getMission(idmission: string | null) {
  await supabase
    .from("team_mission")
    .select(
      `id,team_id,mission_id, order, try, mission(id, title, code, resolved, description)`
    )
    .match({
      team_id: teamId.value,
      mission_id: idmission,
    })
    .then((d: team_mission[]) => {
      currentTeamMission.value = d.data[0];
    });
}

function checkCode() {
  debugger;
  //Si faux -> + 1
  console.log(code.value);
}

// functions that mutate state and trigger updates
</script>

<style lang="scss" scoped>
.gen-code-confirm {
  display: grid;
  justify-content: space-evenly;
  font-size: 15px;
  & input {
    background-color: rgba(100, 100, 100, 0.6);
    /* opacity: 0.6; */
    color: #cacaca;
    padding: 5px;
    margin-bottom: 5px;
    border: none;
    color: white;
  }

  & button {
    border-radius: 10px;
    border: none;
    background-color: rgb(32, 72, 32);
    color: white;
    padding: 5px;
  }
}

.help-title {
  display: flex;
  flex-direction: columns;
  align-items: flex-start;
}
.help-title .mission-help {
  //align-self: self-start;
}

.help-title .mission-title {
  align-self: center;
}
</style>
