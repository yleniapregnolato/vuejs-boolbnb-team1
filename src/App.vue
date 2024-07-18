<script>
import Header from "./components/Header.vue";
import HomePage from "./pages/HomePage.vue";
import CityCard from "./components/partials/CityCard.vue";
export default {
  components: {
    Header,
    HomePage,
    CityCard,
  },
};
</script>

<template>

  <Header/>
  <router-view></router-view>
  
</template>

<style></style>
