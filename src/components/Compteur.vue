<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div
    v-if="timer > 0"
    style="
      color: white;
      font-size: 40;
      display: flex;
      justify-content: space-evenly;
    "
  >
    <div class="block-date">
      <div class="block-nbr">
        {{ day }}
      </div>
      <div class="block-label">J</div>
    </div>

    <div class="block-date">
      <div class="block-nbr">
        {{ hour }}
      </div>
      <div class="block-label">H</div>
    </div>

    <div class="block-date">
      <div class="block-nbr">
        {{ min }}
      </div>
      <div class="block-label">M</div>
    </div>

    <div class="block-date">
      <div class="block-nbr">
        {{ sec }}
      </div>
      <div class="block-label">S</div>
    </div>
  </div>
  <div
    v-else
    style="
      color: white;
      font-size: 40;
      display: flex;
      justify-content: space-evenly;
    "
  >
    L'heure a sonné, place à la poursuite du trésor
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    goal: {
      type: String,
      required: true,
    },
  },
  // type inference enabled
  data() {
    return {
      // eslint-disable-next-line no-undef
      timer: 0,
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };
  },
  mounted() {
    const now: number = new Date().getTime();
    const nbrReach: number = Date.parse(this.goal!);
    this.timer = nbrReach - now;
  },
  created() {
    //setTimeout(this.getStatus, 1);
    setTimeout(() => {
      this.timer -= 1;
    }, 1000);
  },

  watch: {
    timer: function () {
      setTimeout(() => {
        this.timer -= 500;
        this.computeTime(this.timer);
      }, 1000);
    },
  },
  methods: {
    computeTime(tm: number) {
      this.day = Math.floor(tm / 86400000);
      let tempTimer: number = tm - this.day * 86400000;
      this.hour = Math.floor(tempTimer / 3600000);
      tempTimer = tempTimer - this.hour * 3600000;
      this.min = Math.floor(tempTimer / 60000);
      tempTimer = tempTimer - this.min * 60000;
      this.sec = Math.floor(tempTimer / 1000);
    },
  },
});
</script>

<style>
.block-date {
  width: 60px;
  height: 100px;
  background-color: rgba(189, 189, 189, 0.5);
  border-radius: 10px;
}

.block-nbr,
.block-label {
  height: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.block-label {
  border-top: 1px solid black;
}
</style>
