<template>
    <v-list-item density="compact" :prepend-icon="'mdi-file-outline'" v-ripple="false"
        @click="$router.push({ name: 'r-access-projects-project', params: { project: project._id } })"
        class="text-caption py-0 font-weight-regular text-capitalize text-no-wrap"
        :active="project._id == $route.params.project">
        <input type="text" v-model="title" ref="textField" v-if="showRenameDialog" style="width: 98%" />
        <span v-else>{{ title }}</span>
        <template #append>
            <v-icon v-if="memberType == 'owner'">mdi-account-tie</v-icon>
            <v-icon v-else-if="memberType == 'admin'">mdi-account-key</v-icon>
            <v-icon v-else>mdi-account</v-icon>
            <v-menu>
                <template #activator="{ props }">
                    <v-btn v-bind="props" size="25" flat class="rounded ml-2 bg-transparent"
                        icon="mdi-dots-horizontal"></v-btn>
                </template>
                <v-card width="200" class="pa-2">
                    <!-- If owner -->
                    <v-list class="pa-0" v-if="memberType == 'owner'">
                        <v-list-item prepend-icon="mdi-share-outline" @click="showShareDialog = true" density="compact"
                            class="text-caption rounded mb-1">Share</v-list-item>
                        <v-list-item prepend-icon="mdi-text-short" density="compact" class="text-caption rounded mb-1"
                            @click="showRename">Rename</v-list-item>
                        <v-list-item prepend-icon="mdi-account-cog-outline" @click="showManageRoleDialog = true" density="compact"
                            class="text-caption rounded mb-1">Manage roles</v-list-item>
                        <v-list-item prepend-icon="mdi-clipboard-outline" @click="" density="compact"
                            class="text-caption rounded mb-1" disabled>Paste</v-list-item>
                        <v-list-item prepend-icon="mdi-trash-can-outline" @click="showDeleteConfirmationDialog = true" density="compact"
                            class="text-caption rounded mb-1 text-error">Delete</v-list-item>
                    </v-list>
                    <!-- If admin -->
                    <v-list class="pa-0" v-else-if="memberType == 'admin'">
                        <v-list-item prepend-icon="mdi-share-outline" @click="showShareDialog = true" density="compact"
                            class="text-caption rounded mb-1">Share</v-list-item>
                        <v-list-item prepend-icon="mdi-text-short" density="compact" class="text-caption rounded mb-1"
                            @click="showRename">Rename</v-list-item>
                        <v-list-item prepend-icon="mdi-account-cog-outline" @click="showManageRoleDialog = true" density="compact"
                            class="text-caption rounded mb-1">Manage roles</v-list-item>
                        <v-list-item variant="text" @click="$project.leave(project._id)" density="compact" class="text-caption text-error"
                            prepend-icon="mdi-logout" color="error">Leave</v-list-item>
                    </v-list>
                    <!-- If member -->
                    <v-list class="pa-0" v-else>
                        <v-list-item variant="text" @click="$project.leave(project._id)" density="compact" class="text-caption text-error"
                            prepend-icon="mdi-logout" color="error">Leave</v-list-item>
                    </v-list>
                </v-card>
            </v-menu>
        </template>
    </v-list-item>
    <project-manage-role-dialog :project="project" v-model:show-dialog="showManageRoleDialog"></project-manage-role-dialog>
    <project-share-dialog v-model:showDialog="showShareDialog" :project="project"></project-share-dialog>
    <v-dialog v-model="showDeleteConfirmationDialog" width="550">
        <v-card class="pa-5 pt-4 rounded-lg">
            <h3 class="d-flex align-center">
                Delete <span class="text-error ml-2">{{ project.title }}</span>
                <v-spacer></v-spacer>
                <v-btn flat size="small" icon="mdi-close" @click="showDeleteConfirmationDialog = false"></v-btn>
            </h3>
            <p class=" text-h6">Are you sure you want to delete this project?</p>
            <v-alert border variant="tonal" class="mt-2" type="warning" text="Warning: Deleting this project will permanently remove it from our records."></v-alert>
            <v-card-actions class="mt-5">
                <v-spacer></v-spacer>
                <v-btn class="text-capitalize mr-1" @click="showDeleteConfirmationDialog = false">Cancel</v-btn>
                <v-btn class="text-capitalize" prepend-icon="mdi-trash-can" variant="elevated" color="error" :loading="loadingDelete" @click="remove">Delete project</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { onClickOutside } from '#imports';
const { user } = storeToRefs(useUserStore())
const props = defineProps<{ project: ProjectType }>()
const $project = useProjectStore()
//@ts-ignore
const memberType = computed(() => props.project.members.find(item => (item.user?._id || item.user) == user.value?._id)?.role || 'member')
const showShareDialog = ref(false)
const showManageRoleDialog = ref(false)
const showRenameDialog = ref(false)
const showDeleteConfirmationDialog = ref(false)
const textField = ref()
const title = ref(props.project.title)
const showRename = () => {
    showRenameDialog.value = true
    setTimeout(() => {
        textField.value.select()
    }, 100);
}

const loadingDelete = ref(false)

function remove(){
    loadingDelete.value = true
    $project.remove(props.project._id).then(() => {
        loadingDelete.value = false
        showDeleteConfirmationDialog.value = false
    })
}


onClickOutside(textField, () => {
    if(showRenameDialog.value){
        showRenameDialog.value = false
        if(title.value != props.project.title){
            $project.updateById(props.project._id, {title: title.value, sections: []})
        }
    }
})
</script>

<style scoped></style>