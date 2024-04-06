<template>
   <v-list-item class="pa-3 rounded-0 mb-2 border-b" :prepend-avatar="member.user.picture" :title="member.user.email.toString()" :subtitle="member.user.name.toString()">
        <template #append>
            <v-select density="compact" hide-details single-line variant="plain" v-model="role" :items="['admin', 'member']"></v-select>
        </template>
    </v-list-item>
</template>

<script setup lang="ts">
const props = defineProps<{member: MemberType, members: MemberType[]}>()
const role = ref(props.member.role)
const emits = defineEmits(['update:members'])
watch(role, (current) => {
    emits('update:members', props.members.map(item => item._id == props.member._id ? {...item, role: current} : item))
})
</script>

<style scoped>

</style>