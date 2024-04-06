<template>
    <v-card  class="h-100 bg-surface rounded-lg d-flex flex-column pa-2">
        <v-card-title class="d-flex align-center">
        Daily tasks
        <v-spacer></v-spacer>
        <!-- <v-btn icon="mdi-magnify" variant="text"></v-btn> -->
        <!-- <v-icon>mdi-magnify</v-icon> -->
        <v-icon size="20">mdi-filter-outline</v-icon>
        </v-card-title>
        <v-card-text>
            <v-list class="bg-transparent">
                <v-list-item v-for="task, n in tasks" variant="tonal" class="rounded-lg mb-3 py-3" :title="task.title" :subtitle="task.description">
                    <template #prepend>
                        <v-icon class="mr-n5" v-if="n">mdi-checkbox-blank</v-icon>
                        <v-icon class="mr-n5" color="success" v-else>mdi-checkbox-marked</v-icon>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn block prepend-icon="mdi-plus-circle" class="text-capitalize">Add Task</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
// Define an array to store tasks
let tasks = [
    {
        id: 1,
        title: 'Complete homework assignment',
        description: 'Finish the math problems and submit them online.',
        priority: 'High',
        dueDate: '2024-02-10',
        status: 'In Progress',
        assignee: 'John'
    },
    {
        id: 2,
        title: 'Prepare presentation slides',
        description: 'Gather information and create slides for the upcoming meeting.',
        priority: 'Medium',
        dueDate: '2024-02-15',
        status: 'Pending',
        assignee: 'Jane'
    },
    {
        id: 3,
        title: 'Schedule dentist appointment',
        description: 'Call the dentist office and book an appointment for a check-up.',
        priority: 'Low',
        dueDate: '2024-02-28',
        status: 'Pending',
        assignee: 'Mary'
    }
];

// Logging tasks to console
console.log(tasks);

</script>

<style scoped>

</style>