<template>
  <div></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps } from "vue";
import { supabase } from "@/lib/supabaseClient";
import { mission } from "@/models/models";

interface Props {
  mission: mission;
}

const props = defineProps<Props>();

// reactive state

// lifecycle hooks
onMounted(() => {
  console.log("mounted");
});

// functions that mutate state and trigger updates
</script>

<style lang="scss" scoped></style>
