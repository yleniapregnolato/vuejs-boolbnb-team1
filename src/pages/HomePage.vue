<script>
import { mapState, mapMutations } from 'vuex';
import SearchComponent from '../components/common/search/SearchComponent.vue';
import CityCard from '../components/partials/CityCard.vue';
import Footer from '../components/Footer.vue';
import Flat_card from '../components/partials/Flat_card.vue';
import FlatsNotFound from '../components/partials/FlatsNotFound.vue';
import { storejs } from '../store';
import { useRoute } from 'vue-router';


export default {
  setup() {
    const route = useRoute();
    return {
      route
    };
  },
  data() {
    return {
      storejs,
      
    }
  },

  mounted() {
    this.alternateHeroImg();
    // this.changeHeader();

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
    getImagePath(image) {
      return new URL(`../assets/img/${image}`, import.meta.url).href;
    },

    alternateHeroImg() {

      const listImgElem = document.querySelectorAll('.hero-img');
      
      if(listImgElem.length > 1){
        let i = 0;
        listImgElem[i].classList.remove('ms_hidden');
        setInterval(()=> {
          listImgElem[i].classList.add('ms_hidden');
          if(i<listImgElem.length-1) {
            i++;
          } else {
            i = 0;
          }

          listImgElem[i].classList.remove('ms_hidden');
        },5000)
      }
    },


  }
};
</script>

<template>
  <div class="ms_container">
    <div class="bannerCont">

        <img :src="getImagePath(img.link)" class="hero-img ms_hidden" alt="" v-for="img in storejs.city_img" :key="img">
      <div class="ms_externalContent">
        <p class="text-center mx-2" @click="closeAll">Prenota case al mare, ville e appartamenti in tutta Italia
        </p>
        <div class="container-fluid">
          <SearchComponent />
        </div>
      </div>
    </div>
    
    <!-- flats researched -->
    <div class="container my-5" v-if="searchActive">
      <div class="row g-4 md_search p-3" v-if="foundedFlats.length > 0">
        <p class="fs-2 text-black mb-2">Risultati della ricerca:</p>


        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="flat in foundedFlats" :key="flat">
          <Flat_card :flat="flat" :sponsored="flat.sponsored"/>
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

.md_search {
    background-color: rgba(180, 184, 151, 0.3);
    border-radius: 15px;
}

.ms_container {
  width: 100%;
}

.bannerCont {
  width: 100%;
  height: 500px;
  background-color: rgb(0, 0, 0);
  position: relative;
  z-index: 1;

  .ms_hidden {
    position: absolute;
    z-index: -1;
    opacity: 0;
    top: 0;
    left: 0;
    overflow: hidden;
    
  }

  .ms_active {
    opacity: 0.6;
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    opacity: .6;
    object-fit: cover;
    transition: all 1s;
  }

  .ms_externalContent {
    width: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
      font-weight: 400;
      letter-spacing: 2px;
      font-size: 3.2rem;
      color: white;
      transition: all 0.7s;
    }
  }
}

@media (max-width :767px) {
  .bannerCont .ms_externalContent p{
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 2rem;
        transition: all 0.7s;
      }
  }
  @media (max-width: 456px) {
  .bannerCont .ms_externalContent p{
        font-weight: 600;
        letter-spacing: 1px;
        font-size: 1.6rem;
        transition: all 0.7s;
      }
  }
</style>
