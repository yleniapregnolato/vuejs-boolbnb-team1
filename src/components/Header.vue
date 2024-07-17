<script>
export default {
  data() {
    return {
      isNavbarOpen: false // Inizialmente la navbar è chiusa
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen; // Inverte lo stato di isNavbarOpen
    }
  }
};
</script>

<template>
<nav class="navbar navbar-expand-lg ms_headernav ms_minh">
    <div class="container font">
        <a class="navbar-brand font-color-b" href="#">BOOBLBNB</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"  @click="toggleNavbar">
            <span class="navbar-toggler-icon"></span>
        </button>
          <div
          class="collapse navbar-collapse"
          :class="{ 'show': isNavbarOpen }"
          id="navbarSupportedContent"
          >
            <ul class="d-flex navbar-nav gap-2 ms-auto mb-2 mb-lg-0" :style="{ height: isNavbarOpen ? 'auto' : '0' }">
                <li class="nav-item"><router-link class="nav-link">Login</router-link></li>
                <li class="nav-item"><router-link class="nav-link">Registrati</router-link></li>
            </ul>
        </div>
    </div>
</nav>
</template>

<style lang="scss" scoped>
@use '../scss/header.scss' as *;
.navbar-collapse {
  transition: height 0.3s ease-out;
  height: 0;
  overflow: hidden;
}

.navbar-collapse.show{
  height: auto;
}
</style>
