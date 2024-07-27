<template>
    <div class="ms_toast ms_hidden bg-success rounded-2 shadow">
    <span id="message"></span> <i class="fa-regular fa-circle-check"></i>
    <div class="ms_line ms_hidden"> </div>
</div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.ms_toast {
    position: fixed;
    z-index: 999;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    transition: all 0.5s;
    color: white;
}

.ms_hidden {
    padding: 0;
    overflow: hidden;
    width: 0px;
    height: 0px;
    opacity: 0;
}

.ms_line {

height: 4px;
background-color: white;
border-radius: 5px;
width: 0px;
transition: width 4.7s linear;
margin-top: 5px;
}
</style>