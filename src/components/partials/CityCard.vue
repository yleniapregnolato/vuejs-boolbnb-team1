<script>

import { storejs } from "../../store";
import { mapActions, mapMutations } from "vuex/dist/vuex.cjs.js";
export default {
  props: {},
  data() {
    return {
      storejs,
    }
    
  },
  methods: {
    getImagePath(image) {
      return new URL(`../../assets/img/${image}`, import.meta.url).href;
    },
    getFilter(){

      this.setFilterServices([]);
      this.setRadius(20);
      this.setMinGuest(1);
    },
  
    
    ...mapActions(['cercaAppartamenti' , 'setLatLon']),
    ...mapMutations(['setFilterServices', 'setRadius', 'setMinGuest']),
  }
  ,
  props: {
    city: Object,
  }

};
</script>

<template>

        <div class="card rounded card-hover ms_card" @click=" getFilter(),setLatLon(city)">
          <img
            class="card-img-top ms_img rounded"
            :src="getImagePath(city.link)"
            alt="Card image cap"
          />
          <div class="card-img-overlay text-center text-white rounded overlay">
            <h4 class="card-title font">{{ city.name }}</h4>
          </div>
        </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}

.ms_card {
  cursor: pointer;

}
.ms_img {
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

.navbar {
  z-index: 1000; /* Assicura che la navbar sia sopra le cards */
}

.card {
  position: relative;

}

.font {
  font-weight: 400;
  letter-spacing: 2px;
}

// Hover
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.5s ease;
}

.card-hover:hover .overlay {
  background-color: rgba(0, 0, 0, 0);
}

.card-hover {
  transition: filter 0.3s ease;
}

.card-hover:hover {
  filter: brightness(100%);
}
</style>
