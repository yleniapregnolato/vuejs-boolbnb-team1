<script>
export default {
    data() {
        return {
            adultiVar: 2,
            bambiniVar: 0,
        }
    },
    methods: {
        incrementAdultiVar() {
            this.adultiVar++
        },
        incrementBambiniVar() {
            this.bambiniVar++
        },
        decrementBambiniVar() {
            if (this.bambiniVar > 0) {
                this.bambiniVar--;
            }
        },
        decrementAdultiVar() {
            if (this.adultiVar > 0) {
                this.adultiVar--;
            }
        }
    },
}
</script>

<template>
    <div>
        <div class="w-75 m-auto d-flex justify-content-between pt-5 mt-2">
            <div>
                <span>Adulti</span>
            </div>
            <div class="ms_circle_cont">
                <span @click="incrementAdultiVar" class="circle_ms">+</span>
                <span>{{ adultiVar }}</span>
                <span @click="decrementAdultiVar" class="circle_ms">-</span>
            </div>

        </div>
        <div class="w-75 m-auto d-flex justify-content-between pt-4">
            <div>
                <span>Bambini</span>
            </div>
            <div class="ms_circle_cont">
                <span @click="incrementBambiniVar" class="circle_ms">+</span>
                <span>{{ bambiniVar }}</span>
                <span @click="decrementBambiniVar" class="circle_ms">-</span>
            </div>
        </div>
        <div class="w-75 m-auto d-flex justify-content-between pt-4">
            <div class="d-flex flex-column">
                <span>Animali Domestici</span>
                <small class="ms_fs_small w-75">Visualizzerai solo le strutture che ammettono animali domestici</small>
            </div>
            <div class="form-check form-switch d-flex align-items-center">
                <input class="form-check-input p-0 m-0" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>

            </div>
        </div>
        <div class="w-75 m-auto d-flex justify-content-end">
            <button class="btn btn-primary my-4">fatto</button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.ms_fs_small {
    font-size: .9rem;
    font-weight: 200;
}

.ms_circle_cont {

    display: flex;
    gap: 1rem;

    .circle_ms {
        border: .1px solid black;
        width: 30px;
        border-radius: 50%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>