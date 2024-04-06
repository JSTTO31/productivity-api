<template>
    <v-navigation-drawer v-if="project" style="z-index: 6000" class="d-flex justify-end" width="400"
        contained transition="slide-x-reverse-transition" location="right" v-model="showChatbox" permanent>
        <suspense>
            <project-team-chat-box :project="project" @close="showChatbox = false"></project-team-chat-box>
            <template #fallback>
                <v-layout class="h-100 w-100 bg-surface">
                    <v-main>
                        <v-skeleton-loader type="table-tfoot"></v-skeleton-loader>
                        <div>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                            <v-skeleton-loader class="my-3" type="list-item-avatar-three-line"></v-skeleton-loader>
                        </div>
                    </v-main>
                </v-layout>
            </template>
        </suspense>
    </v-navigation-drawer>
    <v-app-bar class="d-flex align-center text-white" density="compact" :model-value="!!project"
        style="background-color: rgba(0,0,0,.5);z-index: 50 !important;position: absolute" flat>
        <v-app-bar-nav-icon @click.stop="showNavigation = !showNavigation" class="rounded-0"></v-app-bar-nav-icon>
        <v-app-bar-title v-if="project" class="font-weight-bold d-flex ml-2 align-center">
            <input class="text-white px-2 rounded" style="outline-color: white" v-model="project.title" />
        </v-app-bar-title>
        <!-- <v-btn active size="small" variant="flat" class="ml-2 text-capitalize">Tasks</v-btn>
            <v-btn size="small" variant="tonal" class="ml-2 text-capitalize">Timeline</v-btn>
            <v-divider vertical inset class="ml-2"></v-divider> -->
        <!-- <v-btn prepend-icon="mdi-plus" size="small" color="primary"  variant="flat" class="ml-2 text-capitalize">Create </v-btn>   -->
        <v-chip class="rounded" v-if="loading" variant="text">
            Saving
            <template #prepend>
                <v-progress-circular class="mr-2" size="15" width="2" indeterminate></v-progress-circular>
            </template>
        </v-chip>
        <v-chip class="rounded" v-else variant="text" prepend-icon="mdi-database">Saved</v-chip>
        <v-btn size="small" variant="tonal" @click="sectionSort = null" class="ml-2 text-capitalize rounded" prepend-icon="mdi-sort" v-if="sectionSort == 'desc'">Sort</v-btn>
        <v-btn size="small" variant="tonal" @click="sectionSort = 'asc'" class="ml-2 text-capitalize rounded" prepend-icon="mdi-sort-ascending" v-else-if="sectionSort == null">Sort</v-btn>
        <v-btn size="small" variant="tonal" @click="sectionSort = 'desc'" class="ml-2 text-capitalize rounded" prepend-icon="mdi-sort-descending" v-else>Sort</v-btn>
        <v-menu :close-on-content-click="false">
            <template #activator="{props}">
                <v-btn v-bind="props" size="small" variant="tonal" class="ml-2 text-capitalize rounded" prepend-icon="mdi-filter-outline" append-icon="mdi-chevron-down">filter</v-btn>
            </template>
            <v-card width="400" class="pa-5 mt-2 rounded-lg">
                <v-text-field v-model="sectionFilter.search" single-line label="Search task..." prepend-inner-icon="mdi-magnify" hide-details density="compact" variant="outlined"></v-text-field>
                <div class="mt-5">
                    <label for="" class="text-subtitle-2">Priority options</label>
                    <div class="d-flex">      
                        <v-checkbox color="primary" v-model="sectionFilter.priority" hide-details v-for="priority in priorities" :value="priority.value" :key="priority.label" :label="priority.label" ></v-checkbox>
                    </div>
                </div>
                <div class="mt-2">
                    <label for="" class="text-subtitle-2">Watch options</label>
                    <div class="d-flex">      
                        <v-checkbox color="primary" hide-details v-model="sectionFilter.watch" v-for="watch in watches" :key="watch.label" :label="watch.label" :value="watch.value"></v-checkbox>
                    </div>
                </div>
                <div class="mt-2">
                    <label for="" class="text-subtitle-2">Complete options</label>
                    <div class="d-flex">     
                        <v-checkbox color="primary" v-model="sectionFilter.complete" hide-details v-for="complete in completes" :key="complete.label" :label="complete.label" :value="complete.value"></v-checkbox>
                    </div>
                </div>
                <div class="mt-2">
                    <label for="" class="text-subtitle-2">Sections</label>
                    <div class="d-flex flex-wrap" v-if="project">      
                        <v-checkbox color="primary" v-model="sectionFilter.sections" hide-details v-for="section in project.sections" :key="section._id || section.tempId" :label="section.title" :value="section._id || section.tempId"></v-checkbox>
                    </div>
                </div>
            </v-card>
        </v-menu>
        <!-- <v-card class=" ml-2" variant="tonal">
            <v-btn size="small" class="rounded">
                <v-icon style="transform: rotate(90deg);">mdi-poll</v-icon>
            </v-btn>
            <v-btn size="small" class="rounded" variant="tonal" flat>
                <v-icon style="transform: rotate(180deg);">mdi-view-dashboard</v-icon>
            </v-btn>
        </v-card> -->
        <div class="d-flex mr-6 ml-2">
            <v-menu open-on-hover>
                <template #activator="{ props }">
                    <div style="cursor: pointer;" class="d-flex align-center" v-bind="props">
                        <v-card v-for="member, n in project?.members" :key="member._id" class="rounded-circle mr-n4">
                            <v-avatar class="border" size="30">
                                <v-img
                                    :src="member.user.picture"></v-img>
                            </v-avatar>
                        </v-card>
                    </div>
                </template>
                <v-card width="350" class="rounded" v-if="project">
                    <v-list v-if="project.members" class="pa-0">
                        <h4 class="mt-2 px-2 font-weight-medium">Member list</h4>
                        <v-divider class="my-2"></v-divider>
                        <v-list-item class="pa-2 pr-5 rounde-lg text-caption mb-2" v-for="member in project.members"
                            :key="member._id"
                            :prepend-avatar="member.user.picture"
                            :append-icon="member.role == 'owner' ? 'mdi-account-tie' : member.role == 'admin' ? 'mdi-account-key' : 'mdi-account'">
                            <template #title>{{ member.user.name }}</template>
                            <!-- <template #subtitle>{{ member.user.email }}</template> -->
                            <template #append>
                                <v-chip color="purple" size="small" style="width: 80px;" prepend-icon="mdi-account-tie"
                                    class="rounded text-center" v-if="member.role == 'owner'">Owner</v-chip>
                                <v-chip color="blue" size="small" style="width: 80px;" prepend-icon="mdi-account-key"
                                    class="rounded text-center" v-else-if="member.role == 'admin'">Admin</v-chip>
                                <v-chip size="small" style="width: 80px;" prepend-icon="mdi-account"
                                    class="rounded text-center" v-else>Member</v-chip>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
            <v-card v-if="role != 'member'" @click="showShareDialog = true" class="rounded-circle mr-n5" color="primary"
                variant="elevated">
                <v-avatar class="border" size="30" style="border: 1px solid rgba(var(--v-theme-primary))">
                    <v-icon size="17">mdi-plus</v-icon>
                </v-avatar>
            </v-card>
        </div>
        <v-divider vertical class="mx-2" inset></v-divider>
        <v-tooltip text="Discussion">
            <template #activator="{ props }">
                <v-btn v-bind="props" variant="text" icon="mdi-forum" class="rounded-lg" size="small"
                    @click="showChatbox = !showChatbox"></v-btn>
            </template>
        </v-tooltip>
    </v-app-bar>
    <div v-if="project">
        <ProjectShareDialog v-model:show-dialog="showShareDialog" :project="project"></ProjectShareDialog>
    </div>
</template>

<script setup lang="ts">
const showShareDialog = ref(false)
const showNavigation = inject('showProjectsNavigation')
const showChatbox = ref(false)
const {priorities, watches, completes} = useSectionFilterObjects
const { user } = storeToRefs(useUserStore())
const { project, sectionSort, sectionFilter } = storeToRefs(useProjectStore())
const $project = useProjectStore()
const { loading } = inject('saving') as { loading: boolean }
const role = computed(() => !project.value ? null : project.value.members.find(item => item.user._id == user.value?._id)?.role)

</script>

<style scoped>
.my-menu {
  margin-top: 40px;
  contain: initial;
  overflow: visible;
}
.my-menu::before {
  position: absolute;
  content: "";
  top: 0;
  right: 10px;
  transform: translateY(-100%);
  width: 10px; 
  height: 13px; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 13px solid #fff;
}
</style>