import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Team from "../views/Team.vue";
import Mission from "../components/Mission.vue";
import Bla from "../components/Bla.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/team/:id",
    name: "team",
    component: Team,
    props: true,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: ":idm", //":idm",
        name: "mission",
        component: Mission,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
