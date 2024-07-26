<script>
import { computed } from 'vue';


export default {
  data() {
    return {
        
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo(0, 0);
    }
  }

};
</script>

<template>

  <nav class="navbar navbar-expand-lg ms_headernav ms_bg-primary sticky-top">
    <div class="container-fluid">
      <router-link class="navbar-brand font nav-link" to="/">
        <img src="../assets/img/logo-white.png" alt="" @click="scrollTop()">
      </router-link>
      <button class="navbar-toggler font border" type="button" data-bs-toggle="collapse" data-bs-target="#navbar"
        aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav gap-2 ms-auto mb-lg-0">
          <li class=""><a href="http://127.0.0.1:8000/" target="_blank" class="nav-link font ms_hover">Accedi</a></li>
          <li class="nav-item"><a href="http://127.0.0.1:8000/register" target="_blank"
              class="nav-link font ms_hover">Registrati</a>
          </li>

        </ul>

      </div>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
@use '../scss/header.scss' as *;

.ms_hover::after {
  content: '';
  width: 0;
  height: 2px;
  background-color: var(--bg-color);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: width 0.7s;
}

.nav-link {
  position: relative;
  
  &:focus {
    color: unset;
  }

  &:hover {
    color: var(--bg-color);

    &.ms_hover::after {
      width: 100%;
    }
  }
}

@media screen and (max-width: 992px) {
  .nav-link {

    &:hover {
      color: var(--bg-color);

      &.ms_hover::after {
        width: 0px;
      }
    }
  }
}
</style>
