<template>
    <v-card variant="tonal" class="w-100">
        <input @change="dateOnChange" :value="date" class="pa-2 w-50" type="date">
        <input @change="timeOnChange" :value="time" class="pa-2 w-50" type="time">
    </v-card>
</template>

<script setup >
const props = defineProps(['dateTime'])
const emits= defineEmits(['update:dateTime'])
const date = computed(() => new Date(props.dateTime).toISOString().substring(0, 10))
const time = computed(() => new Date(props.dateTime).toTimeString().substring(0, 8))
const dateOnChange = (e) => {
    emits('update:dateTime', new Date(e.target.value + ' ' + time.value));
}

const timeOnChange = (e) => {
    emits('update:dateTime', new Date(e.target.value + ' ' + date.value));
}
</script>

<style scoped>

</style>