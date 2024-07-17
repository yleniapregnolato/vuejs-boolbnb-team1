import { createApp } from "vue";
import App from "./App.vue";
import "./scss/general.scss";
import { router } from "./router";
import '@fortawesome/fontawesome-free/css/all.css';
import store from './storeData';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';




createApp(App)
.use(router)
.use(store)
.mount("#app");
