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
      cities: [
                {
                  name: "Torino",
                  link: "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg",
                },
                {
                  name: "Roma",
                  link: "https://image-tc.galaxy.tf/wijpeg-1lcrqdyl91lsdkomcnet6276l/1-roma-dall-alto-copertina_wide.jpg?crop=119%2C0%2C1742%2C980",
                },
                {
                  name: "Napoli",
                  link: "https://www.civitatis.com/blog/wp-content/uploads/2024/02/shutterstock_732553141-1920x1280.jpg",
                },
                {
                  name: "Firenze",
                  link: "https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp",
                },
                {
                  name: "Bari",
                  link: "https://images.lonelyplanetitalia.it/uploads/shutterstock-1451445944?q=80&p=slider&s=380ec9b48d95e3f821293c7ea2f1f768",
                },
                {
                  name: "Venezia",
                  link: "https://www.travel365.it/foto/seagull-flies-by-rialto-bridge-popular-landmark-venice-italy.jpg",
                },
              ],
    };
  },
  mutations: {
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
  },
  actions: {
    fetchFlats({commit, state}){
        axios.get(state.fetchMyAPIPath + 'flats').then(r=> {
            // Controllo che abbia preso correttamente i risultati dalla chiamata API
            console.log(r.data);
            commit('setAllFlats', r.data);
            console.log(state.allFlats);
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
        state.foundedFlats = [];
        for (const flat of state.allFlats) {
          const d = await dispatch('getDistanceFromLatLonInKm', { lat2: flat.latitude, lon2: flat.longitude });
          if (d < state.radius) {
            commit('setFoundedFlats', flat);
          }
        }
        console.log(state.foundedFlats);
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
        console.log('Distanza:', d); // Per visualizzare la distanza calcolata
        return d;
      },
  },
});

export default store;
