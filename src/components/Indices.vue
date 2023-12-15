<template>
  <div v-if="mounted">
    <div
      v-for="(indice, index_ids) in indices"
      :key="indice.tmi_id"
      class="mg-t-10"
      :class="indice.tmi_disable ? 'indice_disabled' : ''"
    >
      <div
        class="mg-y-5 fs-20 fw-bold"
        style="border-bottom: 1px solid; border-top: 1px solid"
      >
        Indice {{ indice.tmi_ord }}
      </div>
      <div
        class="mg-y-10"
        style="
          min-height: 30px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
        "
        :style="!indice.tmi_unlocked ? { color: '#ff7575' } : {}"
      >
        {{
          indice.tmi_unlocked
            ? indice.tmi_desc
            : "Afin d'accéder à l'indice, vous devez gagner un défis"
        }}
      </div>

      <div v-if="!indice.tmi_disable && indice.inds_dfs[0].f1">
        <div v-for="defis in indice.inds_dfs" :key="defis?.id">
          <div class="mg-l-5 mg-t-8 mg-b-8" style="text-align: left">
            <span
              class="tag-defis"
              :class="
                defis.f3
                  ? 'tag-defis-running'
                  : defis.f2
                  ? 'tag-defis-won'
                  : 'tag-defis-failed'
              "
              >{{
                defis.f3 ? "En cours" : defis.f2 ? "Vainqueur" : " Perdant"
              }}</span
            >
            {{ defis.f4 }} Contre {{ defis.f5 }}
          </div>
        </div>
      </div>

      <div
        class="m-display mg-b-5"
        v-if="
          !indice.tmi_disable && !indice.tmi_running && !indice.tmi_unlocked
        "
      >
        <div style="width: 200px">Choisissez votre Défis</div>
        <el-select
          v-model="selectedDefis[index_ids]"
          placeholder="Select"
          size="small"
          effect="dark"
        >
          <el-option
            v-for="d in indice.dfs"
            :key="d.id"
            :label="d.title"
            :value="d.id"
            :disabled="indice.tmi_unlocked"
          />
        </el-select>
      </div>

      <div
        class="m-display mg-b-10"
        v-if="
          !indice.tmi_disable && !indice.tmi_running && !indice.tmi_unlocked
        "
      >
        <div style="width: 200px">Contre</div>
        <el-select
          v-model="selectedTeam[index_ids]"
          placeholder="Select"
          size="small"
          effect="dark"
        >
          <el-option
            v-for="t in indice.t_against"
            :key="t.id"
            :label="t.name"
            :value="t.id"
          />
        </el-select>
      </div>

      <pre class="pd-g-15 fs-15 m-txt-left" style="white-space: pre-wrap">{{
        indice.dfs.filter((x: defis) => x.id === selectedDefis[index_ids])[0]
          ?.description
      }}</pre>

      <div v-if="!indice.tmi_disable && !indice.tmi_unlocked">
        <div
          v-if="!indice?.tmi_running"
          :class="
            !selectedDefis[index_ids] || !selectedTeam[index_ids]
              ? 'indice_disabled'
              : ''
          "
        >
          <el-button
            type="primary"
            plain
            @click="launchDefis(indice, index_ids)"
            >Lancer le défis</el-button
          >
        </div>
        <div v-else>
          <el-button type="success" plain @click="win(indice)"
            >Vainqueur</el-button
          >
          <el-button type="danger" plain @click="lose(indice)"
            >Perdant</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, watch } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { defis, indicesDefis } from "@/models/models";
import { useRoute, Router, useRouter } from "vue-router";

interface Props {
  missionId: string;
  teamId: string | null;
}

const props = defineProps<Props>();

// reactive state
let indices = ref<indicesDefis[] | null>([]);
let mounted = ref<boolean>(false);
let selectedDefis = ref<[]>([]);
let selectedTeam = ref<[]>([]);

const route = useRoute();

// lifecycle hooks
onMounted(() => {
  console.log("mounted");
  getIndices();
});

watch(
  () => route.params.idm,
  (newId: string, oldId: string) => {
    console.log(newId + " " + oldId);
    // Load mission when url changes
    getIndices(newId);
  }
);

async function getIndices() {
  await supabase
    .rpc("gethelpbyteammission", {
      var_mission_id: route.params.idm,
      var_team_id: route.params.id,
    })
    .then((d) => {
      indices.value = d.data;
      console.log(d.data);
      mounted.value = true;
    });
}

async function launchDefis(ind: indicesDefis, idx: number) {
  const ok: boolean = confirm("êtes vous sûr de vouloir commencer le défis ?");
  if (ok) {
    await supabase
      .from("team_mission_indice_defis")
      .insert({
        team_mission_indice_id: ind.tmi_id,
        team_defied_id: selectedTeam.value[idx],
        defis_id: selectedDefis.value[idx],
        active: true,
      })
      .then(async (d) => {
        const nbrDefisUtilisation: number = ind.dfs.filter(
          (x: defis) => x.id === selectedDefis.value[idx]
        )[0].used;
        await supabase
          .from("defis")
          .update({ used: nbrDefisUtilisation + 1 })
          .eq("id", selectedDefis.value[idx])
          .then(() => {
            selectedDefis.value[idx] = null;
            selectedTeam.value[idx] = null;
            getIndices();
          });
      });
  }
}

async function lose(ind: indicesDefis) {
  console.log(ind);
  const tmis: string = ind.inds_dfs.filter((x) => x.f3)[0].f1;

  // Mettre le defis a perdu, inactif
  await supabase
    .from("team_mission_indice_defis")
    .update({ active: false, won: false })
    .eq("id", tmis)
    .then(() => {
      getIndices();
    });
}

async function win(ind: indicesDefis) {
  const tmis: string = ind.inds_dfs.filter((x) => x.f3)[0].f1;

  // Mettre le defis a perdu, inactif
  await supabase
    .from("team_mission_indice_defis")
    .update({ active: false, won: true })
    .eq("id", tmis)
    .then(async () => {
      await supabase
        .from("team_mission_indice")
        .update({ unlocked: true })
        .eq("id", ind.tmi_id)
        .then(async () => {
          await supabase
            .from("team_mission_indice")
            .update({ disable: false })
            .match({
              team_mission_id: ind.team_mission_id,
              odr: ind.tmi_ord + 1,
            })
            .then(() => {
              getIndices();
            });
        });
    });
}

// functions that mutate state and trigger updates
</script>

<style lang="scss">
.el-input__wrapper {
  background-color: grey;
  color: white;
}

.indice_disabled {
  filter: blur(3px);
  pointer-events: none;
}

.tag-defis {
  padding: 3px;
  border-radius: 5px;
}

.tag-defis-running {
  color: #fb953b;
  background-color: #fdeccd;
}
.tag-defis-won {
  color: #218f00;
  background-color: rgb(180, 255, 201);
}

.tag-defis-failed {
  color: #cd1703;
  background-color: rgb(255, 215, 195);
}
</style>
