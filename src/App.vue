<script>
import Header from "./components/Header.vue";
import AppMain from "./pages/AppMain.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Header,
    AppMain,
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
