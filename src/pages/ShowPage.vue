<script>
import axios from "axios";
import ContactHostModal from '../components/partials/ContactHostModal.vue';
export default {
    components: {
        ContactHostModal,
    },
    data() {
        return {
            flat: {

            }
        };
    },
   created() {
    const slug = this.$route.params.slug;

    axios.get(`http://127.0.0.1:8000/api/flats/${slug}`).then((resp)=> {
        this.flat = resp.data
        console.log(this.flat.id);
    })
   }
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
                <h1>{{ flat.title }} {{ flat.id }}</h1>
            </section>
            <!-- /info appartamento -->

            <!-- mappa -->
            <section>

            </section>
            <!-- /mappa -->
        </div>

        <ContactHostModal :flatId="flat.id" />

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