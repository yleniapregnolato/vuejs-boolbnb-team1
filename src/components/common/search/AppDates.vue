<template>
    <div>
        

        <vue-cal
            ref="vuecal"
            v-model:active-view="activeView"
            v-model:selected-date="selectedDate"
            :time="false"
            hide-view-selector
            small
            @click:date="onDateClick"
            @click:event="onEventClick"
        />
    </div>
</template>

<script>
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

export default {
    components: { VueCal },
    data() {
        return {
            activeView: 'month',
            selectedDate: new Date(),
            events: [],
        };
    },
    methods: {
        onEventClick(event) {
            console.log('Evento cliccato:', event);
        },
        onDateClick(date) {
            console.log('Data selezionata:', date);
        },
    },
};
</script>

<style lang="scss" scoped>

</style>
