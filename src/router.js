import { createRouter, createWebHistory } from "vue-router";

// Importare percorsi file
import HomePage from "./pages/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
