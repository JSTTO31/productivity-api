<template>
    <h3 v-bind="$attrs" class="d-flex align-center wobble-hor-bottom"
        style="font-family: 'Roboto', sans-serif;font-weight: 700;cursor: pointer;">
        <v-icon id="logo" class="rounded-circle " style="transform: rotate(25deg);">mdi-lightning-bolt</v-icon>
        Efficiently
    </h3>
</template>

<script>
export default {
    inheritAttrs: true
}
</script>

<style scoped>
.wobble-hor-bottom{
    transition: color .8s ease;
}
/* .wobble-hor-bottom:hover {
    -webkit-animation: wobble-hor-bottom 0.8s both;
    animation: wobble-hor-bottom 0.8s both;
    color: rgba(var(--v-theme-primary));

} */

/* .wobble-hor-bottom:hover{
    color: rgba(var(--v-theme-secondary));

} */

.wobble-hor-bottom:hover #logo{
    animation: rotate .8s both;
}

@keyframes rotate {
    from{
        transform: rotate(360deg);
    }
    to{
        transform: rotate(25deg);
    }
}

</style>