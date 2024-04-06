<template>
    <v-menu location="end" v-model="menu" :close-on-content-click="false" 
        key="parent">
        <template #activator="{ props }">
            <v-card v-bind="props" flat class="pa-0 py-3  align-start h-100 rounded" variant="flat"
                :color="schedule.tags[0]?.color || ''">
                <v-card-title class="text-subtitle-1 mt-n2">
                    {{ schedule.title }}
                </v-card-title>
                <v-card-text>
                    <div class="d-flex align-center  text-lowercase" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-clock</v-icon>
                        {{ time }}
                    </div>
                    <div class="d-flex align-center text-capitalize mt-3" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-account-tie</v-icon>
                        {{ schedule.user.name }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-check" color="success"
                            v-if="status == 'finished'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-refresh" color="secondary"
                            v-else-if="status == 'ongoing'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-arrow-right" color="info"
                            v-else-if="status == 'upcoming'">
                            {{ status }}
                        </v-chip>
                        <v-chip variant="flat" class="rounded text-capitalize" prepend-icon="mdi-calendar-alert" color="error" v-else>
                            {{ status }}
                        </v-chip>
                    </div>
                </v-card-text>
            </v-card>
        </template>
        <v-card width="345" class="mx-2 pa-1">
            <div>
                <v-card-title class="d-flex" style="font-size: 18px">
                    <v-icon class="mr-3 mt-1" :color="schedule.tags[0]?.color || 'grey'"
                        @click="">mdi-square-rounded</v-icon>
                    <div class="d-flex flex-column text-wrap text-capitalize">
                        {{ schedule.title }}
                        <v-card-subtitle class="px-0 text-caption">{{ new Date(schedule.startAt).toDateString()
                            }}</v-card-subtitle>
                    </div>
                    <v-spacer></v-spacer>
                    <v-menu persistent :no-click-animation="true">
                        <template #activator="{ props }">
                            <v-btn icon="mdi-dots-vertical" v-bind="props" flat size="small"></v-btn>
                        </template>
                        <v-list class="rounded">
                            <v-list-item @click="showEdit" prepend-icon="mdi-pencil-outline"
                                density="compact" class="text-capitalize text-caption">Edit</v-list-item>
                            <v-list-item @click="finished" prepend-icon="mdi-flag" density="compact"
                                class="text-capitalize text-caption" v-if="!schedule.finished">Mark as
                                finished</v-list-item>
                            <v-list-item v-else @click="finished" prepend-icon="mdi-flag-remove" density="compact"
                                class="text-capitalize text-caption">Mark as unfinished</v-list-item>
                            <v-list-item @click="menu = false" prepend-icon="mdi-close" density="compact"
                                class="text-capitalize text-caption">Close</v-list-item>
                            <v-list-item @click="$router.push({query: {delete: schedule._id}})" prepend-icon="mdi-trash-can-outline"
                                density="compact"
                                class="text-capitalize text-caption text-error">Delete</v-list-item>
                        </v-list>
                    </v-menu>
                </v-card-title>
                <v-card-text>
                    <div class="d-flex align-center  font-weight-medium text-lowercase" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-clock</v-icon>
                        {{ time }}
                    </div>
                    <div v-if="schedule.location"
                        class="my-3 d-flex align-center  font-weight-medium text-capitalize" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-map-marker</v-icon>
                        {{ schedule.location }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-icon size="25" class="mr-4">mdi-account-tie</v-icon>
                        {{ schedule.user.name }}
                    </div>
                    <div class="d-flex align-center text-capitalize font-weight-medium mt-3" style="opacity: .8">
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-check" color="success"
                            v-if="status == 'finished'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-refresh" color="secondary"
                            v-else-if="status == 'ongoing'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-arrow-right" color="info"
                            v-else-if="status == 'upcoming'">
                            {{ status }}
                        </v-chip>
                        <v-chip class="text-capitalize" prepend-icon="mdi-calendar-alert" color="error" v-else>
                            {{ status }}
                        </v-chip>
                    </div>
                    <div class="d-flex py-5 pb-0 flex-wrap" style="gap: 5px" v-if="schedule.tags.length > 0">
                        <v-chip variant="flat" class="text-capitalize rounded" v-for="tag in schedule.tags"
                            :color="tag.color">{{ tag.label }}</v-chip>
                    </div>
                    <v-btn v-if="schedule.link" @click="goToMeet" block variant="flat" class="text-capitalize mt-2"
                        prepend-icon="mdi-video-outline" color="blue">Join Meeting</v-btn>
                </v-card-text>
            </div>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
const $schedule = useScheduleStore()
const props = defineProps<{ schedule: ScheduleData }>()
const time = computed(() => new Date(props.schedule.startAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date(props.schedule.endAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
const status = computed(() => {
    const now = new Date()
    const startAt = new Date(props.schedule.startAt)
    const endAt = new Date(props.schedule.endAt)
    return props.schedule.finished ? 'finished' : now > startAt && now < endAt ? 'ongoing' : now < startAt ? 'upcoming' : 'not finished'
})
const menu = ref(false)
function finished() {
    $schedule.toggleFinished(props.schedule._id)
}

function goToMeet() {
    window.open(props.schedule.link, '_blank')
}
const router = useRouter()
function showEdit(){
    menu.value = false;
    router.push({query: {edit: props.schedule._id}})
}


</script>

<style scoped></style>