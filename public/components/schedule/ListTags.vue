<template>
    <v-list-item title="My Tags" :append-icon="showListTags ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        class="pa-3 px-5 ma-0 w-100 border-b" @click="showListTags = !showListTags">
    </v-list-item>
    <v-list class="w-100" v-if="showListTags">
        <div v-if="tags.length > 0">
            <v-hover v-for="tag in tags" :key="tag.label" v-slot="{ props, isHovering }">
                <v-list-item class="px-5 text-subtitle-2 border-b font-weight-regular w-100" :active="isHovering"
                    v-bind="props">
                    <template #prepend>
                        <v-icon :color="tag.color">mdi-square</v-icon>
                    </template>
                    {{ tag.label }}
                    <template #append>
                        <div v-if="isHovering" style="position: absolute;right: 15px;">
                            <!-- <v-btn size="x-small" icon="mdi-trash-can-outline" color=""></v-btn> -->
                            <v-btn size="x-small" variant="tonal" icon="mdi-trash-can-outline" color="error" @click="$tag.destroy(tag._id)"></v-btn>
                        </div>
                    </template>
                </v-list-item>
            </v-hover>
        </div>
        <div v-else class="text-center" style="opacity: .7;">
            No tags available
        </div>
    </v-list>
    <div class="pa-2">
        <v-text-field density="compact" @focus="focus = true" @blur="focus = false" flat prepend-inner-icon="mdi-tag-plus" :variant="focus ? 'outlined' : 'solo'"  label="Add tag"
        single-line @keyup.enter="create" v-model="text" ref="textField"></v-text-field>
    </div>
</template>

<script setup lang="ts">
const $tag = useTagStore()
const { tags } = storeToRefs($tag)
const showListTags = ref(true)
const text = ref('')
const focus = ref(false)
const textField = ref()
async function create(){
    if(!text.value) return
    await $tag.create(text.value)
    text.value = ''
    textField.value.blur()
}

</script>

<style scoped></style>