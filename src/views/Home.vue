<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable prettier/prettier -->
<template>
  <div class="view-container" v-if="params ? params?.length > 0 : 0">
    <h1 style="color: white">{{ params ? params[0]?.title : "" }}</h1>
    <Compteur :goal="params ? params[0]?.start_at : ''" />

    <div class="audioDiv"><p @click="play()">ECOUTEZ MOI</p></div>

    <p class="introduction" style="margin-bottom: 20px">
      {{ params ? params[0]?.description : "" }}
    </p>

    <div @click="showUsers = true" class="gamersTeamButton">
      <p>Regarde à quelle lignée tu appartiens</p>
    </div>
    <div style="display: flex; justify-content: space-evenly">
      <button
        class="team-button"
        v-for="team in teams"
        :key="team.id"
        @click="onClickCode(team!)"
      >
        {{ team.name }}
      </button>
    </div>

    <el-dialog class="dialog-users" v-model="showUsers">
      <Users v-if="showUsers" />
    </el-dialog>

    <el-dialog
      class="dialog-waiter"
      v-if="!running"
      v-model="showCode"
      :title="selectedTeam!.name + ', votre heure n\'a pas sonné'"
      height="50%"
    >
    </el-dialog>
    <el-dialog
      v-else
      class="dialog-code"
      v-model="showCode"
      :title="selectedTeam!.name + ', quel est votre code d\'accès ?'"
    >
      <div class="gen-code-confirm">
        <input v-model="enteredCode" />
        <button @click="validationCode(selectedTeam!.code)">Confirmer</button>
      </div>
    </el-dialog>
    <div @click="test2()">blalaaaaa</div>
  </div>
</template>

<script lang="ts">
import { supabase } from "../lib/supabaseClient";
import { defineComponent } from "vue";
import { team, param } from "../models/models";
import Compteur from "@/components/Compteur.vue";
import Users from "@/components/Users.vue";
import { encryptCode } from "@/functions/encrypt";
import router from "@/router/index";
import "vue3-audio-player/dist/style.css";

export default defineComponent({
  // type inference enabled
  components: {
    Compteur,
    Users,
  },
  props: {
    name: String,
    test: { type: String, required: true },
  },
  data() {
    return {
      count: 10,
      teams: [] as team[] | null,
      params: [] as param[] | null,
      showCode: false,
      showUsers: false,
      selectedTeam: {},
      enteredCode: "",
      running: false,
      playing: false,
    };
  },
  async mounted() {
    await this.getTeams();
    await this.getParams();

    const now: number = new Date().getTime();
    const nbrReach: number = Date.parse(this.params![0].start_at!);
    this.running = nbrReach - now < 0 ? true : false;
  },
  methods: {
    validationCode(goodCode: string) {
      console.log(goodCode);
      console.log(this.enteredCode);
      console.log(encryptCode(this.enteredCode));
      if (goodCode === encryptCode(this.enteredCode)) {
        const redirect: boolean = confirm(
          "Bravo, votre histoire commence maintenant. Garder le code ou  mettre en favoris l'URL de la prochaine page"
        );
        console.log(redirect);
        //this.$router.push({ name: 'team' + idx })
      } else {
        alert("Aie aie aie, c'est pas gagné si ça commence comme ça.");
      }
    },
    onClickCode(tm: team) {
      console.log(this.running);
      this.selectedTeam = tm!;
      this.showCode = true;
    },
    async getTeams() {
      await supabase.rpc("getteams").then((d) => {
        this.teams = d.data;
      });
    },
    async getParams() {
      await supabase
        .from("params")
        .select("*")
        .then((d) => {
          this.params = d.data;
        });
    },
    play() {
      const ok: boolean = confirm(
        "L'écoute n'est possible qu'une seule fois, pas de pause ni de remise en arrière possible, êtes vous en mesure d'ouvrir grand vos oreilles ?"
      );

      if (!this.playing && ok) {
        let audio = new Audio(this.getAudio());
        audio.play();
        this.playing = true;
      }
    },
    getAudio() {
      return require("../assets/audio-evil.mp3");
    },

    test2() {
      router.push({
        name: "team",
        params: { id: "48ff1d8d-3735-43b5-bb7f-6e0edcd936a7" },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.introduction {
  color: white;
  text-align: justify;
  text-indent: 5%;
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(3px);
  font-size: 12px;
  border-radius: 15px;
  padding: 5px;
}

.team-button {
  padding: 10px;
  border-radius: 10px;
  color: white;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  font-size: 20px;
  border: none;
  backdrop-filter: blur(3px);
}
.team-button:hover {
  background-color: grey;
}

.img-waiter {
  background-image: url("@/assets/img_moine.jfif");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-color: #021527;
  font-family: "Roboto", sans-serif;
  background-repeat: no-repeat;
  width: 200px;
  height: 200px;
}

/*.el-dialog*/

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

.audioDiv {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    border-radius: 10px;
    cursor: pointer;
    padding: 5px;
    width: 40vh;
    color: black;
    background-color: #4d476c;
  }
}

.gamersTeamButton {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    cursor: pointer;
    padding: 5px;
    width: 40vh;
    color: aliceblue;
    background-color: #000000;
  }
}
</style>

<style lang="scss">
.dialog-waiter,
.dialog-code {
  background-position: center center;
  background-repeat: no-repeat;
  background-color: #021527;
  height: 50%;
  background-size: contain;
  color: white;

  & span.el-dialog__title {
    color: white;
    font-size: 12px;
  }
}
.dialog-waiter {
  background-image: url("@/assets/img_moine.jfif") !important;
}

.dialog-code {
  background-image: url("@/assets/ic_key.jfif") !important;
}

.dialog-users {
  background-color: black;
}

@media screen and (max-width: 900px) {
  .el-dialog.dialog-users,
  .el-dialog.dialog-code,
  .el-dialog.dialog-waiter {
    width: 90%;
  }
}

@media screen and (min-width: 901px) {
  .el-dialog.dialog-users,
  .el-dialog.dialog-code,
  .el-dialog.dialog-waiter {
    width: 50%;
  }
}
</style>
