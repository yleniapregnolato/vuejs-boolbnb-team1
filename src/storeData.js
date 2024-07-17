// src/store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            isDestinationActive: false,
            isDateActive: false,
            isPeopleActive: false,
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
    },
});

export default store;
