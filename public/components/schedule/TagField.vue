<template>
    <div class="d-flex flex-wrap">
        <div v-for="tag in selectedTags" :key="tag._id"  style="position: relative;">
            <v-chip variant="flat" class="text-capitalize mb-3 rounded mr-2" :color="tag.color">{{ tag.label }}</v-chip>
            <v-btn variant="plain" size="18" class="rounded-circle bg-white" style="position: absolute;top: -5px;right: -.5px;z-index: 200px;" @click="removeTag(tag._id)">
                <v-icon size="12">mdi-close</v-icon>
            </v-btn>
        </div>
        <v-menu v-model="menu" :no-click-animation="true" :close-on-content-click="false" persistent>
            <template #activator="{ props }">
                <v-chip v-bind="props" class="text-capitalize mb-3 rounded" prepend-icon="mdi-plus" variant="outlined">Tag</v-chip>
            </template>
            <v-card class="rounded-lg" width="300">
                <v-list class="pa-5" v-if="filterTags.length > 0">
                    <v-text-field class="mb-2" label="Search tags..." prepend-inner-icon="mdi-magnify" hide-details single-line density="compact" variant="solo-filled" flat></v-text-field>
                    <v-list-item @click="emits('update:tags', [...tags, tag._id])" class="px-5 text-caption rounded-lg mb-1 font-weight-light w-100" v-for="tag in filterTags" :key="tag._id">
                        <template #prepend>
                            <v-icon :color="tag.color">mdi-square</v-icon>
                        </template>
                        {{ tag.label }}
                    </v-list-item>
                </v-list>
                <v-list v-else>
                    <v-list-item class="text-center font-weight-regular text-caption">No tags available</v-list-item>
                </v-list>
                <v-btn icon="mdi-close" flat size="x-small" style="position: absolute;top: 5px; right: 5px;" @click="menu = false"></v-btn>
            </v-card>
        </v-menu>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{tags: string[]}>()
const emits = defineEmits(['update:tags'])
const { tags: _tags } = storeToRefs(useTagStore())
const filterTags = computed(() => _tags.value?.filter(item => !props.tags.some(tag => tag == item._id )) || [])
const selectedTags = computed(() => _tags.value?.filter(item => props.tags.some(tag => tag == item._id )) || [])
const menu = ref(false)
function removeTag(id: string) {
    emits('update:tags', props.tags.filter(item => item != id))
}
</script>

<style scoped></style>