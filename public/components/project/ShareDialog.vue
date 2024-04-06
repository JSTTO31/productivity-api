<template>
    <v-dialog width="550" :model-value="showDialog" @click:outside="emits('update:showDialog', false)" >
        <v-card class="pa-5 pt-4 rounded-lg" :disabled="loadingSubmit">
            <h3 class="d-flex align-center">
                Share Project Access
                <v-spacer></v-spacer>
                <v-btn flat size="small" icon="mdi-close" @click="emits('update:showDialog', false)"></v-btn>
            </h3>
            <div class=" mt-1">
                <label class="text-subtitle-2" for="">Person email adress</label>
                <div class="text-center">
                    <v-menu offset-y :open-on-focus="true" v-model="showMenu">
                        <template #activator="{props}">
                                <v-text-field v-bind="props" @focus="showMenu = true" @keyup="($event: any) => onChange($event.target.value)"  density="compact" label="Enter person email address" class="mt-2" single-line variant="outlined" hide-details>
                                    <template #append>
                                        <v-select density="compact" single-line variant="outlined" class="w-50" hide-details v-model="role" :items="['admin', 'member']"></v-select>
                                    </template>
                                </v-text-field>
                        </template>
                            <v-list v-if="users.length < 1 || loading">
                                <v-list-item class="text-center" v-if="users.length < 1 && !loading">
                                    No Results
                                </v-list-item>
                                <v-list-item v-else-if="loading" class="d-flex align-center justify-center py-10">
                                    <v-progress-circular indeterminate color="primary" size="35" ></v-progress-circular>
                                </v-list-item>
                            </v-list>
                            <v-list v-else style="overflow-y: auto;" class="pa-2">
                                <v-list-item :active="members.some(item => item.email == user.email)" class="py-2 rounded-lg mb-1" :prepend-avatar="user.picture" v-for="user in users" :key="user.email" :title="user.email" :subtitle="user.name" @click="toggleMember({email: user.email, name: user.name, role: 'member'})"></v-list-item>
                                
                            </v-list>
                    </v-menu>
                </div>
                <v-list>
                    <v-list-item class="py-2 px-0 rounded mb-1 border-b"  :prepend-avatar="'https://source.unsplash.com/random/35x35/?person&' + member.email" v-for="member in members" :key="member.email" :title="member.email" :subtitle="member.name">
                        <template #append>
                            <div class="d-flex align-center">
                                <v-icon class="mr-2" @click="toggleMember(member)">mdi-close</v-icon>
                                <v-select density="compact" single-line variant="outlined" class="w-50" hide-details v-model="member.role" :items="['admin', 'member']"></v-select>
                            </div>
                        </template>
                    </v-list-item>
                </v-list>
            </div>
            <div class="mt-5">
                <v-btn prepend-icon="mdi-share" variant="elevated" @click="share" :loading="loadingSubmit" class="text-capitalize" flat color="primary" :disabled="members.length < 1">Share access</v-btn>
                <v-btn class="text-capitalize ml-2" flat @click="emits('update:showDialog', false)">Cancel</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
const props = defineProps<{showDialog: boolean, project: ProjectType}>()
const emits = defineEmits(['update:showDialog'])
type UserType = {_id: number, email: string, name: string, picture: string}
type MemberType = {email: string, name: string, role: 'member' | 'admin'}
const $user = useUserStore()
//@ts-ignore
const users = ref<UserType[]>([])
const members = ref<MemberType[]>([])
const loading = ref(false)
const loadingSubmit = ref(false)
const showMenu = ref(false)
const role = ref<"member" | 'admin'>("member")
const $project = useProjectStore()


function onChange(value: string){
    loading.value = true
    $project.findMembers(props.project._id, value).then(({data}) => {
        if(data.value){
            //@ts-ignore
            users.value = data.value?.users || []
        }
        
        loading.value = false
    })
}

function share(){
    loadingSubmit.value = true;
    $project.addMembers(props.project._id, members.value).then(() => {
        loadingSubmit.value = false
        members.value = []
        users.value = []
        emits('update:showDialog', false)
    })
}


async function toggleMember(member: MemberType){
    const index = members.value.findIndex(item => item.email == member.email)
    if(index > -1){
        members.value.splice(index, 1)    
    }else{
        members.value.push({email: member.email, name: member.name, role: role.value})
    }
}



</script>

<style scoped>

</style>