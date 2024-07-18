<script>
import { mapState } from "vuex";
export default {
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(["cities"]),
  },
};
</script>

<template>
  <div class="container">
    <div class="row mt-5">
      <div
        class="col-xl-2 col-lg-2 col-md-6 col-sm-12"
        v-for="city in cities"
        :key="city.name"
      >
        <div class="card m-5 w-100 rounded card-hover ms_csrd">
          <img
            class="card-img-top ms_img rounded"
            :src="city.link"
            alt="Card image cap"
          />
          <div class="card-img-overlay text-center text-white rounded overlay">
            <h4 class="card-title font">{{ city.name }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}

.ms_csrd {
  z-index: -1;
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
  transition: background-color 0.3s ease;
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
