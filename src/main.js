import { createApp } from "vue";
import App from "./App.vue";
import "./scss/general.scss";
import { router } from "./router";

createApp(App).use(router).mount("#app");
