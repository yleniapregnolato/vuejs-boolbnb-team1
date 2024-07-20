<script>
import { mapState, mapMutations } from 'vuex';
import SearchComponent from '../components/common/search/SearchComponent.vue';
import CityCard from '../components/partials/CityCard.vue';
import Footer from '../components/Footer.vue';
import Flat_card from '../components/partials/Flat_card.vue';
import FlatsNotFound from '../components/partials/FlatsNotFound.vue';
import { storejs } from '../store';


export default {
  data() {
    return {
      storejs,
    }
  },
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
  <div class="ms_container">
    <div class="bannerCont">
      <img @click="closeAll"
        src="https://cdn.discordapp.com/attachments/1260526842679660585/1263791478610591834/1-roma-dall-alto-copertina_wide.png?ex=669b8508&is=669a3388&hm=063941407d6e321e2c0e4175f7dc3f486c76ff38d4fb5f5275b021f0bfc384a9&"
        alt="">
      <div class="ms_externalContent">
        <p class="text-center mx-2" @click="closeAll">Prenota case al mare, ville e appartamenti in tutta Italia
        </p>
        <div class="container">
          <SearchComponent />
        </div>
      </div>
    </div>

    <!-- flats researched -->
    <div class="container my-5" v-if="searchActive">
      <div class="row g-4" v-if="foundedFlats.length > 0">
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
    <div class="container my-5">
      <div class="row g-2">
        <div class="col-4 col-lg-2" v-for="city in storejs.city_img" :key="city">
          <CityCard :city="city" />
        </div>
      </div>
    </div>

    <!-- /Card -->
  </div>
</template>

<style lang="scss" scoped>
.ms_container {
  width: 100%;
}

.bannerCont {
  width: 100%;
  height: 500px;
  background-color: rgb(0, 0, 0);
  position: relative;


  img {
    width: 100%;
    height: 100%;
    opacity: .6;
    object-fit: cover;
  }

  .ms_externalContent {
    width: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      font-weight: 400;
      letter-spacing: 2px;
      font-size: 3.2rem;
      color: white;
    }
  }
}
</style>
