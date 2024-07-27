<script>
export default {
    data() {
        return {
            flatCoverImg: "http://127.0.0.1:8000/storage",
        };
    },
    props: {
        flat: Object,
        sponsored: Boolean
    }
};
</script>

<template>
    <router-link :to="{ name: 'show', params: { slug: flat.slug } }">
            <div class="card h-100 border-0">
                <div class="row flex-column g-0 h-100">
                    <div class="col-md-12 overflow-hidden position-relative">
                        <div class="sponsored-badge" v-if="sponsored"><i class="fa-solid fa-heart"></i> I più amati</div>
                        <img class="card-image img-fluid  w-100" :src="`${flatCoverImg}/${flat.main_img}`"
                            alt="immagine di copertina" />
                            <div class="text-center ms_beds-rooms">
                                {{ flat.beds }} <i class="fa-solid fa-bed me-4"></i>
                                {{ flat.rooms }} <i class="fa-solid fa-door-open"></i>
                            </div>
                    </div>
                    <div class="col-md-12">
                        <div class="card-body">
                            <h5 class="card-title">{{ flat.title }}</h5>
                            <p class="card-text">{{ flat.address }}</p>

                        </div>
                    </div>
                </div>
            </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use '../../scss/sponsorships' as *;
a {
    text-decoration: none;
}

.card {
    
    &:hover .card-image {
        transform: scale(105%);
        border-radius: 5px;
    }

    & {
        cursor: pointer;
        box-shadow: 2px 2px 0px var(--primary-color);
        transition: all 0.5s;
    }


    .overflow-hidden {
        border-radius: 0.375rem 0.375rem 0 0;

    }

    .card-image {
        object-fit: cover;
        object-position: center;
        height: 300px;
        transition: all 0.5s;
    }

    .ms_beds-rooms {
        background-color: white;
        position: absolute;
        padding: 5px;
        bottom: 0;
        right: 0;
        border-radius: 5px 0px 0px 0px;
        
    }
}
</style>