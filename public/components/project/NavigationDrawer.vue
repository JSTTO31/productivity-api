<template>
    <v-navigation-drawer  :model-value="showNavigation" class="border-e" style="z-index: 50 !important;" floating width="280">
        <v-layout class="h-100">
            <v-app-bar density="compact" class="border-b ml-0 pl-2" flat>
                <v-text-field label="Search..." variant="solo-filled" flat hide-details single-line density="compact" prepend-inner-icon="mdi-filter-variant"></v-text-field>
                <v-menu>
                    <template #activator="{props}">
                        <v-btn icon="mdi-plus" v-bind="props" size="small" class="ml-2" rounded flat color="primary" variant="elevated" @click="showCreateProjectDialog = true"></v-btn>
                    </template>
                    <v-card class="rounded-lg pa-2">
                        <v-list>
                            <v-list-item @click="$project.store" density="compact" class="rounded-lg mb-2 text-subtitle-2 text-caption text-left font-weight-regular">
                                <v-icon class="mb-1 mr-2">mdi-plus</v-icon>New project</v-list-item>
                            <v-divider class="my-2"></v-divider>
                            <v-list-item density="compact" class="rounded-lg mb-2 text-caption text-center font-weight-regular">Sorry no templates available</v-list-item>
                        </v-list>
                    </v-card>
                </v-menu>
            </v-app-bar>
            <v-main style="overflow: auto;" id="project-list">
                <suspense>
                    <project-list-container></project-list-container>
                    <template #fallback>
                        <v-skeleton-loader loading type="heading" v-for="n in 8"></v-skeleton-loader>
                    </template>
                </suspense>
            </v-main>
        </v-layout>
    </v-navigation-drawer>

</template>

<script setup lang="ts">
import { useProjectStore } from '~/stores/project';
const props = defineProps(['showNavigation'])
const showCreateProjectDialog = ref(true)
const $project = useProjectStore()
</script>

<style scoped>
#project-list::-webkit-scrollbar{
    width: 8px;
}

#project-list::-webkit-scrollbar-thumb{
    border-radius: 25px;
}

#project-list:hover::-webkit-scrollbar-thumb{
    background-color: rgba(0, 0, 0, 0.192);

}

#loading-list-container{
    animation: blinking 2s ease 0s infinite normal forwards;
}


</style>