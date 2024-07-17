<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import HomePage from "./pages/HomePage.vue";
import SearchBar from "./components/partials/SearchBar.vue";
import CityCard from "./components/partials/CityCard.vue";
export default {
  components: {
    Header,
    HomePage,
    Footer,
    SearchBar,
    CityCard,
  },
};
</script>

<template>
  <Header />
  <SearchBar />
  <router-view></router-view>
  <CityCard />
  <Footer />
</template>

<style></style>
