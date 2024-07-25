<script>
import { mapState } from 'vuex';
export default {
    props : {
        lat: {
            type: Number,
            required: true,
            default: 0
        },
        lon: {
            type: Number,
            required: true,
            default: 0
        }
    },
    mounted() {
        this.initializeMap();
        console.log('Avviata mappa');
        console.log(this.lat, this.lon);
    },
    computed: {
     ...mapState({
         apiKey: state => state.apiKey
     })
    },
    methods: {
        initializeMap() {
            const latitude = this.lat;
            const longitude = this.lon;

            const map = tt.map({
                key: this.apiKey,
                container: 'map',
                center: [longitude, latitude],
                zoom: 18
            });

            map.addControl(new tt.NavigationControl());

            const customIcon = document.createElement('div');
            customIcon.classList.add('ms_bg-marker');
            customIcon.style.backgroundSize = 'cover';
            customIcon.style.width = '32px';
            customIcon.style.height = '32px';

            new tt.Marker({
                element: customIcon
            }).setLngLat([longitude, latitude]).addTo(map);
        }
    }
};
</script>

<template>
   <div id="map"></div> 
</template>

<style lang="scss" scoped>
#map {
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    height: 100%;
}
</style>
