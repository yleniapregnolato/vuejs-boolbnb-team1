<script>
export default {
  data() {
    return {
      isNavbarOpen: false
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    }
  }
};
</script>

<template>
  <!-- <nav class="navbar navbar-expand-lg ms_headernav ms_minh p-0">
    <div class="container font">
      <a class="navbar-brand font-color-b" href="#">BOOBLBNB</a>
      <ul class="d-flex navbar-nav-custom gap-2 mb-2 mb-lg-0 align-items-center">
        <li class="nav-item ms_li"><router-link to="/" class="nav-link">Login</router-link></li>
        <li class="nav-item ms_li"><router-link to="/" class="nav-link">Registrati</router-link></li>
      </ul>
      <button class="navbar-toggler d-lg-none" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse', 'navbar-collapse', { show: isNavbarOpen }]" id="navbar">
        <ul class="d-flex flex-column gap-3 ms-auto mb-4 mb-lg-0 d-lg-none">
          <li class="nav-item ms_li_nax"><router-link to="/" class="nav-link">Login</router-link></li>
          <li class="nav-item ms_li_nax"><router-link to="/" class="nav-link">Registrati</router-link></li>
        </ul>
      </div>
    </div>
  </nav> -->

  <nav class="navbar navbar-expand-lg ms_headernav">
    <div class="container-fluid">
      <router-link class="navbar-brand font" to="/">BoolBnB</router-link>
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
