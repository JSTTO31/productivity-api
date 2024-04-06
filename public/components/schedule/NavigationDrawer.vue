<template>
    <v-navigation-drawer @click.stop @mousedown.stop location="left" width="280"
        :model-value="showNavigation" style="z-index: 50 !important;" >
        <v-card class="h-100" style="overflow-y: scroll" id="upcoming-schedule-container">
            <v-card class="pa-3 px-5 d-flex align-center border-b rounded-0" color="transparent" flat @click="showUpcomingSchedules = !showUpcomingSchedules">
                <h4 class="font-weight-regular" style="font-family: 'Roboto', sans-serif;">Today Schedules</h4>
                <v-spacer></v-spacer>
                <v-icon v-if="!showUpcomingSchedules">mdi-chevron-down</v-icon>
                <v-icon v-else>mdi-chevron-up</v-icon>
            </v-card>
            <v-list class="pa-2" v-if="showUpcomingSchedules">
                <transition-group name="slide">
                    <schedule-upcoming-schedule-card class="mb-2" :style="`transition-delay: ${n / 5}s`" v-for="schedule, n in upcommingSchedules" :id="schedule._id" :key="schedule._id" :schedule="schedule"></schedule-upcoming-schedule-card>
                </transition-group>
                <v-list-item class="text-center text-subtitle-2 font-weight-regular" style="opacity: .8;" v-if="upcommingSchedules.length < 1">
                    No upcoming schedule
                </v-list-item>
            </v-list>
            <schedule-list-tags></schedule-list-tags>
        </v-card>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
const showUpcomingSchedules = ref(true)
const $tag = useTagStore()
const props = defineProps(['showNavigation'])
const {schedules} = storeToRefs(useScheduleStore())
const upcommingSchedules = computed(() => {
    return schedules.value.filter((schedule) => {
        const today = new Date()
        const endAt = new Date(schedule.endAt)
        return today.toDateString() == endAt.toDateString() && !schedule.finished
    }).sort((a, b) => {
        const today = new Date()
        if(today > new Date(b.endAt)) return -1
        //@ts-ignore
        return new Date(a.endAt) - new Date(b.endAt)
    }).slice(0, 3)
})
$tag.getAll()
</script>

<style scoped>
#upcoming-schedule-container::-webkit-scrollbar{
    width: 6px;
}
#upcoming-schedule-container::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, .3);
    border-radius: 5px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .2s linear, transform .35s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>