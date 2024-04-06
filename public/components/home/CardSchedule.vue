<template>
   <v-card class="h-100 bg-surface rounded-lg d-flex flex-column pa-2" flat>
        <v-card-title class="d-flex align-center">
            Weekly pinned 
        </v-card-title>
        <v-card-text>
            <v-alert icon="mdi-calendar" closable density="compact" class="mb-3 py-4  rounded-lg"  v-for="schedule in schedules">
                <h4 class="font-weight-medium">{{ schedule.title }}</h4>
                <h5 class="font-weight-regular"><span cas>{{ new Date(schedule.date).toDateString() }}</span> {{ schedule.startTime }} - {{ schedule.endTime }}</h5>
                <v-chip color="red" class="pa-2 my-2" variant="flat" density="comfortable" size="x-small" f>Work</v-chip>
                <p class="text-caption">
                    {{ schedule.description }}
                </p>
            </v-alert>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
let schedules = [
    {
        id: 1,
        title: 'Team Meeting',
        description: 'Weekly team meeting to discuss project updates and priorities.',
        date: '2024-02-10',
        startTime: '09:00 AM',
        endTime: '10:00 AM',
        location: 'Conference Room A',
        participants: ['John', 'Jane', 'Michael', 'Emily'],
        reminder: '30 minutes before',
        status: 'Scheduled'
    },
    {
        id: 2,
        title: 'Client Presentation',
        description: 'Presentation to potential client about our services and offerings.',
        date: '2024-02-15',
        startTime: '02:00 PM',
        endTime: '03:30 PM',
        location: 'Virtual Meeting',
        participants: ['Alex', 'Sophia', 'David'],
        reminder: '1 hour before',
        status: 'Scheduled'
    },
    {
        id: 3,
        title: 'Dentist Appointment',
        description: 'Routine dental check-up and cleaning.',
        date: '2024-02-28',
        startTime: '11:00 AM',
        endTime: '12:00 PM',
        location: 'Dental Clinic',
        participants: ['Mary'],
        reminder: '1 day before',
        status: 'Scheduled'
    }
];
</script>

<style scoped>

</style>