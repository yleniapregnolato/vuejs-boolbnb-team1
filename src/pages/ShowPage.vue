<script>
import axios from "axios";
import ContactHostModal from '../components/partials/ContactHostModal.vue';
import FlatMap from '../components/partials/FlatMap.vue';
import ServiceModal from '../components/partials/ServiceModal.vue';
import { errorMessages } from "vue/compiler-sfc";
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
            lat: null,
            lon: null,
            flatCoverImg: "http://127.0.0.1:8000/storage",
            flatPhotosUrl: "http://127.0.0.1:8000/storage",
            errorMessage: null,
        };
    },
    created() {
        const slug = this.$route.params.slug;

        axios.get(`http://127.0.0.1:8000/api/flats/${slug}`).then((resp) => {
            this.flat = resp.data;
            this.flatServices = resp.data.services;
            this.photos = resp.data.photos;
            this.lat = this.flat.latitude;
            this.lon = this.flat.longitude;
        })
            .catch((error) => {
                console.error(error);
                this.errorMessage = 'Impossibile caricare i dettagli dell appartamento.';
            });
        window.scroll(0, 0);
    }
}
</script>

<template>
    <div class="container show-container mb-5">
        <!-- tasto indietro -->
        <router-link class="btn ms_brown_btn" :to="{ name: 'home' }"><i class="fa-solid fa-arrow-left"></i> Torna
            indietro</router-link>
        <div class="ms_showcontainer text-black">
            <!-- messaggio di errore -->
            <div v-if="errorMessage" class="alert alert-danger">
                {{ errorMessage }}
            </div>
            <!-- /messaggio di errore -->
            <h1 class="fw-bold mb-2">{{ flat.title }}</h1>

            <div class="row ms_heigth">
                <div class="col-md-7 col-12">
                    <img class="card-image img-fluid ms_photos h-100 fixed-size rounded-4" :src="`${flatCoverImg}/${flat.main_img}`"
                        alt="immagine di copertina" />
                </div>
                <!-- carosello -->
                <div class="col-md-5 col-12 mt-2 mt-md-0 ms_col" v-if="photos.length">
                    <section class="h-100">
                        <div id="carouselExampleFade" class="h-100 carousel slide carousel-fade">
                            <div class="carousel-inner h-100">
                                <div class="carousel-item active h-100" v-for="(photo, index) in photos" :key="index">
                                    <img class="ms_photo img-fluid card-image d-block h-100 fixed-size rounded-4"
                                        :src="`${flatPhotosUrl}/${photo.image}`" alt="immagini" />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="prev">
                                <i class="fa-solid fa-chevron-left"></i>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade"
                                data-bs-slide="next">
                                <i class="fa-solid fa-chevron-right"></i>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </section>
                </div>
                <!-- /carosello -->
            </div>
            <div class="row">
                <div class="col-lg-7 mt-5 ms_info col-sm-12">
                    <!-- info appartamento -->
                    <section>

                        <h3 class="fw-bold">{{ flat.address }}</h3>
                        <!-- descrizione -->
                        <p class="mt-2 mb-4">{{ flat.description }}</p>

                        <h4>Informazioni sulla struttura:</h4>

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
                    <ServiceModal :services="flatServices"/>
                    <!-- /modale servizi -->

                    <!-- modale contatti -->
                    <ContactHostModal :flatId="flat.id" />
                    <!-- modale contatti -->
                </div>
                <div class="col-lg-5 mt-5 col-map">
                    <!-- mappa -->
                    <section v-if="lat && lon" class="h-100 section-map">
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

    .ms_heigth {
        height: 400px;
    }

    .ms_col {
        height: 100%;
    }

    .ms_photos {
        object-fit: cover;
    }

    .ms_showcontainer {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 20px;
    }

    .card-image {
        width: 100%;
    }

    .ms_info {
        background-color: white;
        padding: 20px;
        border-radius: 15px;
    }

    .ms_brown_btn {
        background-color: #705D3F;
        border: 1px solid #705D3F;
        color: white;

        &:hover {
            background-color: #F8F2EB;
            border: 1px solid #705D3F;
            transition: all 0.7s;
            color: var(--primary-color);
            
        }
    }
    .fixed-size {
        max-width: 100%;
        max-height: 400px; 
        object-fit: cover;
    }
}

.section-map {
    min-height: 200px;
}

.fa-chevron-left, .fa-chevron-right {
    font-size: 35px;
    filter: drop-shadow(0px 4px 0px black);
}

@media (max-width: 991px) {
    .col-map {
    padding: 0;
}
}

@media screen and (max-width: 768px) {
    .show-container {
    .ms_heigth {
        height: 100%;
    }

    .ms_col {
        height: 300px;
    }
}
}
</style>