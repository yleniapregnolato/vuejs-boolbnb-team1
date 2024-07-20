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
      minGuest: 1,
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
    ...mapMutations(['setQuery', 'toggleFiltersDropdown', 'setFilterServices', 'setRadius', 'setMinGuest']),
    ...mapActions(['fetchSuggestions', 'selectSuggestion', 'fetchFlats', 'cercaAppartamenti']),
    handleInput(event) {
      this.setQuery(event.target.value);
      this.fetchSuggestions();
      this.clicked = true;
    },
    toggleFilters() {
      this.toggleFiltersDropdown();
    },
    toggleClick() {
      this.clicked = false;
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.clicked = false;
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
      this.setMinGuest(this.minGuest);
    },
    getImagePath(image) {
      return new URL(`../../../assets/img/services/${image}`, import.meta.url).href;
    },
  }
};
</script>

<template>
  <div class="container-fluid d-flex align-items-center">
    <div class="ms_searchbar rounded-4 my-5 pe-4">
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
    <button class="ms_button rounded-4" @click="toggleFilters()">Filtri</button>
    <div v-show="filtersDropdownVisible" class="filters-dropdown">
      <!-- Aggiungi qui i tuoi filtri -->
      <div class="filter-item">
        <div class="container">
          <div class="row g-2">
            <div class="col-12">
              <div class="container">
                <div class="row g-4 justify-content-between">
                  <div class="col-12 range-guests d-md-flex">
                    <div class="col-12 col-md-6 p-2 text-center">
                      <label class="mb-2" for="rangeValore">Raggio di ricerca:</label> <output for="rangeValore">{{radius}} Km</output>
                      <input type="range" id="rangeValore" min="1" max="100" v-model="radius">

                    </div>

                    <div class="col-12 col-md-6 p-2 text-center">

                      <span class="d-inline-block mb-2">Numero di ospiti</span>
                      <div class="guest">
                        <i class="fa-solid fa-circle-minus" @click="minGuest > 1 ? minGuest-- :''"></i>
                        <span class="mx-4">
                          {{ minGuest }}
                        </span>
                        <i class="fa-solid fa-circle-plus" @click="minGuest < 99 ? minGuest++ : ''"></i>
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

    <button class="ms_button rounded-4" @click="toggleFilters(), getFilter(), fetchFlats()">Cerca</button>
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

.guest {
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  i {
    font-size: 30px;
    cursor: pointer;
  }
}

</style>
