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
      isLoading: false,
    };
  },
  mutations: {
    toggleFiltersDropdown(state, value) {
      state.filtersDropdownVisible = value;
    },
    closeFiltersDropdown(state) {
      state.filtersDropdownVisible = false;
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
    setResetLatLon(state, data){
      state.lon = data;
      state.lat = data;
    },
    setLatString(state, stringLat) {
      state.lat = stringLat;
    },
    setLonString(state, stringLon) {
      state.lon = stringLon;
    },
    setAllFlats(state, data){
        state.allFlats = data;
        // console.log('AllFlats',state.allFlats);
    },
    setFoundedFlats(state, flat){
        state.foundedFlats.push(flat);
    },
    setResetFoundedFlats(state, data){
      state.foundedFlats = data;
      // console.log('flats', state.foundedFlats);
    },
    setSelectedSuggestion(state, suggestion) {
      state.selectedSuggestion = suggestion;
    },
    setSearchActive(state) {
      state.searchActive = true;
    },
    setSearchActiveFalse(state) {
      state.searchActive = false;
    },
    setCoordinates(state, city) {
      state.lon = city.lon;
      state.lat = city.lat;
    },
    setFilterServices(state, arrayServices) {
      state.filter.services = arrayServices;
      console.log(typeof(state.filter.services), state.filter.services);
    },
    setRadius(state, newRadius) {
      state.radius = newRadius;
      state.filter.radius = newRadius;
    },
    setBeds(state, beds) {
      state.filter.beds = beds;
    },
    setRooms(state, rooms) {
      state.filter.rooms = rooms;
    },
    setisLoading(state, data) {
      state.isLoading = data;
    }
  },
  actions: {
    fetchFlats({commit, state, dispatch}){
      commit('setisLoading', true);
      const data = state.filter;
      
      console.log(data);
        axios.get(state.fetchMyAPIPath + 'flats', {
          params: data
        }).then(r=> {
            // Controllo che abbia preso correttamente i risultati dalla chiamata API
            // console.log('Risposta API:',r.data);
            const arryFlats = r.data.data;
            const sortedFlats = arryFlats.sort((a, b) => {
              if (a.sponsored && !b.sponsored) {
                  return -1;
              } else if (!a.sponsored && b.sponsored) {
                  return 1;
              } else {
                  return 0;
              }
          });
            commit('setAllFlats', sortedFlats );
            setTimeout(function() {
              dispatch('cercaAppartamenti');

            },2000);
        });
        
    },
    async fetchSuggestions({ commit, state }) {
      if (state.query.length < 3) {
        commit("setSuggestions", []);
        return;
      }

      const url = `https://api.tomtom.com/search/${state.versionNumber}/search/${state.query}.${state.ext}?key=${state.apiKey}&typeahead=true&limit=4&countrySet=IT`;
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
        state.foundedFlats = [];
        
        commit("setSearchActive");
        commit("closeAll");
        for (const flat of state.allFlats) {
          const d = await dispatch('getDistanceFromLatLonInKm', { lat2: flat.latitude, lon2: flat.longitude });
          if (d < state.radius) {
            commit('setFoundedFlats', flat);
          }
        }
        commit('setisLoading', false);

        window.scroll(0, 0);
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
