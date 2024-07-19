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

        axios.get(`http://127.0.0.1:8000/api/flats/${slug}`).then((resp) => {
            this.flat = resp.data
            console.log(this.flat.id);
        })
    }
}
</script>

<template>
    <div class="container show-container">
        <div class="ms_showcontainer">
            <!-- galleria immagini -->
            <section>

            </section>
            <!-- /galleria immagini -->

            <div class="row">
                <div class="col-8">
                    <!-- info appartamento -->
                    <section>
                        <h2>{{ flat.title }} {{ flat.id }}</h2>
                        <h4>{{ flat.address }}</h4>
                        <!-- descrizione -->
                        <p class="mt-4">{{ flat.description }}</p>

                        <h5>Informazioni sulla struttura:</h5>

                        <table class="table">
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
                </div>
                <div class="col-3">
                    <!-- mappa -->
                    <section>
                        <h2>mappa</h2>
                    </section>
                    <!-- /mappa -->
                </div>

            </div>



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