<template>
    <v-card class="pa-5 px-10 d-flex flex-column align-center" :loading="loading" :disabled="loading" v-if="schedule">
        <v-avatar size="60" style="border: 2px solid rgba(var(--v-theme-error));opacity: .5">
            <v-icon size="30" color="error">mdi-trash-can-outline</v-icon>
        </v-avatar>
        <h3 class="text-center mt-2 font-weight-medium">Are you sure you want to delete <span
                class="font-weight-bold text-error">{{ schedule.title }}</span> schedule?</h3>
        <div class="d-flex mt-4" style="gap: 10px">
            <v-btn class="text-capitalize"  color="blue" @click="removeSchedule">Yes</v-btn>
            <v-btn class="text-capitalize"  @click="$router.push({query: {}})">No</v-btn>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const {schedules} = storeToRefs(useScheduleStore())
const route = useRoute()
const schedule = computed(() => schedules.value.find(schedule => schedule._id == route.query.delete))
const loading = ref(false)
const $schedule = useScheduleStore()
const router = useRouter()
function removeSchedule() {
    if (!route.query.delete) return
    $schedule.destroy(route.query.delete.toString()).then(() => {
        router.push({ query: {} })
    })
}
</script>

<style scoped>

</style>