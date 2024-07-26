<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import { storejs } from '../../../store';
export default {
  data() {
    return {
      clicked: true,
      // selected: '',
      avServices: [],
      checcate: [],
      radius: 20,
      beds: 1,
      rooms: 2,
      storejs,
      serviceString: ''
    };
  },

  created() {
    this.fetchDataQuery();
    this.fetchFlats();
  },

  mounted() {
    // this.$store.dispatch('fetchFlats');
    document.addEventListener('click', this.handleClickOutside);
    fetch(`http://127.0.0.1:8000/api/services`)
      .then(response => response.json())
      .then(data => {
        this.avServices = data;
      })
      .catch(error => {
        console.error('Errore durante il fetch:', error);
      });
  },
  // beforeDestroy() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // },
  computed: {
    ...mapState(['query', 'suggestions', 'selectedSuggestion', 'filtersDropdownVisible']),
    // beds() {
    //   return this.$route.query.beds;
    // },
    // rooms() {
    //   return this.$route.query.rooms;
    // },
    // services() {
    //   return JSON.parse(this.$route.query.services || '[]');
    // },
    // perPage() {
    //   return this.$route.query.per_page;
    // },
  },
  methods: {
    ...mapMutations(['setQuery', 'toggleFiltersDropdown','closeFiltersDropdown' ,'setFilterServices', 'setRadius', 'setBeds', 'setRooms', 'setLatString', 'setLonString']),
    ...mapActions(['fetchSuggestions', 'selectSuggestion', 'fetchFlats', 'cercaAppartamenti']),
    handleInput(event) {
      this.setQuery(event.target.value);
      this.fetchSuggestions();
      this.clicked = true;
    },
    toggleFilters() {
      this.toggleFiltersDropdown(!this.filtersDropdownVisible);
    },
    toggleClick() {
      this.clicked = false;
    },
    handleClickOutside(event) {
        const searchBarTravel = this.$refs.searchBarTravel;
        const filtersDropdownTravel = this.$refs.filtersDropdownTravel;
        const filtersButton = this.$refs.filtersButton;
        const searchButton = this.$refs.searchButton;
        
        // console.log('Clicked outside:', !searchBarTravel.contains(event.target));
        // console.log('Dropdown:', !filtersDropdownTravel.contains(event.target));
        // console.log('Filters button:', !filtersButton.contains(event.target));
        // console.log('Search button:', !searchButton.contains(event.target));

        if (
          (filtersDropdownTravel && !filtersDropdownTravel.contains(event.target)) &&
          (searchBarTravel && !searchBarTravel.contains(event.target)) &&
          (filtersButton && !filtersButton.contains(event.target)) &&
          (searchButton && !searchButton.contains(event.target))
        ) {
          if (this.filtersDropdownVisible) {
            this.$store.commit('closeFiltersDropdown');
          }
        }

        this.handleSearchBarClick(event);
    },
    handleSearchBarClick(event) {
      const searchBarTravel = this.$refs.searchBarTravel;
      const filtersDropdownTravel = this.$refs.filtersDropdownTravel;

      if (searchBarTravel && searchBarTravel.contains(event.target)) {
        // Chiudi il dropdown dei filtri quando clicchi sulla search bar
        if (this.filtersDropdownVisible) {
          this.$store.commit('closeFiltersDropdown');
        }
      }
    },
    getFilter() {
      // prendo tutti elementi con attributo name=services[] e che sono checked
      let arrayCheckedElem = document.querySelectorAll('[name = "services[]"]:checked');

      const services = []

      arrayCheckedElem.forEach(element => {
        services.push(parseInt(element.value));
      });

      // console.log(checkedServices);
      this.serviceString = '['+ services.join(',') +']';
      this.setFilterServices(this.serviceString);
      this.setRadius(this.radius);
      this.setBeds(this.beds);
      this.setRooms(this.rooms);
      document.removeEventListener('click', this.handleClickOutside);

      // window.history.pushState(null,null, `radius=${this.radius}&services=${services}`);
      // Chiudo al click sul cerca
      this.$store.commit('closeFiltersDropdown');
      console.log('get filter');
    },

    fetchDataQuery() {
      this.setFilterServices(JSON.parse(this.$route.query.services || '[]'));
      // this.setRadius(this.radius);
      this.setBeds(this.$route.query.beds);
      this.setRooms(this.$route.query.rooms);
      this.setLatString(this.$route.query.lat);
      this.setLonString(this.$route.query.lon);
      this.radius = this.$route.query.radius;
      this.setRadius(this.radius)
      
    },
    getImagePath(image) {
      return new URL(`../../../assets/img/services/${image}`, import.meta.url).href;
    },
  }
};
</script>

<template>
  <div class="container position-relative d-flex align-items-center justify-content-center py-3" id="ms_cont-s-bar">
    <div class="ms_searchbar rounded-4 my-md-5 pe-4" ref="searchBarTravel">
      <input type="text" id="ms_input" placeholder="Cerca qualcosa.." v-model="storejs.selected" @input="handleInput"
        class="w-100" />
      <div id="dropdown" v-if="suggestions.length" class="dropdown-menu" :class="clicked ? 'show' : ''">
        <a v-for="(suggestion, index) in suggestions" :key="index" class="dropdown-item"
          @click.prevent="selectSuggestion(suggestion), storejs.selected = suggestion.address.freeformAddress, storejs.lat = suggestion.position.lat, storejs.lon = suggestion.position.lon">
          {{ suggestion.address.freeformAddress }}
        </a>
      </div>
    </div>

    <div class="d-flex">
    <!-- Bottone per filtri -->
    <button class="ms_button rounded-4" @click="toggleFilters()" ref="filtersButton">Filtri</button>
    <div v-show="filtersDropdownVisible" class="filters-dropdown" ref="filtersDropdownTravel">
      <!-- Aggiungi qui i tuoi filtri -->
      <div class="filter-item">
        <div class="container">
          <div class="row g-2">
            <div class="col-12">
              <div class="container">
                <div class="row g-4 justify-content-between">
                  <div class="col-12 range-guests d-flex">

                    <div class="container">
                      <div class="row">
                        <div class="col-12 col-lg-4 p-2 text-center">
                          <label class="mb-2" for="rangeValore">Raggio di ricerca:</label> <output
                            for="rangeValore">{{ radius }} Km</output>
                          <input type="range" id="rangeValore" min="1" max="100" v-model="radius">
    
                        </div>
    
                        <div class="col-md-6 col-sm-12 col-lg-4 p-2 text-center">
    
                          <span class="d-inline-block mb-2">Numero letti</span>
                          <div class="num-filter">
                            <i class="fa-solid fa-circle-minus" @click="beds > 1 ? beds-- : ''"></i>
                            <span class="mx-4">
                              {{ beds }}
                            </span>
                            <i class="fa-solid fa-circle-plus" @click="beds < 99 ? beds++ : ''"></i>
                          </div>
    
                        </div>
    
                        <div class="col-md-6 col-sm-12 col-lg-4 p-2 text-center">
    
                          <span class="d-inline-block mb-2">Numero stanze</span>
                          <div class="num-filter">
                            <i class="fa-solid fa-circle-minus" @click="rooms > 1 ? rooms-- : ''"></i>
                            <span class="mx-4">
                              {{ rooms }}
                            </span>
                            <i class="fa-solid fa-circle-plus" @click="rooms < 99 ? rooms++ : ''"></i>
                          </div>
    
                        </div>
                      </div>
                    </div>



                  </div>
                </div>
              </div>
            </div>
            <div class="col-6 col-md-4 col-lg-3 service-list" v-for="service in avServices" :key="service">

              <input type="checkbox" :id="service.name" class="check-service" name="services[]" :value="service.id" />
              <label :for="service.name" class="text-truncate">
                <img :src="getImagePath(service.icon)" :alt="'Icona ' + service.name">
                {{ service.name }}
              </label>
            </div>
          </div>
        </div>


      </div>
      <!-- Aggiungi altri filtri qui -->
    </div>

    <router-link :to="{ name: 'travel',  query: { beds: beds, rooms: rooms, services: serviceString, lat: storejs.lat, lon: storejs.lon, radius: radius }  }">
        <button @click="getFilter(), fetchFlats()" class="ms_button rounded-4" ref="searchButton">Cerca</button>
      </router-link>

  </div>

  </div>
</template>

<style lang="scss" scoped>
  .ms_searchbar:focus-within {
    background-color: white;
    
    border: 1px solid var(--primary-color);
  }

  .ms_searchbar:focus-within input {
    color: var(--primary-color);
  }
</style>
