// src/store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            // SearchComponent.vue
            isDestinationActive: false,
            isDateActive: false,
            isPeopleActive: false,
            // SearchBar.vue
            query: '',
            suggestions: [],
            apiKey: 'ZcdgGKenw2zWR1ufYKujLP0vgRMnGtMM',
            versionNumber: '2',
            ext: 'json',
            selectedSuggestion: null,
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
        setSelectedSuggestion(state, suggestion) {
            state.selectedSuggestion = suggestion;
        },
    },
    actions: {
        async fetchSuggestions({ commit, state }) {
            if (state.query.length < 3) {
                commit('setSuggestions', []);
                return;
            }

            const url = `https://api.tomtom.com/search/${state.versionNumber}/search/${state.query}.${state.ext}?key=${state.apiKey}&typeahead=true&limit=10&countrySet=IT`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                commit('setSuggestions', data.results);
            } catch (error) {
                console.error('Errore nella richiesta:', error);
            }
        },
        selectSuggestion({ commit }, suggestion) {
            commit('setQuery', suggestion.address.freeformAddress);
            commit('setSelectedSuggestion', suggestion);
            commit('setSuggestions', []);
        }
    }
});

export default store;
