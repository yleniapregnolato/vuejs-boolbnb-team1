<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      clicked: true,
      selected: '',
      avServices: [],
      checcate: [],
      radius: 20,
      beds: 1,
      rooms: 2,
    };
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
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  computed: {
    ...mapState(['query', 'suggestions', 'selectedSuggestion', 'filtersDropdownVisible'])
  },
  methods: {
    ...mapMutations(['setQuery', 'toggleFiltersDropdown','closeFiltersDropdown' ,'setFilterServices', 'setRadius', 'setBeds', 'setRooms']),
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
        const searchBar = this.$refs.searchBar;
        const filtersDropdown = this.$refs.filtersDropdown;
        const filtersButton = this.$refs.filtersButton;
        const searchButton = this.$refs.searchButton;

        console.log('Clicked outside:', !searchBar.contains(event.target));
        console.log('Dropdown:', !filtersDropdown.contains(event.target));
        console.log('Filters button:', !filtersButton.contains(event.target));
        console.log('Search button:', !searchButton.contains(event.target));

        if (
          (filtersDropdown && !filtersDropdown.contains(event.target)) &&
          (searchBar && !searchBar.contains(event.target)) &&
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
      const searchBar = this.$refs.searchBar;
      const filtersDropdown = this.$refs.filtersDropdown;

      if (searchBar && searchBar.contains(event.target)) {
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
      this.setFilterServices(services);
      this.setRadius(this.radius);
      this.setBeds(this.beds);
      this.setRooms(this.rooms);

      // window.history.pushState(null,null, `radius=${this.radius}&services=${services}`);
      // Chiudo al click sul cerca
      this.$store.commit('closeFiltersDropdown');
    },
    getImagePath(image) {
      return new URL(`../../../assets/img/services/${image}`, import.meta.url).href;
    },
  }
};
</script>

<template>
  <div class="container-fluid d-flex align-items-center justify-content-center" id="ms_cont-s-bar">
    <div class="ms_searchbar rounded-4 my-5 pe-4" ref="searchBar">
      <input type="text" id="ms_input" placeholder="Cerca qualcosa.." v-model="selected" @input="handleInput"
        class="w-100" />
      <div id="dropdown" v-if="suggestions.length" class="dropdown-menu" :class="clicked ? 'show' : ''">
        <a v-for="(suggestion, index) in suggestions" :key="index" class="dropdown-item"
          @click.prevent="selectSuggestion(suggestion), this.selected = suggestion.address.freeformAddress">
          {{ suggestion.address.freeformAddress }}
        </a>
      </div>
    </div>
    <!-- Bottone per filtri -->
    <button class="ms_button rounded-4" @click="toggleFilters()" ref="filtersButton">Filtri</button>
    <div v-show="filtersDropdownVisible" class="filters-dropdown" ref="filtersDropdown">
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

    <button class="ms_button rounded-4" @click="getFilter(), fetchFlats()" ref="searchButton">Cerca</button>
  </div>
</template>

<style lang="scss" scoped>
$bg-main : #F8F2EB;

/* Searchbar */
.ms_searchbar {
  background-color: $bg-main;
  position: relative;
  padding: 12px 8px;
  /* border: 1px solid #705d3f; */
  transition: all 0.7s;
  width: 75%;
  max-width: 1000px;
  /* border-radius: 24px; */
}

.ms_searchbar:focus-within {
  transition: all 0.7s;
  background: rgba(0, 0, 0, 0.40);
  border: 1px solid white;

  input {
    color: white;
  }
}

/* Input */
#ms_input {
  width: 50%;
  border: none;
  padding: 4px;
  margin-left: 12px;
  transition: all 0.7s;
  height: 100%;
  width: 100%;
  font-size: 1.5rem;
  padding: 0;
  font-weight: 200;
  background: transparent;
}

#ms_input:focus {
  outline: none;
}

/* / Stile searchBar */

#service-list {
  font-size: medium;
}


.ms_button {
  padding: 16px 24px;
  margin-left: 5px;
  background-color: var(--primary-color);
  color: white;
  transition: all 0.7s;
  border: 1px solid transparent;

  &:hover {
    background-color: var(--bg-color);
    border: 1px solid var(--primary-color);
    color: black;
    /* border-radius: 24px; */
    transition: 0.7s all;
  }
}

.ms_pt-120 {
  padding-top: 120px;
}



/* Dropdown Style */
.dropdown-menu {
  position: absolute;
  top: 120%;
  left: 0;
  background-color: var(--bg-color);
  border: 0;
  padding: 5px;
  z-index: 1000;
  width: 100%;
  max-height: 25vh;
  overflow-y: auto;
}

.dropdown-item {
  color: var(--primary-color);
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
}

.dropdown-item:hover {
  background-color: var(--primary-color);
  color: var(--bg-color);
}

/* Filters Dropdown */
.filters-dropdown {
  position: absolute;
  top: 80%;
  left: 0;
  background-color: var(--bg-color);
  /* border: 1px solid #705d3f; */
  border-radius: 8px;
  width: 100%;
  z-index: 1000;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  // .filter-item {
  //   margin-bottom: 8px;

  //   label {
  //     margin-right: 8px;
  //   }
  // }
}

.ms_brown_btn2 {
  background-color: white;
  border: 1px solid #705D3F;

  &:hover {
    background-color: #705D3F;
    color: white;

    .fa-pencil,
    .fa-trash {
      color: white;
    }
  }
}

.range-guests {
  border: 2px solid var(--primary-color);
  border-radius: 5px;
  padding: 5px;
}

#rangeValore {
  width: 80%;
  -webkit-appearance: none;
  appearance: none;
  background: var(--bg-color);
  height: 10px;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
  padding: 0;
}

#rangeValore::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 30px;
  height: 30px;
  background: var(--primary-color);
  border-radius: 50%;
  cursor: pointer;
}

.num-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;

  i {
    font-size: 30px;
    cursor: pointer;
  }
}

@media (max-width :767px) {

  .bannerCont .ms_externalContent {
      width: 100%;
    }
    
  #ms_cont-s-bar{
    flex-direction: column;
    gap: 12px;
    .ms_searchbar{
      width: 100%;
        #ms_input{
          font-size: 1.2rem;
        }
    }
  }

  }
  @media (max-width: 450px) {
    #ms_cont-s-bar{
    flex-direction: column;
    gap: 12px;
    .ms_searchbar{
      width: 100%;
        #ms_input{
          font-size: 1rem;
        }
    }
  }
  }
</style>
