<template>
    <div class="containerMain">
      <SearchBar />
      <!-- Togliere tutte le funzioni associate -->


      <!-- <div @click.stop="toggleDestination" class="ContainerSearch destinazione">
        <i class="fa-solid fa-location-dot"></i>
        <span class="pl1rem">Destinazioni</span>
      </div>

      <div v-if="isDestinationActive" class="AfterDestinazione">
        <SearchBar />
      </div>
  
      <div @click.stop="toggleDate" class="ContainerSearch date">
        <i class="fa-solid fa-calendar-days"></i>
        <span class="pl1rem">Date</span>
      </div>
  
      <div v-if="isDateActive" class="AfterDate">
        <AppDates />
      </div>
  
      <div @click.stop="togglePeople" class="ContainerSearch persone">
        <i class="fa-solid fa-person"></i>
        <div class="containerPersone pl1rem">
          <span>persone</span>
          <span>2 persone</span>
        </div>
      </div>
  
      <div v-if="isPeopleActive" class="AfterPersone">
        <AppPeople />
      </div>
  
      <button class="btn btn-primary rounded-pill py-2" type="button">Cerca</button> -->


      <!-- / Elimina -->
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  
  import SearchBar from './SearchBar.vue';
  import AppDates from './AppDates.vue';
  import AppPeople from './AppPeople.vue';
  
  export default {
    name: "HomePage",
    computed: {
      ...mapState([
        'isDestinationActive',
        'isDateActive',
        'isPeopleActive'
      ])
    },
    methods: {
      ...mapMutations([
        'toggleDestination',
        'toggleDate',
        'togglePeople'
      ]),
    },
    components: {
      SearchBar,
      AppDates,
      AppPeople
    }
  };
  </script>
  
  <style lang="scss" scoped>
  * {
    color: var(--primary-color);
  }
  
  .containerMain {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
    z-index: 1;
    width: 100%;
  }
  
  .ContainerSearch {
    position: relative;
    width: calc(33% - 20px);
    height: 6vh;
    border: 1px solid rgb(115, 97, 97);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  
    .containerPersone {
      display: flex;
      flex-direction: column;
    }
  }
  
  .destinazione,
  .date,
  .persone {
    position: relative;
  }
  
  .AfterDestinazione {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .AfterDestinazione,
  .AfterDate,
  .AfterPersone {
    position: absolute;
    top: 150%;
    left: 50%;
    transform: translate(-50%);
    width: 75%;
    border-radius: 2rem;
    background-color: rgb(253, 246, 239);
    z-index: 99999;
  }
  
  .pl1rem {
    padding-left: 1rem;
  }
  </style>
  