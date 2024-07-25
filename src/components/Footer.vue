<script>
export default {};
</script>

<template>
  <div class="container-fluid ms_bg_footer p-3">
    <footer class="container">
      <!-- Logo -->
      <div class="mb-3">
        <router-link class="navbar-brand font nav-link" to="/">
          <img src="../assets/img/logo-white.png" alt="">
        </router-link>
      </div>
      <!-- /Logo -->

      <div class="row">
        <!-- Sezione sinistra -->
        <div class="col-md-4">
          <h6 class="">BoolBnb</h6>
          <ul class="list-unstyled">
            <li><a href="">Pubblica il tuo annuncio</a></li>
            <li><a href="">Prenotazione sicura</a></li>
            <li><a href="">Risorse per i partner</a></li>
            <li><a href="">Guida alle case vacanza</a></li>
          </ul>
        </div>
        <!-- /Sezione sinistra -->

        <!-- Sezione centrale -->
        <div class="col-md-4">
          <h6 class="font-color-b">Società</h6>
          <ul class="list-unstyled">
            <li><a href="">Chi siamo</a></li>
            <li><a href="">Lavora con noi</a></li>
            <li><a href="">Novità e comunicati stampa</a></li>
            <li><a href="">Termini e condizioni</a></li>
            <li><a href="">Informativa sulla privacy</a></li>
            <li><a href="">Politica sui cookie</a></li>
            <li><a href="">Notifiche di contenuto illegale</a></li>
            <li><a href="">Informazioni legali/Contattaci</a></li>
            <li><a href="">Proprietario responsabile</a></li>
            <li><a href="">Contattaci</a></li>
          </ul>
        </div>
        <!-- /Sezione centrale -->

        <!-- Sezione destra -->
        <div class="col-md-4">
          <h6 class="">Ti presentiamo la famiglia boolbnb</h6>
          <ul class="list-unstyled">
            <li><a href="">BoolBnb</a></li>
            <li><a href="">Abritel.fr</a></li>
            <li><a href="">Fewo-direkt.de</a></li>
            <li><a href="">Bookabach.com.nz</a></li>
            <li><a href="">Stayz.com.au</a></li>
          </ul>
        </div>
        <!-- /Sezione destra -->
      </div>
      <hr />

      <!-- Copyright -->
      <div>
        <small>
          © 2024 BoolBnB, una società di Expedia Group. Tutti i diritti
          riservati. BoolBnB e il logo di BoolBnB sono marchi commerciali o
          marchi registrati di HomeAway.com, Inc.
        </small>
      </div>
      <!-- /Copyright -->
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use "../scss/header.scss" as *;
@use "../scss/footer.scss" as *;

.ms_bg_footer {
  background-color: var(--primary-color);
  color: var(--bg-color);

  .ms_logo {
    color: var(--bg-color);
  }
  
}
</style>
