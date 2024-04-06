<template>
    <v-list class="pa-0 bg-transparent" v-if="projects.length > 0">
        <project-list-item  v-for="project in projects" :key="project.title"  :project="project"></project-list-item>
    </v-list>
    <div v-else class="pt-15 px-4 mt-15 d-flex flex-column align-center">
        <h3 class="text-center">Create your project</h3>
        <p class="text-caption font-weight-regular text-center">
            To create a project for tasks, analyze needs, plan, involve stakeholders, form a team, monitor progress.
        </p>
        <v-btn class="mt-5 text-capitalize" prepend-icon="mdi-plus" variant="outlined" @click="$project.store">Create new project</v-btn>
    </div>
</template>

<script setup lang="ts">
import { useProjectStore } from '~/stores/project';

const $project = useProjectStore()
const {projects, project: projectStore} = storeToRefs($project)
const router = useRouter()
const route = useRoute()
await $project.getAll().then(() => {
    if(projectStore.value && !route.params.project){
        router.push({name: 'r-access-projects-project', params: {project: projectStore.value._id}})
    }
})
</script>

<style scoped>

</style>