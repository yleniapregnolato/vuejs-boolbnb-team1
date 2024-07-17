import { createRouter, createWebHistory } from "vue-router";

// Importare percorsi file
import AppMain from "./pages/AppMain.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: AppMain,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
