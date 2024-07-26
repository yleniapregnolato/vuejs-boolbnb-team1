<script>

import { mapState, mapMutations, mapActions } from 'vuex';
import SearchBarTravel from '../components/common/search/SearchBarTravel.vue';
import FlatsNotFound from '../components/partials/FlatsNotFound.vue';
import Flat_card from '../components/partials/Flat_card.vue';
import store from '../storeData';
import { storejs } from '../store';

export default {
  data() {
    return {
      storejs,
    }
  },
  components: { SearchBarTravel, FlatsNotFound, Flat_card },

  name: "HomePage",
  computed: {
    ...mapState(['query', 'suggestions', 'selectedSuggestion', 'filtersDropdownVisible', 'isDestinationActive',
      'isDateActive',
      'isPeopleActive',
      'foundedFlats',
      'searchActive']),

      beds() {
      return this.$route.query.beds;
    },
    rooms() {
      return this.$route.query.rooms;
    },
    services() {
      return JSON.parse(this.$route.query.services || '[]');
    },
    perPage() {
      return this.$route.query.per_page;
    }
  },
  methods: {
    ...mapMutations(['setQuery', 'toggleFiltersDropdown', 'closeFiltersDropdown', 'setFilterServices', 'setRadius', 'setBeds', 'setRooms']),
    ...mapActions(['fetchSuggestions', 'selectSuggestion', 'fetchFlats', 'cercaAppartamenti']),

    getImagePath(image) {
      return new URL(`../assets/img/${image}`, import.meta.url).href;
    },
  },

};
</script>

<template>
  <div class="containerMain">

    <SearchBarTravel />

  </div>

  <div class="container">

    <div class="container my-5" v-if="searchActive">
      <div class="row g-4 md_search p-3" v-if="foundedFlats.length > 0">
        <p class="fs-2 text-black mb-2"><i class="fa-solid fa-magnifying-glass"></i> Risultati della ricerca:</p>


        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="flat in foundedFlats" :key="flat">
          <Flat_card :flat="flat" :sponsored="flat.sponsored" />
        </div>
      </div>

      <div class="row justify-content-center" v-if="foundedFlats.length < 1 && searchActive">
        <div class="col-12 col-lg-8">
          <FlatsNotFound />
        </div>
      </div>
    </div>
  </div>

</template>
<style lang="scss" scoped>
.md_search {
    background-color: rgba(180, 184, 151, 0.3);
    border-radius: 15px;
}
</style>
