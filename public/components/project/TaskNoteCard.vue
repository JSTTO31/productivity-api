<template>
    <div>
        <div class="d-flex align-center">
            <div class="d-flex  align-center">
                <span class="text-subtitle-2 text-capitalize font-weight-regular">{{ note.from.name }}</span>
            </div>
            <v-spacer></v-spacer>
            <span class="text-caption mr-2 font-weight-bold" v-if="note.createdAt">{{ timeAgo }}</span>
            <v-menu v-if="note.from._id == user?._id" location="bottom end">
                <template #activator="{ props }">
                    <v-btn v-bind="props" icon="mdi-dots-horizontal" size="x-small" variant="text"></v-btn>
                </template>
                <v-list>
                    <v-list-item density="compact" @click="removeNote" prepend-icon="mdi-trash-can-outline" class="text-error text-caption">Delete</v-list-item>
                </v-list>
            </v-menu>
        </div>
        <v-card variant="tonal" class="mb-4 border">
            <v-card-text>
                <p class="">
                    {{ note.text }}</p>
            </v-card-text>
        </v-card>
    </div>
</template>

<script setup lang="ts">
import type { NoteType, TaskType } from '~/stores/project';
const {user} = storeToRefs(useUserStore())
const props = defineProps<{ note: NoteType, task: TaskType }>()
//@ts-ignore
let timeAgo = useTimeAgo(new Date(props.note.createdAt))
function removeNote(){
    props.task.notes = props.task.notes.filter(item => (item._id && item._id != props.note._id ) || (item.tempId && item.tempId != props.note.tempId))
    
}
</script>

<style scoped></style>