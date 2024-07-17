<script>
export default {};
</script>

<template>
  <footer class="container mt-5">

    <!-- Logo -->
    <div class="mb-3 ms_logo">
      <a href="#">
        <h2>BoolBnB/logo</h2>
      </a>
    </div>
    <!-- /Logo -->

    <div class="row">

      <!-- Sezione sinistra -->
      <div class="col-md-4">
        <h6>BoolBnb</h6>
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
        <h6>Società</h6>
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
        <h6>Ti presentiamo la famiglia boolbnb</h6>
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
        © 2024 BoolBnB, una società di Expedia Group. Tutti i diritti riservati.
        BoolBnB e il logo di BoolBnB sono marchi commerciali o marchi registrati di
        HomeAway.com, Inc.
      </small>
    </div>
    <!-- /Copyright -->

  </footer>
</template>

<style lang="scss" scoped>

footer {
  letter-spacing: 1px;
  font-weight: 100;
}

.ms_logo {
  text-decoration: none;
  a {
    color: black;
  }
}

li {
  margin-top: 5px;
}

a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
