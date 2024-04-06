<template>
    <v-dialog width="550" :model-value="showDialog" @click:outside="emits('update:showDialog', false)">
        <v-card class="pa-5 pt-4 rounded-lg">
            <h3 class="d-flex align-center">
                Manage Roles
                <v-spacer></v-spacer>
                <v-btn flat size="small" icon="mdi-close" @click="emits('update:showDialog', false)"></v-btn>
            </h3>
            <div>
                <v-text-field v-model="filter.search" density="comfortable" label="Enter person email address" class="mt-2" single-line variant="outlined" hide-details>
                    <template #append>
                        <v-select v-model="filter.role" density="comfortable" single-line variant="outlined" class="w-50" hide-details :items="['all', 'admin', 'member']"></v-select>
                    </template>
                </v-text-field>
            </div>
            <v-list style="overflow: auto;height: 300px;">
                <project-member-list-item :members="filteredMembers" disabled key="'owner'" :member="
                    //@ts-ignore
                    owner"></project-member-list-item>
                <project-member-list-item :members="filteredMembers" v-if="current?._id != owner?._id" disabled key="current" :member="
                    //@ts-ignore
                    current"></project-member-list-item>
                <project-member-list-item :members="filteredMembers" v-model:members="members" v-for="member in filteredMembers" :key="member._id" :member="member"></project-member-list-item>
            </v-list>
            <div class="mt-5">
                <v-btn @click="changeRoles" prepend-icon="mdi-account-cog" variant="elevated" class="text-capitalize" flat color="primary" :disabled="!isDirty" :loading="loading">Update Roles</v-btn>
                <v-btn class="text-capitalize ml-2" flat @click="emits('update:showDialog', false)">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{project: ProjectType, showDialog: boolean}>()
const emits = defineEmits(['update:showDialog'])
const filter = reactive({
    search: '',
    role: 'all',
})
const {user} = storeToRefs(useUserStore())
const members = ref(props.project.members.filter(item => item.role != 'owner'))
const isDirty = computed(() => JSON.stringify(props.project.members.filter(item => item.role != 'owner')) != JSON.stringify(members.value))
const filteredMembers = computed(() => members.value.filter((member) => member.user.email.includes(filter.search) && (filter.role == 'all' ||member.role == filter.role) && member.user._id != user.value?._id)
)
const owner = computed(() => props.project.members.find(item => item.role == 'owner'))
const current = computed(() => props.project.members.find(item => item.user._id == user.value?._id))
const $project = useProjectStore()
const loading = ref(false) 
function changeRoles(){
    loading.value = true;
    //@ts-ignore
    $project.updateRoles(props.project._id, members.value).then(() => {
        loading.value = false;
        emits('update:showDialog', false)
    })
}


watch(() => props.project.members.length, () => {
    members.value = props.project.members.filter(item => item.role != 'owner')
})
</script>

<style scoped></style>