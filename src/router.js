import { createRouter, createWebHistory } from "vue-router";

// Importare percorsi file
import HomePage from "./pages/HomePage.vue";
import ShowPage from "./pages/ShowPage.vue";
import TravelPage from "./pages/TravelPage.vue";

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
  {
    path: "/travel", // beds=1&rooms=2&services=%5B2,6%5D&per_page=5
    name: "travel",
    component: TravelPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
