<template>
     <v-card style="overflow-y: auto;"
          class="rounded-lg py-5 px-3 w-33 align-center justify-center border"
          height="400"
          flat
     >
        <v-card-text>
            <div class="d-flex align-center mb-1">
                <v-text-field prepend-inner-icon="mdi-plus" label="Add your new task..." variant="outlined"
                    hide-details density="compact" readonly
                    single-line></v-text-field>
            </div>
            <v-list class="bg-transparent mb-2">
                <v-list-item v-for="task, n in taskList" :key="n" class="rounded mb-1 "
                    :prepend-icon="n < 3 ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                    :color="n < 3 ? 'primary' : ''" active :variant="n < 3 ? 'elevated' : 'text'"
                    @click="n < 3">
                    <span :class="n < 3 ? 'text-decoration-line-through' : ''">{{ task }} </span>
                    <template #append>
                        <v-btn icon="mdi-close" size="small" variant="text"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
            <div class="d-flex align-center">
                <span v-if="pending_count">You have {{ pending_count }} pending tasks</span>
                <span v-else>You have completed your tasks</span>
                <v-spacer></v-spacer>
                <v-btn class="text-capitalize" size="small">clear all</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
const pending_count = 1
const taskList = [
  "Implement user authentication",
  "Design database schema",
  "Frontend UI development",
  "API documentation",
];
</script>

<style scoped>

</style>