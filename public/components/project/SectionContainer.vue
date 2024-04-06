<template>
    <v-card class="w-100 h-100 rounded-0" color="transparent" v-if="project">
        <v-container class="pa-0 h-100 d-flex w-100" fluid
            style="background-color: rgba(0,0,0,.2);overflow-x: auto;overflow-y: hidden;" id="sections-container">
            <v-col cols="3" xl="2" class="pa-0 rounded-0 h-100 section-parent" style="position: relative"
                v-for="section, index  in filteredSections" :key="section._id || section.tempId"
                :data-parent-order="index">
                <project-section-card :key="section._id || section.tempId" :section="section"
                    :data-section-order="index.toString()"></project-section-card>
            </v-col>
            <v-col cols="3" xl="2" class="pa-0 rounded-0 w-100 h-100" style="transition: .5s;">
                <v-card flat class="rounded-0 h-100 d-flex align-center justify-center pa-3" @click="addNewSection"
                    style="background-color: rgba(0,0,0,.2)">
                    <h4 class="text-center py-2 justify-center d-flex align-center text-white">
                        <v-icon class="mr-2">mdi-plus</v-icon>
                        New Section
                    </h4>
                </v-card>
            </v-col>
        </v-container>
    </v-card>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import useTempID from '~/composables/useTempID';
const { project, sectionFilter } = storeToRefs(useProjectStore())
const $project = useProjectStore()
const selectedTask = ref<TaskType | null>(null);
const selectedSection = ref<SectionType | null>(null)
const filteredSections = computed(() => 
    project.value?.sections.filter(section => sectionFilter.value.sections.some(item => item == section._id || item == section.tempId)) || []
) 
function addNewSection() {
    if (project.value) {
        const tempId = useTempID(8)
        sectionFilter.value.sections.push(tempId)
        project.value.sections.push({ tempId, title: "New Section", tasks: [], order: project.value.sections.length })
    }
}
let delay: NodeJS.Timeout | null = null
const { loading, updateLoading } = inject('saving') as { loading: boolean, updateLoading: Function }
watch(() => [
    project.value
], () => {
    updateLoading(true)
    if (delay) {
        clearTimeout(delay)
    }

    delay = setTimeout(() => {
        $project.update().finally(() => {
            updateLoading(false)
        })
    }, 500);


}, { deep: true, immediate: false })


const route = useRoute()

function setTask(route: RouteLocationNormalizedLoaded){
    if (route.query.task && route.query.section && project.value) {
        const findSection = project.value.sections.find(item => (item._id && item._id == route.query.section) ||
            (item.tempId && item.tempId == route.query.section))
        if(findSection){
            selectedSection.value = findSection
            const findTask = findSection.tasks.find(
                (item) =>
                    (item._id && item._id == route.query.task) ||
                    (item.tempId && item.tempId == route.query.task)
            );
            if (findTask) {
                selectedTask.value = findTask;
            }
        }
    }else{
        selectedTask.value = null
        selectedSection.value = null
    }
}

setTask(route)

onBeforeRouteUpdate((to, from, next) => {
    setTask(to)
    return next();
});

</script>

<style scoped>
#sections-container::-webkit-scrollbar {
    height: 10px;
    width: 10px;
    background-color: rgba(0, 0, 0, .2)
}

#sections-container::-webkit-scrollbar-thumb,
.task-container::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.432);
    border-radius: 25px;
}



.slide-up-enter-active,
.slide-up-leave-active {
    transition: opacity .5s, transform .35s linear;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
}
</style>