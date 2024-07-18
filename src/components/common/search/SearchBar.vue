<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState(['query', 'suggestions', 'selectedSuggestion'])
  },
  methods: {
    ...mapMutations(['setQuery']),
    ...mapActions(['fetchSuggestions', 'selectSuggestion']),
    handleInput(event) {
      this.setQuery(event.target.value);
      this.fetchSuggestions();
    }
  }
};
</script>

<template>
  <div class="ms_searchbar my-5 pe-4">
    <input
      type="text"
      v-model="query"
      id="ms_input"
      placeholder="Cerca qualcosa.."
      @input="handleInput"
      class="w-100"
    />
    <div id="dropdown" v-if="suggestions.length" class="dropdown-menu show">
      <a
        v-for="(suggestion, index) in suggestions"
        :key="index"
        class="dropdown-item"
        @click.prevent="selectSuggestion(suggestion)"
      >
        {{ suggestion.address.freeformAddress }}
      </a>
    </div>
    <input
      type="hidden"
      :value="selectedSuggestion ? selectedSuggestion.position.lat : ''"
      id="latitude"
    />
    <input
      type="hidden"
      :value="selectedSuggestion ? selectedSuggestion.position.lon : ''"
      id="longitude"
    />
  </div>
  <div>
    <button class="ms_button mt-5">Cerca</button>
  </div>
</template>

<style lang="scss" scoped>
/* Searchbar */
.ms_searchbar {
  position: relative;
  padding: 12px 8px;
  border: 1px solid #705d3f;
  width: 75%;
  border-radius: 24px;

  input {
    background-color: transparent;
    height: 100%;
    width: 100%;
    font-size: 1.5rem;
    padding: 0;
    font-weight: 100;
  }
}

.ms_button {
  padding: 16px 24px;
  margin-left: 5px;
  background-color: #705d3f;
  color: white;
  border-radius: 24px;
  border: 1px solid #f8f2eb;

  &:hover {
    background-color: #f8f2eb;
    border: 0.5px solid #705d3f;
    color: black;
    border-radius: 24px;
    transition: 0.7s all;
  }
}

.ms_pt-120 {
  padding-top: 120px;
}

/* Input */
#ms_input {
  width: 50%;
  border: none;
  padding: 4px;
  margin-left: 12px;
}

#ms_input:focus {
  outline: none;
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
</style>
