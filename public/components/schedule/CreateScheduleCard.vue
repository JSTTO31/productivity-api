<template>
    <v-form @submit.prevent="submit">
        <v-text-field prepend-inner-icon="mdi-calendar-text" density="compact" :error-messages="$v.title.$errors[0]?.$message.toString() || ''" variant="solo-filled" flat  v-model="$v.title.$model"  placeholder="What's the agenda?" />
        <date-picker v-model:date="date"></date-picker>
        <div class="d-flex mb-2" style="gap: 15px">
            <v-col class="pa-0">
                <time-picker :error-messages="$v.startAt.$errors.length > 0 ? $v.startAt.$errors[0].$message : ''" v-model:date="$v.startAt.$model"></time-picker>
            </v-col>
            <v-col class="pa-0">
                <time-picker :error-messages="$v.endAt.$errors.length > 0 ? $v.endAt.$errors[0].$message : ''" v-model:date="$v.endAt.$model"></time-picker>
            </v-col>
        </div>
        <v-text-field v-model="$v.location.$model" flat label="Location" single-line variant="solo-filled"
            density="compact" prepend-inner-icon="mdi-map-marker"></v-text-field>
        <v-text-field :error-messages="$v.link.$errors[0]?.$message.toString() || ''" v-model="$v.link.$model" flat label="Video meeting link" single-line variant="solo-filled"
            density="compact" prepend-inner-icon="mdi-link-variant"></v-text-field>
        <schedule-tag-field v-model:tags="$v.tags.$model"></schedule-tag-field>
        <div class="d-flex pt-2" style="gap: 5px;">
            <v-btn prepend-icon="mdi-plus" type="submit" flat :loading="loading" class="w-50 text-capitalize" color="primary">Add
                </v-btn>
            <v-btn prepend-icon="mdi-cancel" flat class="w-50 text-capitalize border" @click="emits('close')">Cancel
                </v-btn>
        </div>
    </v-form>
</template>

<script setup lang="ts">
import { required, helpers } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
const props = defineProps(['startAt'])
const emits = defineEmits(['close'])
const route = useRoute()
//@ts-ignore
const date = ref(new Date(props.startAt))
const endAt = new Date()
endAt.setHours(22)
endAt.setMinutes(0)
const schedule = reactive({
    title: '',
    startAt: new Date(props.startAt),
    endAt: new Date(endAt),
    location: '',
    link: '',
    recurrence: 'weekly',
    tags: [],
    reminder: '1 day before',
})
watch(date, () => {
    const startAt = new Date(schedule.startAt)
    const endAt = new Date(schedule.endAt)
    const newStartAt = new Date(date.value)
    newStartAt.setHours(startAt.getHours())
    newStartAt.setMinutes(startAt.getMinutes())
    const newEndAt = new Date(date.value)
    newEndAt.setHours(endAt.getHours())
    newEndAt.setMinutes(endAt.getMinutes())

    schedule.startAt = newStartAt
    schedule.endAt = newEndAt
    
})

function startAtShouldLowerEndAt(value: Date) {
    const startAt = new Date(value)
    const endAt = new Date(schedule.endAt)
    return startAt < endAt
}

function endAtShouldGreaterStartAt(value: Date) {
    const endAt = new Date(value)
    const startAt = new Date(schedule.startAt)
    return endAt > startAt
}

function dateMustHave30minutesDistance(value: Date){
    const startAt = new Date(schedule.startAt)
    const endAt = new Date(schedule.endAt)
    //@ts-ignore
    const difference = endAt - startAt
    const hours = Math.floor(difference / (1000 * 60 * 60))
    const minutes = difference / (1000 * 60)
    return hours > 0 || minutes >= 15
}

function gmeetZoom(value: string){
    if(!value) return true
    const regex = new RegExp('^https://meet.google.com|^https://zoom.us',)
    return regex.test(value)
}

const rules = {
    title: { required },
    startAt: { required, lowerThan: helpers.withMessage('The field must before end date!', startAtShouldLowerEndAt), mustHaveDistance:  helpers.withMessage('The field must have atleast 15 minutes distance!', dateMustHave30minutesDistance)},
    endAt: { required, greaterThan: helpers.withMessage('The field must after start date!', endAtShouldGreaterStartAt), mustHaveDistance:  helpers.withMessage('The field must have atleast 15 minutes distance!', dateMustHave30minutesDistance) },
    location: {},
    link: {link: helpers.withMessage('The field must be from gmeet or zoom!', gmeetZoom)},
    recurrence: {},
    tags: {},
    reminder: {},
}

const $v = useVuelidate(rules, schedule)

const recurrences = ["none", 'weekly', 'monthly']

const alertOptions = [
    'none',
    '15 minutes before',
    '25 minutes before',
    '1 hour before',
    '1 day before',
]

const loading = ref(false)

const $schedule = useScheduleStore()
const router = useRouter()
const {schedules} = storeToRefs(useScheduleStore())
async function submit() {
    if (!await $v.value.$validate()) return
    loading.value = true
    $schedule.create(schedule).then(() => {
        loading.value = false
        emits('close')
    })
}
</script>

<style scoped></style> 