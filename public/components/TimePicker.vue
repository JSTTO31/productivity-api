<template>
    <div class="d-flex flex-column">
        <v-list-item @click="showClock" class="rounded d-flex align-center" style="background-color: rgba(125, 125, 125, .1);">
            <v-icon class="mb-1">mdi-clock-outline</v-icon>
            <span class="ml-3">
            {{ new Date(date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) }}
            </span>
        </v-list-item>
        <input ref="clock" type="time" @change="changeTime" :model-value="new Date(date).toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'})" class="" style="height: 0;">
        <span class="text-caption" :class="errorMessages ? 'text-error' : 'text-transparent'">{{errorMessages || 'example'}}</span>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['date', 'errorMessages'])
const emits = defineEmits(['update:date'])
const clock = ref()
function showClock(){
    clock.value.showPicker()
}

function changeTime(e: any){
    const split = e.target.value.split(':')
    const hours = split[0]
    const minutes = split[1]
    const tempDate = new Date(props.date)
    tempDate.setHours(hours)
    tempDate.setMinutes(minutes)

    emits('update:date', tempDate)
}
</script>

<style scoped>

</style>