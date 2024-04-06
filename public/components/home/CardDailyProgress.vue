<template>
    <v-card  class="h-25 bg-surface  rounded-lg pa-2" flat>
        <v-card-title class="d-flex">
            Today progress
        </v-card-title>
        <v-card-text class="py-2">
            <v-progress-linear class="rounded mb-2" :model-value="25" color="primary"  height="25"></v-progress-linear>
            <div class="d-flex align-center justify-space-between text-subtitle-2 font-weight-regular mb-2">
                <span>3/5</span>
                <span>incomplete</span>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>