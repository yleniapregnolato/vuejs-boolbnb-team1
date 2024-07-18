import { createRouter, createWebHistory } from "vue-router";

// Importare percorsi file
import HomePage from "./pages/HomePage.vue";
import ShowPage from "./pages/ShowPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/show/:slug",
    name: "show",
    component: ShowPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
