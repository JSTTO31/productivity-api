<template>
     <v-card flat class="pa-0 py-3 rounded border" variant="flat"  :color="schedule.tags[0]?.color || 'background'" >
        <v-card-subtitle class="text-caption">{{ time }}</v-card-subtitle>
        <v-card-title class="text-subtitle-1 mt-n2">
            {{schedule.title}}
        </v-card-title>
        <v-card-text class="d-flex pb-0" style="gap: 5px">
            <!-- <v-btn size="small" class="text-capitalize rounded mr-2" variant="outlined" prepend-icon="mdi-information" flat>Details</v-btn> -->
            <v-btn size="small" class="text-capitalize rounded" :prepend-icon="!schedule.finished ? 'mdi-checkbox-marked' : 'mdi-square-rounded'" variant="outlined" flat @click="finished">finished</v-btn>
            <v-btn size="small" class="text-capitalize rounded" color="blue" prepend-icon="mdi-video" variant="elevated" flat @click="goToMeet" v-if="schedule.link">Join Meeting</v-btn>
        </v-card-text>
        <v-chip size="x-small" prepend-icon="mdi-clock-time-nine-outline" style="position: absolute;top: 10px;right: 10px;" v-if="ongoing">Ongoing</v-chip>
        <v-chip size="x-small" prepend-icon="mdi-clock-outline" style="position: absolute;top: 10px;right: 10px;" v-else>{{ timeAgo }}</v-chip>
    </v-card>
</template>

<script setup lang="ts">
const $schedule = useScheduleStore()
const props = defineProps<{schedule: ScheduleData}>()
const time = computed(() => new Date(props.schedule.startAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) + ' - ' + new Date(props.schedule.endAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}))
const timeAgo = useTimeAgo(new Date(props.schedule.startAt))
const ongoing = computed(() => {
    const today = new Date()
    const startAt = new Date(props.schedule.startAt)
    const endAt = new Date(props.schedule.endAt)
    
    return today.toDateString() == endAt.toDateString() && today > startAt && today < endAt
})

function finished(){
    $schedule.toggleFinished(props.schedule._id)
}

onMounted(() => {
    const scheduleCard = document.getElementById(props.schedule._id)
    if(scheduleCard){
        scheduleCard.style.transitionDelay = "none !important"
    }
})

function goToMeet(){
    window.open(props.schedule.link, '_blank')
}

</script>

<style scoped>
</style>