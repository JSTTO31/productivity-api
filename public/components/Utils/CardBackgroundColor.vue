<template>
     <v-card flat class="pa-0 mt-3 rounded-lg" width="325" elevation="5">
        <!-- 
        <v-divider></v-divider> -->
        <v-list class="bg-transparent pa-5">
            <h4 class="mb-5 font-weight-regular">Theme colors</h4>
            <v-list-item rounded="lg" class="my-2" variant="flat" :prepend-icon="selectedBackgroundColor != color.value ? 'mdi-radiobox-blank' : 'mdi-radiobox-marked'" @click="selectedBackgroundColor = color.value" v-for="color in colors" :key="color.label" color="primary" :active="selectedBackgroundColor == color.value">{{ color.label }}</v-list-item>
        </v-list>
    </v-card>
</template>

<script setup lang="ts">
import { useColorStore, colors } from '~/stores/color';
const {selectedBackgroundColor} = storeToRefs(useColorStore())

</script>

<style scoped>

</style>