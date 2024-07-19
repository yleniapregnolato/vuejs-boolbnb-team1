<script>
import axios from "axios";
import ContactHostModal from '../components/partials/ContactHostModal.vue';
import FlatMap from '../components/partials/FlatMap.vue';
import ServiceModal from '../components/partials/ServiceModal.vue';
export default {
    components: {
        ContactHostModal,
        FlatMap,
        ServiceModal,
    },
    data() {
        return {
            flat: {},
            flatServices: [],
            photos: [],
            lat: 0,
            lon: 0,
            flatCoverImg: "http://127.0.0.1:8000/storage",
            flatPhotosUrl: "http://127.0.0.1:8000/storage",
        };
    },
    created() {
        const slug = this.$route.params.slug;

        axios.get(`http://127.0.0.1:8000/api/flats/${slug}`).then((resp) => {
            this.flat = resp.data;
            this.flatServices = resp.data.services;
            this.photos = resp.data.photos;
            console.log(resp);
            this.lat = this.flat.latitude;
            this.lon = this.flat.longitude;
            // console.log(this.lat,this.lon)
            // console.log(this.flat.id);
            console.log(this.flatPhotos);
        });
    }
}
</script>

<template>
    <div class="container show-container mb-5">
        <div class="ms_showcontainer">
            <h1>{{ flat.title }} {{ flat.id }}</h1>
            <!-- galleria immagini -->
            <section>
                <div class="row">
                    
                </div>
                <img class="card-image img-fluid" :src="`${flatCoverImg}/${flat.main_img}`"
                        alt="immagine di copertina" />
                <ul>
                    <li v-for="(photo, index) in photos" :key="index">
                        <img :src="`${flatPhotosUrl}/${photo.image}`" alt="immagini" />
                    </li>
                </ul>
            </section>
            <!-- /galleria immagini -->

            <div class="row">
                <div class="col-8">
                    <!-- info appartamento -->
                    <section>
                        
                        <h4>{{ flat.address }}</h4>
                        <!-- descrizione -->
                        <p class="mt-4">{{ flat.description }}</p>

                        <h5>Informazioni sulla struttura:</h5>

                        <table class="table mt-4">
                            <tbody>
                                <tr>
                                    <th scope="row">Numero massimo di ospiti</th>
                                    <td>{{ flat.max_guests }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Camere disponibili</th>
                                    <td>{{ flat.rooms }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Letti a disposizione</th>
                                    <td>{{ flat.beds }}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Bagni a disposizione</th>
                                    <td>{{ flat.bathrooms }}</td>
                                </tr>
                            </tbody>
                        </table>


                    </section>
                    <!-- /info appartamento -->
                    <!-- modale servizi -->
                    <ServiceModal :services="flatServices" />
                    <!-- /modale servizi -->

                    <!-- modale contatti -->
                    <ContactHostModal :flatId="flat.id" />
                    <!-- modale contatti -->
                </div>
                <div class="col-3">
                    <!-- mappa -->
                    <section>
                        <FlatMap :lat="lat" :lon="lon" />
                    </section>
                    <!-- /mappa -->
                </div>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.show-container {
    padding: 1rem;

    .ms_showcontainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 60px;
    }

    .card-image {
        width: 500px;
    }
    
}
</style>