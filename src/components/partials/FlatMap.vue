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
            customIcon.style.backgroundImage = "url('https://cdn-icons-png.freepik.com/256/12148/12148859.png?ga=GA1.1.390998275.1721068661&semt=ais_hybrid')";
            customIcon.style.backgroundSize = 'contain';
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
    width: 450px;
    height: 450px;
    border-radius: 20px;
    padding: 20px;
    border: 1px solid black;
}
</style>
