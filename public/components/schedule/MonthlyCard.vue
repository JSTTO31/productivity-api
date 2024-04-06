<template>
    <v-card :to="{name: 'r-access-schedules-monthly-date', params: {date: day.toISOString()}}" class="border rounded-0 pa-2" color="transparent" flat style="width: 14.28%;height: 20%;border-color: rgba(255,255,255,.2) !important;gap: 5px;row-gap: 0" :key="day.getDate()">
        <div class="d-flex flex-wrap" style="gap: 5px;">
            <ScheduleMonthlyCardListItem  v-for="schedule, n in getSchedules.slice(0, 6)" :key="schedule._id" :index="n" :schedule="schedule" :length="getSchedules.length"></ScheduleMonthlyCardListItem>
        </div>
        <span class="text-white bg-primary text-subtitle-2 pa-1  px-3 rounded" style="position: absolute;bottom: 2%;right: 2%" v-if="today.toDateString() == day.toDateString()">{{ day.getDate() }}</span>
        <span class="text-white text-subtitle-2" style="position: absolute;bottom: 2%;right: 2%" v-else>{{ day.getDate() }}</span>
    </v-card>
</template>

<script setup lang="ts">
const today = new Date()
const props = defineProps<{day: Date}>()
const {schedules} = storeToRefs(useScheduleStore())
const getSchedules = computed(() => schedules.value.filter(schedule => new Date(schedule.startAt).toDateString() == props.day.toDateString()))
</script>

<style scoped>

</style>