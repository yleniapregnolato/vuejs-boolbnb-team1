<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import HomePage from "./pages/HomePage.vue";
import SearchBar from "./components/partials/SearchBar.vue";
export default {
  components: {
    Header,
    HomePage,
    Footer,
    SearchBar,
  },
};
</script>

<template>
  <Header />
  <SearchBar/>
  <router-view></router-view>
  <Footer />
</template>

<style></style>
