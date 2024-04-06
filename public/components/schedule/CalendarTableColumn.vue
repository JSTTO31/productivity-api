<template>
    <v-col v-bind="props" class="col pa-0">
        <v-card flat class="rounded-0 h-100 text-white"
            :class="date.toDateString() == today.toDateString() ? 'section-active' : 'bg-transparent'">
            <div class="py-5">
                <h6 class="text-center text-capitalize font-weight-regular">{{ weekNames[date.getDay()] }}</h6>
                <h1 class="text-center text-h3 font-weight-bold">{{ date.getDate() }}</h1>
            </div>
            <div class="h-100 pa-2 d-flex flex-column" style="row-gap: 5px;">
                <transition-group name="scale-y">
                    <div v-for="schedule, n in schedules"  :key="schedule._id" >
                        <schedule-calendar-column-card :schedule="schedule"  :style="`transition-delay: ${n / 5};`"></schedule-calendar-column-card>
                    </div>
                </transition-group>
                <v-card  class=" pa-2 " height="80" variant="outlined" style="border:2px dashed;"
                    @click="$router.push({query: {date: startAt.toISOString()}})">
                    <v-icon>mdi-plus-circle</v-icon>
                </v-card>
            </div>
        </v-card>
    </v-col>
</template>

<script setup lang="ts">
const props = defineProps<{ date: Date }>()
const today = new Date()
const { schedules: schedulesStore } = storeToRefs(useScheduleStore())
const schedules = computed((): ScheduleData[] => {
    //@ts-ignore
    const filterSchedules = schedulesStore.value.filter(item => new Date(item.startAt).toDateString() == props.date.toDateString()).sort((a, b) => new Date(a.startAt) - new Date(b.startAt))
    return filterSchedules
})

const startAt = computed(() => schedules.value.length > 0 ? new Date(schedules.value[schedules.value.length - 1].endAt) : new Date(props.date))

const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
</script>

<style scoped>
.section-active {
    background:
        /* On "top" */
        repeating-linear-gradient(45deg,
            transparent,
            transparent 10px,
            #cccccc17 10px,
            #cccccc1c 20px),
        /* on "bottom" */
        linear-gradient(to bottom,
            #ffffff13,
            #ffffff17);
}

.scale-y-enter-active,
.scale-y-leave-active {
  transition: opacity .2s linear, transform .35s ease;
}

.scale-y-enter-from, .scale-y-leave-to{
  opacity: 0;
  transform: scale(.2);
}

</style>