<template>
  <div style="display: flex; justify-content: space-evenly; text-align: center">
    <div
      v-for="(m, index) in missions"
      :key="m.id"
      @click="props.handler(m.id)"
    >
      <div
        class="d-clickable"
        style="
          height: 35px;
          width: 35px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: aliceblue;
        "
        :class="[
          m.resolved
            ? 'resolved'
            : m.unlocked_at !== null && !m.resolved
            ? 'running'
            : 'locked',
        ]"
      >
        {{ index + 1 }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { missionsTeam } from "@/models/models";

interface Props {
  teamId: string;
  handler: (x: string) => void;
}

const props = defineProps<Props>();

// reactive state
let missions = ref<missionsTeam[] | null>([]);

// lifecycle hooks
onMounted(() => {
  getParams();
});

// functions that mutate state and trigger updates
async function getParams() {
  await supabase
    .rpc("getmissionsbyteam", {
      var_team_id: props.teamId,
    })
    .then((d) => {
      missions.value = d.data;
    });
}
</script>

<style lang="scss" scoped>
.resolved {
  background-color: green;
}

.running {
  background-color: rgb(128, 115, 0);
}

.locked {
  background-color: rgb(128, 26, 0);
}
</style>
