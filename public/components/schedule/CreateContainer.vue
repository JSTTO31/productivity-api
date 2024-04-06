<template>
    <div class="pa-5 pt-2">
        <v-card-title class="px-0 mb-2">Add Schedule</v-card-title>
        <schedule-create-schedule-card :start-at="startAt" @close="$router.push({query: {}})"></schedule-create-schedule-card>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const startAt = computed(() => new Date(route.query.date?.toString() || ''))
</script>

<style scoped>

</style>