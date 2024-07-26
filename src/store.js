import { reactive } from "vue";

export const storejs = reactive({
    city_img: [
        {
            name: "Torino",
            link: "torino.jpg", 
            lat: 45.068375,
            lon: 7.683066

        },
        {
            name: "Roma",
            link: "roma.jpg",
            lat: 41.890557,
            lon: 12.494268
        },
        {
            name: "Napoli",
            link: "napoli.webp",
            lat: 40.839983,
            lon: 14.252542
        },
        {
            name: "Firenze",
            link: "firenze.webp",
            lat: 43.768698,
            lon: 11.256929
        },
        {
            name: "Bari",
            link: "bari.jpeg",
            lat: 41.125913,
            lon: 16.872113
        },
        {
            name: "Venezia",
            link: "venezia.jpg",
            lat: 45.434608,
            lon: 12.338913
        },
    ],
    selected: '',
    lat: '',
    lon: ''
})