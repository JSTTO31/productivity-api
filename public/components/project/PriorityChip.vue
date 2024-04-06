<template>
  <v-menu>
    <template #activator="{ props }">
      <v-chip
        v-bind="props"
        v-if="priority == 'low'"
        prepend-icon="mdi-circle-small"
        color="blue"
        class="px-5 rounded"
        append-icon="mdi-chevron-down"
        >Low</v-chip
      >
      <v-chip
        v-bind="props"
        v-else-if="priority == 'medium'"
        prepend-icon="mdi-circle-medium"
        color="warning"
        class="px-5 rounded"
        append-icon="mdi-chevron-down"
        >Medium</v-chip
      >
      <v-chip
        v-bind="props"
        v-else
        prepend-icon="mdi-circle"
        color="error"
        class="px-5 rounded"
        append-icon="mdi-chevron-down"
        >High</v-chip
      >
    </template>
    <v-list class="mt-1 pa-2 rounded">
      <v-list-item
        :active="priority == 'low'"
        @click="emits('update:priority', 'low')"
        density="compact"
        prepend-icon="mdi-circle-small"
        color="blue"
        class="px-5 text-caption pr-10 w-100 mb-1 rounded"
        >Low</v-list-item
      >
      <v-list-item
        :active="priority == 'medium'"
        @click="emits('update:priority', 'medium')"
        density="compact"
        prepend-icon="mdi-circle-medium"
        color="warning"
        class="px-5 text-caption pr-10 w-100 mb-1 rounded"
        >Medium</v-list-item
      >
      <v-list-item
        :active="priority == 'high'"
        @click="emits('update:priority', 'high')"
        density="compact"
        prepend-icon="mdi-circle"
        color="error"
        class="px-5 text-caption pr-10 w-100 mb-1 rounded"
        >High</v-list-item
      >
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
defineProps<{ priority: string}>();
const emits = defineEmits(['update:priority'])
</script>

<style scoped></style>
