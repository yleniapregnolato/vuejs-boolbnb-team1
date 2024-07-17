<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import HomePage from "./pages/HomePage.vue";
export default {
  components: {
    Header,
    HomePage,
    Footer,
  },
};
</script>

<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<style></style>
