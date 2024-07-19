<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data(){
    return{
      clicked:true,
      selected : ''
    };
  },
  mounted(){
    this.$store.dispatch('fetchFlats');
  },
  computed: {
    ...mapState(['query', 'suggestions', 'selectedSuggestion', 'filtersDropdownVisible'])
  },
  methods: {
    ...mapMutations(['setQuery', 'toggleFiltersDropdown']),
    ...mapActions(['fetchSuggestions', 'selectSuggestion', 'cercaAppartamenti']),
    handleInput(event) {
      this.setQuery(event.target.value);
      this.fetchSuggestions();
      this.clicked = true;
      console.log(this.selected);
    },
    toggleFilters() {
      this.toggleFiltersDropdown();
    },
    toggleClick(){
      this.clicked = false;
    }
  }
};
</script>

<template>
<div class="container-fluid d-flex align-items-center" @click="toggleClick()">
  <div class="ms_searchbar rounded-4 my-5 pe-4">
    <input
      type="text"
      id="ms_input"
      placeholder="Cerca qualcosa.."
      v-model="selected"
      @input="handleInput"
      class="w-100"
    />
    <div id="dropdown" v-if="suggestions.length" class="dropdown-menu" :class="clicked ? 'show' : ''">
      <a
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="dropdown-item"
        @click.prevent="selectSuggestion(suggestion)"
        @click="this.selected = suggestion.address.freeformAddress"
      >
        {{ suggestion.address.freeformAddress }}
      </a>
    </div>
  </div>
  <!-- Bottone per filtri -->
  <button class="ms_button rounded-4" @click="toggleFilters">Filtri</button>
    <div v-if="filtersDropdownVisible" class="filters-dropdown">
      <!-- Aggiungi qui i tuoi filtri -->
      <div class="filter-item">
        <label for="wifi">WiFi</label>
        <input type="checkbox" id="wifi" />
      </div>
      <div class="filter-item">
        <label for="parking">Parcheggio</label>
        <input type="checkbox" id="parking" />
      </div>
      <!-- Aggiungi altri filtri qui -->
    </div>
  
    <button class="ms_button rounded-4" @click="cercaAppartamenti()">Cerca</button>
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
    input{
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

/* Stile searchBar */

.ms_button {
  padding: 16px 24px;
  margin-left: 5px;
  background-color: #705d3f;
  color: white;
  transition: all 0.7s;
  border: 1px solid transparent;

  &:hover {
    background-color: #f8f2eb;
    border: 1px solid #705d3f;
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
  background-color: rgb(253, 246, 239);
  border: 0;
  z-index: 1000;
  width: 100%;
  max-height: 25vh;
  overflow-y: auto;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

/* Filters Dropdown */
.filters-dropdown {
  position: absolute;
  top: 80%;
  left: 0;
  background-color: rgb(253, 246, 239);
  /* border: 1px solid #705d3f; */
  border-radius: 8px;
  width: 100%;
  z-index: 1000;
  padding: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  .filter-item {
    margin-bottom: 8px;

    label {
      margin-right: 8px;
    }
  }
}

.ms_brown_btn2 {
    background-color: white;
    border: 1px solid #705D3F;
    &:hover {
        background-color: #705D3F;
        color: white;
        .fa-pencil, .fa-trash {
            color: white;
        }
    }
}

</style>
