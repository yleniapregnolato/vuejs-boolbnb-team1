<!-- <script>
import { mapState } from 'vuex';

export default {
    props: {
        flat: Object,
    },
    data() {
        return {
            map: null,
        };
    },
    computed: {
        ...mapState({
            apiKey: state => state.apiKey
        })
    },
    mounted() {
        this.initializeMap();
        this.geocodeAddress(); // Chiamata all'API di geocoding all'avvio del componente
    },
    methods: {
        initializeMap() {
            this.map = tt.map({
                key: this.apiKey,
                container: "map",
                center: ['12.4768', '41.9102'],
                zoom: 15,
            });
            this.map.addControl(new tt.NavigationControl());
        },
        geocodeAddress() {
            const address = "Via delle Grazie 23, Roma"; // Sostituisci con l'indirizzo che desideri geocodificare
            const apiKey = this.apiKey;
            const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Errore HTTP! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data); // Gestisci la risposta come necessario
                    const { lat, lon } = data.results[0].position;
                    this.map.setCenter([lat, lon]);
                })
                .catch(error => {
                    console.error('Errore nella chiamata API di geocoding:', error);
                    // Gestisci l'errore come necessario
                });
        }
    }
}
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
 -->

<!--  <script>
 import { mapState } from 'vuex';
 
 export default {
     props: {
         flat: Object,
     },
     data() {
         return {
             map: null,
         };
     },
     computed: {
         ...mapState({
             apiKey: state => state.apiKey
         })
     },
     methods: {
         async initializeMap() {
             if (!this.map) {
                 this.map = tt.map({
                     key: this.apiKey,
                     container: "map",
                     center: ['12.4768', '41.9102'],
                     zoom: 18,
                 });
                 this.map.addControl(new tt.NavigationControl());
             }
             // Aggiungi qui la chiamata per ottenere le coordinate se necessario
             await this.getCoordinatesFromAddress();
         },
         async getCoordinatesFromAddress() {
             try {
                 const url = `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(this.flat.address)}.json?key=${this.apiKey}`;
                 const response = await fetch(url);
                 const data = await response.json();
 
                 if (data.results && data.results.length > 0) {
                     const position = data.results[0].position;
                     this.map.setCenter([position.lat, position.lon]);
                 } else {
                     console.error('Nessuna posizione trovata per l\'indirizzo specificato.');
                 }
             } catch (error) {
                 console.error('Errore durante la ricerca delle coordinate:', error);
             }
         }
     },
     async mounted() {
         await this.initializeMap();
     }
 }
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
 </style> -->
 


 
 <script>
import { mapState } from 'vuex';
export default {
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
            const latitude = 41.890251;
            const longitude = 12.492373;

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
