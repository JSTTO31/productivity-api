<template>
     <v-card density="compact" :color="schedule.tags[0]?.color || 'background'" class="border mb-2 rounded text-subtitle-2 font-weight-regular text-capitalize h-100 d-flex flex-column pa-2 px-4 pb-4"  flat>
        <v-card-title  class="d-flex pb-0 px-0">
            <h5  :class="schedule.finished ? 'text-decoration-line-through' : ''" class="text-wrap">
                {{ schedule.title }}
            </h5>
            <v-spacer></v-spacer>
            <v-btn variant="text" size="x-small" icon="mdi-pencil-outline" @click="$router.push({query: {edit: schedule._id}})"></v-btn>
            <v-btn variant="text" size="x-small" icon="mdi-trash-can-outline" @click="$router.push({query: {delete: schedule._id}})"></v-btn>
        </v-card-title>
            <div class="d-flex align-center  text-lowercase" style="opacity: .8">
                <v-icon size="18" class="mr-4">mdi-clock</v-icon>
                {{ time }}
            </div>
            <div v-if="schedule.location" class="my-3 d-flex align-center  font-weight-regular text-capitalize"  style="opacity: .8">
                <v-icon  size="18"  class="mr-4">mdi-map-marker</v-icon>
                {{schedule.location}}
            </div>
            <div class="d-flex align-center text-capitalize mt-3" style="opacity: .8">
                <v-icon size="18" class="mr-4">mdi-account-tie</v-icon>
                {{ schedule.user.name }}
            </div>
            <div class="d-flex py-5 pb-0 flex-wrap" style="gap: 5px"  v-if="schedule.tags.length > 1">
                <v-chip variant="flat" class="text-capitalize rounded" v-for="tag in schedule.tags.slice(1)" :color="tag.color">{{ tag.label }}</v-chip>
            </div>
            <v-spacer></v-spacer>
            <div class="mt-4 pb-0 d-flex align-center" style="gap: 5px;">
                <v-btn @click.stop="finished" variant="outlined" class="text-capitalize" size="small" prepend-icon="mdi-checkbox-marked" v-if="!schedule.finished">Finished</v-btn>
                <v-btn @click.stop="finished" variant="outlined" class="text-capitalize" size="small" prepend-icon="mdi-checkbox-blank" v-else>Unfinished</v-btn>
                <v-btn @click.stop="goToMeet" variant="flat" class="text-capitalize" size="small" prepend-icon="mdi-video" color="blue" v-if="schedule.link">Join Meeting</v-btn>
            </div>
    </v-card>
    <v-dialog scrim="transparent" style="position: fixed" v-model="showDetails" contained>
        <v-card class="pa-4 pt-1" >
            <v-card-title class="px-0 text-subtitle-1">Edit Schedule</v-card-title>
            <schedule-edit-schedule-card :schedule="schedule" v-model:menu="showDetails"></schedule-edit-schedule-card>
        </v-card>
    </v-dialog>
    <v-dialog style="position: fixed" width="400" v-model="showDelete" scrim="transparent" contained>
        <v-card class="pa-5 px-10 d-flex flex-column align-center" :loading="loading" :disabled="loading">
            <v-avatar size="50" style="border: 2px solid rgba(var(--v-theme-error));opacity: .5">
                <v-icon size="25" color="error">mdi-trash-can-outline</v-icon>
            </v-avatar>
            <h4 class="text-center mt-2 font-weight-medium">Are you sure you want to delete <span class="font-weight-bold text-error">{{schedule.title}}</span> schedule?</h4>
            <div class="d-flex mt-4" style="gap: 10px">
                <v-btn class="text-capitalize" size="small" color="blue" @click="removeSchedule">Yes</v-btn>
                <v-btn class="text-capitalize" size="small" @click="showDelete = false">No</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const showDelete = ref(false)
const showDetails = ref(false)
const menu = ref(false)
const $schedule = useScheduleStore()
const props = defineProps<{schedule: ScheduleData}>()
const time = computed(() => new Date(props.schedule.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(props.schedule.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))

function finished(){
    $schedule.toggleFinished(props.schedule._id)
}

function goToMeet(){
    window.open(props.schedule.link, '_blank')
}

const loading = ref(false)

function removeSchedule(){
    loading.value = true
    $schedule.destroy(props.schedule._id).then(() => {
        menu.value = false
        loading.value = false

    })
}

</script>

<style scoped>

</style>