<script>
export default {};
</script>

<template>
  <div class="wrapper">
    <div class="icon facebook">
      <span
        ><a
          href="#"
          target="_blank"
          ><i class="fa-brands fa-facebook-f"></i></a
      ></span>
    </div>

    <div class="icon instagram">
      <span
        ><a href="" target="_blank"
          ><i class="fa-brands fa-instagram"></i></a
      ></span>
    </div>

    <div class="icon twitter">
      <span
        ><a href="#" target="_blank"
          ><i class="fa-brands fa-x-twitter"></i></a
      ></span>
    </div>

    <div class="icon youtube">
      <span
        ><a href="#" target="_blank"
          ><i class="fa-brands fa-youtube"></i></a
      ></span>
    </div>
  </div>
</template>

<style scoped>
/* ICONE SOCIAL */
a {
  color: inherit;
  text-decoration: none; /* Rimuove la sottolineatura dai link */
}

.wrapper {
  display: inline-flex;
  gap: 20px;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  transition: transform 0.3s ease; /* Aggiunge un effetto di ingrandimento al passaggio del mouse */
}

.icon span {
  height: 40px;
  width: 40px;
  display: block;
  background: #705D3F; /* Colore di sfondo iniziale */
  text-align: center;
  border-radius: 50%;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: background 0.4s ease, transform 0.3s ease; /* Transizioni fluide per colore e ingrandimento */
}

.icon span i {
  font-size: 25px;
  line-height: 40px;
  color: #fff; /* Colore dell'icona iniziale */
  transition: color 0.4s ease; /* Transizione fluida per il colore dell'icona */
}

.icon:hover span {
  transform: scale(1.1); /* Ingrandisce leggermente l'icona al passaggio del mouse */
}

.facebook:hover span {
  background: #3b5999;
}

.instagram:hover span {
  background: #e1306c;
}

.twitter:hover span {
  background: #333;
}

.youtube:hover span {
  background: #de463b;
}

/* Cambia il colore dell'icona al passaggio del mouse */
.facebook:hover span i {
  color: #fff;
}

.instagram:hover span i {
  color: #fff;
}

.twitter:hover span i {
  color: #fff;
}

.youtube:hover span i {
  color: #fff;
}
</style>

