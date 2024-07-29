<template>
    <div class="container my-5 text-center" v-if="flats.length > 0">
        <h1 class="py-3 m-0 fs-2">Appartamenti consigliati</h1>
        <div class="carousel-wrap">
            <swiper :modules="modules" :slides-per-view="4" :space-between="10" :loop="true"
                :autoplay="{ delay: 3000, disableOnInteraction: false }" :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }" :pagination="{ clickable: true }" :breakpoints="breakpoints" mousewheel>
                <swiper-slide v-for="flat in flats" :key="flat.id">
                    <Flat_card :flat="flat" :sponsored="false" />
                </swiper-slide>
                <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
                <div class="swiper-pagination"></div>
            </swiper>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Flat_card from './Flat_card.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Navigation, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
    components: {
        Flat_card,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            flats: [],
            modules: [Navigation, Autoplay, Mousewheel],
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
                1440: {
                    slidesPerView: 4
                }
            }
        }
    },

    created() {
        this.fetchFlats();
    },

    methods: {
        fetchFlats() {
            axios.get('http://127.0.0.1:8000/api/flats/sponsored').then((resp) => {
                this.flats = resp.data;
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    background-color: rgba(180, 184, 151, 0.3);
    border-radius: 15px;
}

.carousel-wrap {
    position: relative;
    z-index: 0;
    padding: 10px;
    width: 100%;
    display: flex;
}

.swiper {
    position: relative;
    width: 100%;
}

.swiper-slide {
    padding: 10px;
}

.swiper-button-next,
.swiper-button-prev {
    position: absolute;
    top: 50%;
    width: 30px;
    height: 50px;
    z-index: 10;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    filter: drop-shadow(0px 2px 0px var(--bg-color));
}

.swiper-button-prev {
    left: 10px;
    right: auto;
}

.swiper-button-next {
    right: 10px;
    left: auto;
}

.swiper-button-disabled {
    opacity: 0.35;
    cursor: auto;
    pointer-events: none;
}
h1 {
    color: black;
}
</style>
