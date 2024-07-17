<script>
export default {
    data() {
        return {
            flatCoverImg: "http://127.0.0.1:8000/storage",
        };
    },
};
</script>

<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img class="card-image" :src="`${flatCoverImg}/${flat.main_img}`" alt="immagine di copertina" />
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{ flat.title }}</h5>
                    <p class="card-text">{{ flat.address }}</p>
                    <p class="card-text"><small class="text-body-secondary">{{ flat.description }}</small></p>
                </div>

                <router-link>Visualizza appartamento</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>