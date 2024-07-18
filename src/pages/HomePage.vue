<script>
import { mapState, mapMutations } from 'vuex';
import SearchComponent from '../components/common/search/SearchComponent.vue';
import CityCard from '../components/partials/CityCard.vue';
import Footer from '../components/Footer.vue';
import FlatMap from '../components/partials/FlatMap.vue';

export default {
  name: "HomePage",
  components: { SearchComponent, CityCard, Footer, FlatMap },

  computed: {
    ...mapState([
      'isDestinationActive',
      'isDateActive',
      'isPeopleActive'
    ])
  },
  methods: {
    ...mapMutations(['closeAll']),
  }
};
</script>

<template>
  <div class="bannerCont">
    <img @click="closeAll" class="w-100 h-100"
      src="https://images.trvl-media.com/lodging/22000000/21640000/21634100/21634022/1748237f_w.jpg?impolicy=fcrop&w=600&h=400&p=1&q=high"
      alt="">
    <div class="ms_externalContent">
      <p @click="closeAll">Prenota case al mare, ville e appartamenti in tutto il mondo
      </p>
      <div class="containerSerch">
        <SearchComponent />
      </div>
    </div>
  </div>
  <!-- Mappa -->
  <FlatMap />
  <!-- Card -->
  <CityCard />
  <!-- /Card -->
  <Footer />
</template>

<style lang="scss" scoped>
.bannerCont {
  width: 100%;
  height: 70vh;
  background-color: rgb(0, 0, 0);
  position: relative;
  

  img {
    width: 100%;
    height: 100%;
    opacity: .6;
    object-fit: cover;
  }

  .ms_externalContent {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      font-weight: 500;
      letter-spacing: 1px;
      font-size: 3.5rem;
      color: white;
    }

    .containerSerch {
      background-color: rgb(253, 246, 239);
      padding: 1.3rem;
      border-radius: 1rem;
    }
  }
}
</style>
