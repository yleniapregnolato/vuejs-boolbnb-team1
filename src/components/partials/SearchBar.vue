<script>
export default {
  data() {
    return {
        query: '',
        suggestions: [],
        apiKey: 'ZcdgGKenw2zWR1ufYKujLP0vgRMnGtMM',
        versionNumber: '2',
        ext: 'json'
    };
  },
  methods: {
    /**
     * Funzione che popola l'array suggestions, in base ai risultati ottenuti dalla chiamata API TomTom
    */
    suggerimentiVie() {
    if (this.query.length < 3) {
        this.suggestions = [];
        return;
    }

    const url = `https://api.tomtom.com/search/${this.versionNumber}/search/${this.query}.${this.ext}?key=${this.apiKey}&typeahead=true&limit=10&countrySet=IT`;
    fetch(url).then(response => response.json()).then(data => {
          this.suggestions = data.results;
        })
        .catch(error => {
          console.error('Errore nella richiesta:', error);
        });
    },
    /*
    * Funzione che assegna il suggerimento clickato dall'utente
    */
    selezionaSuggerimento(suggestion) {
      this.query = suggestion.address.freeformAddress;
      this.selectedSuggestion = suggestion;
      this.suggestions = [];
    }
  }
};
</script>

<template>
  <div class="container-fluid ms_pt-120 d-flex align-items-center justify-content-center">
    <div class="ms_searchbar">
        <input type="text"
        v-model="query"
        id="ms_input"
        placeholder="Cerca qualcosa.."
        @input = "suggerimentiVie">
        <div id="dropdown" v-if="suggestions.length" class="dropdown-menu show">
            <a v-for="suggestion in suggestions"
                class="dropdown-item"
                @click.prevent="selezionaSuggerimento(suggestion)">
                {{  suggestion.address.freeformAddress }}
            </a>

        </div>
        <input type="hidden" :value="selectedSuggestion ? selectedSuggestion.position.lat : ''" id="latitude" />
        <input type="hidden" :value="selectedSuggestion ? selectedSuggestion.position.lon : ''" id="longitude" />
    </div>
    <div>
        <button class="ms_button" @click="">Cerca</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* Searchbar */
.ms_searchbar{
    padding: 12px 8px;
    border: 1px solid #705D3F;
    width: 40%;
    border-radius: 24px;
}

.ms_button{
    padding: 16px 24px;
    margin-left: 5px;
    background-color: #705D3F;
    color: white;
    border-radius: 24px;
    border: 1px solid  #F8F2EB;
        &:hover{
            background-color: #F8F2EB;
            border: 0.5px solid #705D3F;
            color: black;
            border-radius: 24px;
            transition: 0.7s all;
        }
}

.ms_pt-120{
    padding-top: 120px;
}

/* Input */
#ms_input{
    width: 50%;
    border: none;
    padding: 4px;
    margin-left: 12px;
}

#ms_input:focus{
    outline: none;
}

/* Dropdown Style */
.dropdown-menu {
  position: absolute;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 1000;
  width: 100%;
  max-height: 200px;
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