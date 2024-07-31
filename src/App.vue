<script>
import Header from "./components/Header.vue";
import HomePage from "./pages/HomePage.vue";
import CityCard from "./components/partials/CityCard.vue";
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    return {
      route
    };
  },
  components: {
    Header,
    HomePage,
    CityCard,
    Footer,
  },
  watch: {
    '$route'(to, from) {
      if (this.route.name == 'home') {

        const headerElem = document.querySelector('.ms_headernav');

        headerElem.classList.remove('ms_bg-primary', 'sticky-top');
        headerElem.classList.add('ms_bg-transparent', 'fixed-top');
        setTimeout(this.changeHeader, 1);

      } else {
        this.staticHeader();
      }
    }
  },
  methods: {
    onRouteChange(to, from) {
      console.log('cambio rotta');
    },

    changeHeader() {

      window.addEventListener('scroll', this.effectHeader);

    },
    effectHeader() {
      const headerElem = document.querySelector('.ms_headernav');
      const bannerContElem = document.querySelector('.bannerCont');
      const x = bannerContElem.offsetHeight - headerElem.offsetHeight;
      if (window.scrollY > x) {

        console.log('superato');
        headerElem.classList.add('ms_bg-primary');
        headerElem.classList.remove('ms_bg-transparent');

      } else {
        headerElem.classList.remove('ms_bg-primary');
        headerElem.classList.add('ms_bg-transparent');
      }
    },
    staticHeader() {
      window.removeEventListener('scroll', this.effectHeader)
      const headerElem = document.querySelector('.ms_headernav');
      headerElem.classList.add('ms_bg-primary', 'sticky-top');
      headerElem.classList.remove('ms_bg-transparent', 'fixed-top');
    },
    rimosso() {
      console.log('rimosso');
    }
  }
};
</script>

<template>

  <Header />
  <router-view></router-view>
  <Footer />

</template>

<style></style>
