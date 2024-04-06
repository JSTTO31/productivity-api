<template>
    <v-card class="h-100 d-flex flex-column">
        <v-card-text class="pt-5">
            <div style="gap: 5px;" class="w-100">
                <h4 class="text-capitalize font-weight-regular mb-2">Task name</h4>
                <v-text-field v-model="task.title" density="compact" variant="solo-filled" flat class="w-100"
                    placeholder="What is your task?" />
            </div>
            <div style="gap: 5px;" class="w-75">
                <h4 class="text-capitalize font-weight-regular mb-2">Assignees</h4>
                <div class="d-flex">
                    <v-menu :close-on-content-click="false">
                        <template #activator="{ props }">
                            <v-list-item v-bind="props" variant="tonal" class="rounded w-100 pa-1"
                                append-icon="mdi-chevron-down" density="compact"
                                prepend-avatar="https://source.unsplash.com/random/50x50/?person" v-if="findFirstAssignee">{{findFirstAssignee.user.name}}</v-list-item>
                            <v-list-item v-bind="props" variant="tonal" class="rounded w-100 pa-1 py-2"
                            append-icon="mdi-chevron-down" density="compact"
                            prepend-icon="mdi-account" v-else>Assignees</v-list-item>
                        </template>
                        <v-list v-if="project" class="rounded mt-2 pa-0">
                            <v-list-item @click="
                                //@ts-ignore
                                toggleAssignee(member.user._id)" :active="task.assignees.some(item => item == member.user._id)" color="primary"
                                prepend-avatar="https://source.unsplash.com/random/50x50/?person"
                                class="text-capitalize text-caption py-2 border-b font-weight-regular" density="compact"
                                v-for="member in project.members" :key="member._id">{{ member.user.name }}</v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </div>
            <div style="gap: 5px;" class="mt-5 w-75">
                <h4 class="font-weight-regular mb-2">Due Date</h4>
                <v-text-field v-model="task.dueDate" min="5" prepend-inner-icon="mdi-calendar" variant="solo-filled" flat density="compact" type="date"></v-text-field>

            </div>
            <div style="gap: 5px;">
                <h4 class="font-weight-regular mb-2">Priority</h4>
                <div class="d-flex w-75">
                    <project-priority-chip v-model:priority="task.priority" /> 
                </div>
            </div>
            <div style="gap: 5px;" class="mt-5">
                <h4 class="font-weight-regular mb-2">Description</h4>
                <v-textarea v-model="task.description" rows="3" no-resize class="mt-2" single-line variant="solo-filled" flat density="comfortable"
                    label="What is the details?"></v-textarea>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-btn class="text-capitalize" variant="elevated" color="primary" flat @click="save">Save</v-btn>
            <v-btn class="text-capitalize" flat @click="emits('close')">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{section: SectionType}>()
const emits = defineEmits(['close'])
const { project } = storeToRefs(useProjectStore())
const {user} = storeToRefs(useUserStore())
const task = reactive({
    title: 'New Task',
    description: '',
    dueDate: new Date().toISOString().substring(0, 10),
    priority: 'low',
    //@ts-ignore
    assignees: [user.value._id] as string[],
})
const toggleAssignee = (value: string) => {
    const index = task.assignees.findIndex((item: string) => item == value)
    
    if(index == -1){
        task.assignees.push(value)
    }else{
        task.assignees.splice(index, 1)
    }
}

const findFirstAssignee = computed(() => project.value?.members.find(item => item.user._id == task.assignees[0]) || null)

const save = () => {
    if(project.value){
        const section = project.value.sections.find(item => (item._id && item._id == props.section._id) || (item.tempId && item.tempId == props.section.tempId))
        if(section){
            const watchBy = [...task.assignees.filter(item => item != user.value?._id), user.value?._id]
            //@ts-ignore
            section.tasks = section.tasks ? [...section.tasks, {...task, tempId: useTempID(8), watchBy, notes: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()}] : section.tasks
        }
        emits('close')
    }
}
</script>

<style scoped></style> 