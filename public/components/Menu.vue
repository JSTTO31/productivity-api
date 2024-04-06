<template>
    <div @click="showMenu = !showMenu">
        <slot></slot>
    </div>
    <Transition name="slide-left">
        <v-card style="z-index: 10;" class=" rounded-0" id="menu-card" elevation="0" v-show="showMenu">
        </v-card>
    </Transition>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
const menuCard = ref()
const showMenu = ref(false)

onMounted(() => {
    onClickOutside(menuCard, () => {
        showMenu.value = false
    })
})
</script>

<style scoped>
#menu-card{
    position: fixed;
    top: 0px;
    right: 55px;
    height: 100%;
    width: 350px;
}

.slide-left-enter-active, .slide-left-leave-active{
    transition: .4s ease-in-out;
}

.slide-left-enter-from, .slide-left-leave-to{
    width: 0px;
}
</style>