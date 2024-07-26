<script>
    export default {
        
    }
</script>

<template>
    <div class="not-found p-5">
        <div class="p-1 p-lg-3">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-8">
                        <h5>Nessun appartamento trovato</h5>
                        <p>Modifica la ricerca</p>     
                    </div>
                    <div class="col-12 col-md-4">
                        <img src="../../assets/img/not-found.png" class=" img-fluid" alt="">
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" scoped>
    .not-found {
        background-color: white;
        border-radius: 1rem;
        color: var(--primary-color);
        box-shadow: 2px 2px 0px var(--primary-color);
        // div {
        // background-image: url(../../assets/img/not-found.png);
        // background-repeat: no-repeat;
        // background-position:90%;
        // background-size: contain;
        // }
    }
</style>