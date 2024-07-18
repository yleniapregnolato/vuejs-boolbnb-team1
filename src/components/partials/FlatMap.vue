<script>
import { mapState } from 'vuex';

export default {
    props: {
        flat: Object,
    },
    computed: {
        ...mapState({
            apiKey: state => state.apiKey
        })
    },
    mounted() {
        this.initializeMap();
    },
    methods: {
        initializeMap() {
            // Istanzia la mappa, usando la chiave API, il container con ID, e partendo da un centro, zoom (opzionale)
            const map = tt.map({
                key: this.apiKey,
                container: "map",
                center: [this.flat.lat, this.flat.lon],
                zoom: 15,
            });
            // Aggiungo la possibilità di controllare la mappa (+, -)
            map.addControl(new tt.NavigationControl());
        }
    }
}
</script>

<template>
<div id="map"></div>
</template>

<style lang="scss" scoped>
#map{
    width: 450px;
    height: 450px;
    border-radius: 20px;
    padding: 20px;
    border: 1px solid black;
}
</style>