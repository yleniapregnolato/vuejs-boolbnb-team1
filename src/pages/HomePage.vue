<script>
import { mapState, mapMutations } from 'vuex';
import SearchComponent from '../components/common/search/SearchComponent.vue';
import CityCard from '../components/partials/CityCard.vue';
import Footer from '../components/Footer.vue';
import Flat_card from '../components/partials/Flat_card.vue';
import FlatsNotFound from '../components/partials/FlatsNotFound.vue';


export default {
  name: "HomePage",
  components: { SearchComponent, CityCard, Footer, Flat_card, FlatsNotFound },


  computed: {
    ...mapState([
      'isDestinationActive',
      'isDateActive',
      'isPeopleActive',
      'foundedFlats',
      'searchActive'
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

  <!-- flats researched -->
  <div class="container mt-5">
    <div class="row g-4" v-if="foundedFlats.length > 1">
      <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="flat in foundedFlats" :key="flat">
        <Flat_card :flat="flat" />
      </div>
    </div>

    <div class="row justify-content-center" v-if="foundedFlats.length < 1 && searchActive">
      <div class="col-12 col-lg-8">
        <FlatsNotFound />
      </div>
    </div>
  </div>
  <!-- /flats researched -->

  <!-- Card -->
  <CityCard />
  <!-- /Card -->
  
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
