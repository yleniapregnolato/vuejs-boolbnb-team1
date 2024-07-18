<script>
import Header from "./components/Header.vue";
import HomePage from "./pages/HomePage.vue";
import CityCard from "./components/partials/CityCard.vue";
import Footer from './components/Footer.vue';
export default {
  components: {
    Header,
    HomePage,
    CityCard,
    Footer,
  },
};
</script>

<template>

  <Header/>
  <router-view></router-view>
  <Footer />

</template>

<style>

</style>
