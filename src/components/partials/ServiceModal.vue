<script>
export default {
    props: {
        flat: {
            type: Object,
        },
        services: {
            type: Array,
        }
    },
    data() {
        return {
            showServices: false,
        }
    },
    methods: {
        serviceModal() {
            this.showServices = !this.showServices;
            console.log(this.showServices);
        }
    }
}
</script>

<template>
    <!-- modale servizi -->

    <!-- Modale servizi -->
    <button @click="serviceModal" class="btn btn-primary">Mostra servizi</button>

    <div class="modal ms_service-modal" :class="showServices ? 'd-block' : '' " tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Tutti i servizi</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="serviceModal"></button>
                </div>
                <div class="modal-body">
                    <ul>
                        <li v-for="(service, index) in services" :key="index">{{ service.name }}</li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="serviceModal">Chiudi</button>
                </div>
            </div>
        </div>
    </div>

</template>

<style lang="scss" scoped>

.ms_service-modal {
    top: 30%;
}


</style>