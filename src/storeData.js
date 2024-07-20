// src/store.js
import { createStore } from "vuex";
import axios from "axios";

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const store = createStore({
  state() {
    return {
      // SearchComponent.vue
      isDestinationActive: false,
      isDateActive: false,
      isPeopleActive: false,
      // SearchBar.vue
      query: "",
      suggestions: [],
      apiKey: "ZcdgGKenw2zWR1ufYKujLP0vgRMnGtMM",
      versionNumber: "2",
      ext: "json",
      selectedSuggestion: null,
      lat: "",
      lon: "",
      fetchMyAPIPath : 'http://127.0.0.1:8000/api/',
      allFlats : [],
      foundedFlats : [],
      radius : 20,
      searchActive: false,
      filter: {},
    };
  },
  mutations: {
    toggleFiltersDropdown(state) {
    state.filtersDropdownVisible = !state.filtersDropdownVisible;
  },
    toggleDestination(state) {
      state.isDestinationActive = !state.isDestinationActive;
      if (state.isDestinationActive) {
        state.isDateActive = false;
        state.isPeopleActive = false;
      }
    },
    toggleDate(state) {
      state.isDateActive = !state.isDateActive;
      if (state.isDateActive) {
        state.isDestinationActive = false;
        state.isPeopleActive = false;
      }
    },
    togglePeople(state) {
      state.isPeopleActive = !state.isPeopleActive;
      if (state.isPeopleActive) {
        state.isDestinationActive = false;
        state.isDateActive = false;
      }
    },
    closeAll(state) {
      state.isDestinationActive = false;
      state.isDateActive = false;
      state.isPeopleActive = false;
    },
    setSuggestions(state, suggestions) {
      state.suggestions = suggestions;
    },
    setQuery(state, query) {
      state.query = query;
    },
    setLat(state, suggestion) {
      state.lat = suggestion.position.lat;
    },
    setLon(state, suggestion) {
      state.lon = suggestion.position.lon;
    },
    setAllFlats(state, data){
        state.allFlats = data;
    },
    setFoundedFlats(state, flat){
        state.foundedFlats.push(flat);
    },
    setSelectedSuggestion(state, suggestion) {
      state.selectedSuggestion = suggestion;
    },
    setSearchActive(state) {
      state.searchActive = true;
    },
    setCoordinates(state, city) {
      state.lon = city.lon;
      state.lat = city.lat;
    },
    setFilterServices(state, arrayServices) {
      state.filter.services = arrayServices;
      console.log(state.filter);
    }
  },
  actions: {
    fetchFlats({commit, state, dispatch}){
      
      const data = state.filter;
        axios.post(state.fetchMyAPIPath + 'flats', data).then(r=> {
            // Controllo che abbia preso correttamente i risultati dalla chiamata API
            console.log(r.data);
            commit('setAllFlats', r.data);
            
            dispatch('cercaAppartamenti');
        });
        
    },
    async fetchSuggestions({ commit, state }) {
      if (state.query.length < 3) {
        commit("setSuggestions", []);
        return;
      }

      const url = `https://api.tomtom.com/search/${state.versionNumber}/search/${state.query}.${state.ext}?key=${state.apiKey}&typeahead=true&limit=10&countrySet=IT`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        commit("setSuggestions", data.results);
      } catch (error) {
        console.error("Errore nella richiesta:", error);
      }
    },
    selectSuggestion({ commit }, suggestion) {
      commit("setQuery", suggestion.address.freeformAddress);
      commit("setSelectedSuggestion", suggestion);
      commit("setLat", suggestion);
      commit("setLon", suggestion);
      commit("setSuggestions", []);
    },
    async cercaAppartamenti({ dispatch, state, commit }) {
      console.log('cerco');
        state.foundedFlats = [];
        
        commit("setSearchActive");
        commit("closeAll");
        for (const flat of state.allFlats) {
          const d = await dispatch('getDistanceFromLatLonInKm', { lat2: flat.latitude, lon2: flat.longitude });
          if (d < state.radius) {
            commit('setFoundedFlats', flat);
          }
        }
        console.log(state.foundedFlats);

        const mainElem = document.querySelector('.bannerCont');
        const headerElem = document.querySelector('.navbar')
        const x = mainElem.offsetHeight + mainElem.offsetTop - headerElem.offsetHeight ;
        window.scroll(0, x);
      },
      getDistanceFromLatLonInKm({ state }, { lat2, lon2 }) {
        const R = 6371; // Raggio della Terra in chilometri
        const dLat = deg2rad(lat2 - state.lat);
        const dLon = deg2rad(lon2 - state.lon);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(deg2rad(state.lat)) *
            Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distanza in chilometri
        // console.log('Distanza:', d); // Per visualizzare la distanza calcolata
        return d;
      },
      async setLatLon({dispatch, commit}, city ) {
        commit('setCoordinates', city);
        await dispatch('fetchFlats');
      }
  },
});

export default store;
