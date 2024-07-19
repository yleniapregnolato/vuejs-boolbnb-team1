<script>
export default {
    data() {
        return {
            flatCoverImg: "http://127.0.0.1:8000/storage",
        };
    },
    props: {
        flat: Object,
    }
};
</script>

<template>
    <router-link :to="{ name: 'show', params: { slug: flat.slug } }">
        <div class="card h-100 border-0">
            <div class="row flex-column g-0 h-100">
                <div class="col-md-12 overflow-hidden">
                    <img class="card-image img-fluid  w-100" :src="`${flatCoverImg}/${flat.main_img}`"
                        alt="immagine di copertina" />
                </div>
                <div class="col-md-12">
                    <div class="card-body">
                        <h5 class="card-title">{{ flat.title }}</h5>
                        <p class="card-text">{{ flat.address }}</p>
                        <!-- <p class="card-text"><small class="text-body-secondary">{{ flat.description }}</small></p> -->
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
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
}
</style>