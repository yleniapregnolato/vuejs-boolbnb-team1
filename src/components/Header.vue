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
  <nav class="navbar navbar-expand-lg ms_headernav ms_minh">
    <div class="container font">
      <a class="navbar-brand font-color-b" href="#">BOOBLBNB</a>
      <ul class="d-flex navbar-nav-custom gap-2 mb-2 mb-lg-0 align-items-center">
        <li class="nav-item ms_li"><router-link to="/" class="nav-link">Login</router-link></li>
        <li class="nav-item ms_li"><router-link to="/" class="nav-link">Registrati</router-link></li>
      </ul>
      <button class="navbar-toggler d-lg-none" type="button" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div :class="['collapse', 'navbar-collapse', { show: isNavbarOpen }]" id="navbarSupportedContent">
        <ul class="d-flex flex-column gap-3 ms-auto mb-4 mb-lg-0 d-lg-none">
          <li class="nav-item ms_li_nax"><router-link to="/" class="nav-link">Login</router-link></li>
          <li class="nav-item ms_li_nax"><router-link to="/" class="nav-link">Registrati</router-link></li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  

  <style lang="scss" scoped>
  @use '../scss/header.scss' as *;
  
  @media (max-width: 992px) {
    .navbar-nav-custom {
      display: none !important;
    }
  }
  
  @media (min-width: 992px) {
    .navbar-collapse {
      display: none !important;
    }
  }

  .ms_li {
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}

.ms_li::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: currentColor; 
  bottom: 0;
  left: 0;
  transition: width 0.7s;
}

.ms_li:hover::after {
  width: 100%;
}

.ms_li_nax {
  position: relative;
  display: inline-block;
  padding-bottom: 2px;
}

.ms_li_nax::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  background-color: currentColor; 
  bottom: 0;
  left: 0;
  transition: width 0.7s;
}

.ms_li_nax:hover::after {
  width: 20%;
}
</style>

