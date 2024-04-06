<template>
    <span>
        <v-chip variant="flat" :color="schedule.tags[0]?.color || 'background'" size="small" class="rounded ma-0" style="text-overflow: ellipsis;text-wrap: nowrap;" v-if="index < 5">{{ title }}</v-chip>
        <div v-else class="d-flex" style="gap: 5px">
            <v-badge :model-value="length > 6" :content="`${length - 6}+`" class="rounded">
                <v-chip variant="flat" :color="schedule.tags[0]?.color || ''" size="small" class="rounded ma-0" >{{ title }}</v-chip>
            </v-badge>
        </div>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{schedule: ScheduleData, index: number, length: number}>()
const title = computed(() => props.index < 5 ? (props.schedule.title.length > 10 ? props.schedule.title.substring(0, 8) + '...' : props.schedule.title) : (props.schedule.title.length > 10 ? props.schedule.title.substring(0, 6) + '...' : props.schedule.title))

</script>

<style scoped>

</style>