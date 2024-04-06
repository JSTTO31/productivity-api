<template>
    <v-menu v-model="menu" location="end" :close-on-content-click="false">
        <template #activator="{props}">
            <v-card v-bind="props" :height="height" class="pa-2" variant="outlined" style="border:2px dashed;" :disabled="!valid"
                @click=""  :color="valid ? 'white' : 'grey'">
                <v-icon v-if="valid">mdi-plus-circle</v-icon>
            </v-card>
        </template>
        <v-card width="345" class="mx-2">
            <v-card-title class=" d-flex align-center" style="font-size: 18px">
                Add Schedule
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" size="small" flat @click="menu = false"></v-btn>
            </v-card-title>
            <v-card-text>
                <schedule-create-schedule-card v-model:menu="menu" :start-at="schedule.startAt" :end-at="schedule.endAt" ></schedule-create-schedule-card>
            </v-card-text>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
const menu = ref(false)
type DummyObject = { _id: string, type: string, startAt: string, endAt: string }
const props = defineProps<{schedule: DummyObject}>()
const valid = computed(() => {
    const startAt = new Date(props.schedule.startAt)
    const endAt = new Date(props.schedule.endAt)
    //@ts-ignore
    const difference = endAt - startAt
    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = (difference / (1000 * 60)) % 60

    return hours > 0 || hours < 1 && minutes > 14
})
const height = computed(() => {
    const startAt = new Date(props.schedule.startAt)
    const endAt = new Date(props.schedule.endAt)
    //@ts-ignore
    const difference = endAt - startAt
    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = (difference / (1000 * 60)) % 60
    const minutesPercentHour  = minutes / 60
    let height = (170 * hours) + (170 * minutesPercentHour) 
    
    if(hours > 1){
        height += (hours - 1) * 5
    }

    return height 
})
</script>

<style scoped>

</style>