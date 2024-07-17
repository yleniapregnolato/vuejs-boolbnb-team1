<script>
export default {
  props: {},
  data() {
    return {
      cities: [
        {
          name: "Torino",
          link: "https://hips.hearstapps.com/hmg-prod/images/torino-with-mole-antonelliana-and-the-alps-royalty-free-image-1643015862.jpg",
        },
        {
          name: "Roma",
          link: "https://image-tc.galaxy.tf/wijpeg-1lcrqdyl91lsdkomcnet6276l/1-roma-dall-alto-copertina_wide.jpg?crop=119%2C0%2C1742%2C980",
        },
        {
          name: "Napoli",
          link: "https://www.civitatis.com/blog/wp-content/uploads/2024/02/shutterstock_732553141-1920x1280.jpg",
        },
        {
          name: "Firenze",
          link: "https://tourismmedia.italia.it/is/image/mitur/20210401173629-firenze-toscana-gettyimages-1145040590?wid=1600&hei=900&fit=constrain,1&fmt=webp",
        },
        {
          name: "Bari",
          link: "https://images.lonelyplanetitalia.it/uploads/shutterstock-1451445944?q=80&p=slider&s=380ec9b48d95e3f821293c7ea2f1f768",
        },
        {
          name: "Venezia",
          link: "https://www.travel365.it/foto/seagull-flies-by-rialto-bridge-popular-landmark-venice-italy.jpg",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="row container m-auto">
    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12" v-for="city in cities" :key="city">
      <div class="card m-5 w-100">
        <a href="">
          <img class="card-img-top ms_img" :src="city.link" alt="Card image cap" />
          <div class="pt-1 text-center">
            <h4 class="card-title">{{ city.name }}</h4>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: black;
}

.ms_img {
  height: 40vh;
  object-fit: cover;
  object-position: center;
}

</style>
