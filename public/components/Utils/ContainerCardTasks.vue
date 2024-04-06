<template>
    <div>
        <UtilsCardTask v-for="task in tasks" :task="task" :key="task.id"></UtilsCardTask>
    </div>
</template>

<script setup lang="ts">
import { useTaskStore } from '~/stores/task';

const {tasks} = storeToRefs(useTaskStore())
</script>

<style scoped>

</style>