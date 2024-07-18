<script>
import axios from "axios";
export default {
    props: {
            flats: Object,
        },
    data() {
        return {
            
        };
    },
   
}
</script>

<template>
    <div class="show-container">
        <div class="ms_showcontainer">
            <!-- galleria immagini -->
            <section>

            </section>
            <!-- /galleria immagini -->

            <!-- info appartamento -->
            <section>
                <h1>{{ flat.title }}</h1>
            </section>
            <!-- /info appartamento -->

            <!-- mappa -->
            <section>

            </section>
            <!-- /mappa -->
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
}
</style>