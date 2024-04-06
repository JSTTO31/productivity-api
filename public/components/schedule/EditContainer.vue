<template>
    <div v-if="schedule" class="pa-5 pt-2">
        <v-card-title class="px-0 mb-2">Edit Schedule</v-card-title>
        <ScheduleEditScheduleCard :schedule="schedule" @close="$router.push({query: {}})"></ScheduleEditScheduleCard>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const {schedules} = storeToRefs(useScheduleStore())
const schedule = computed(() => schedules.value.find(item => item._id == route.query.edit))
</script>

<style scoped>

</style>