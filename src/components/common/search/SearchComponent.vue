<script>
import AppDates from './AppDates.vue';
import AppDestination from './AppDestination.vue';
import AppPeople from './AppPeople.vue';


export default {
    name: "HomePage",
    data() {
        return {
            isDestinationActive: false,
            isDateActive: false,
            isPeopleActive: false,
        };
    },
    methods: {
        isDestinationOpen(event) {
            this.isDestinationActive = !this.isDestinationActive;
            if (this.isDestinationActive) {
                this.isDateActive = false;
                this.isPeopleActive = false;
            }
        },
        isDateOpen(event) {
            this.isDateActive = !this.isDateActive;
            if (this.isDateActive) {
                this.isDestinationActive = false;
                this.isPeopleActive = false;
            }
        },
        isPeopleOpen(event) {
            this.isPeopleActive = !this.isPeopleActive;
            if (this.isPeopleActive) {
                this.isDestinationActive = false;
                this.isDateActive = false;
            }
        },
    },
    components: { AppDates, AppDestination, AppPeople }
};
</script>

<template>
    <div class="containerMain">
        <div @click="isDestinationOpen" class="ContainerSearch destinazione">
            <i class="fa-solid fa-location-dot"></i>
            <span class="pl1rem">Destinazioni</span>
        </div>
        <div v-if="isDestinationActive" class="AfterDestinazione">
            <AppDestination />
        </div>

        <div @click="isDateOpen" class="ContainerSearch date">
            <i class="fa-solid fa-calendar-days"></i>
            <span class="pl1rem">Date</span>
        </div>

        <div v-if="isDateActive" class="AfterDate">
            <AppDates />
        </div>
        <div @click="isPeopleOpen" class="ContainerSearch persone">
            <i class="fa-solid fa-person"></i>
            <div class="containerPersone pl1rem">
                <span>persone</span>
                <span>2 persone</span>
            </div>
        </div>

        <div v-if="isPeopleActive" class="AfterPersone">
            <AppPeople/>
        </div>
        <button class="btn btn-primary rounded-pill py-2" type="button">Cerca</button>
    </div>
</template>

<style lang="scss" scoped>
* {
    color: rgb(115, 97, 97);
}

.containerMain {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
    width: 100%;
    height: 100%;
}

.ContainerSearch {
    position: relative;
    width: calc(33% - 20px);
    height: 6vh;
    border: 1px solid rgb(115, 97, 97);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;

    .containerPersone {
        display: flex;
        flex-direction: column;
    }
}

.destinazione,
.date,
.persone {
    position: relative;
}

.AfterDestinazione {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 40vh;
}

.AfterDestinazione,
.AfterDate,
.AfterPersone {
    position: absolute;
    top: 150%;
    left: 50%;
    transform: translate(-50%);
    width: 75%;
    border-radius: 2rem;
    background-color: rgb(253, 246, 239);
    z-index: 10;
}

.pl1rem {
    padding-left: 1rem;
}
</style>
