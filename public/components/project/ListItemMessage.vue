<template>
    <div class="pa-5 py-1 pb-0" v-if="message.from._id == user?._id">
        <v-hover v-slot="{ props, isHovering }">
            <div class="d-flex align-end justify-end" v-bind="props">
                <div class="d-flex align-center">
                    <div style="width: 60px;" class="h-100 d-flex align-center pa-2">
                        <v-menu v-model="showMenu" transition="none" no-click-animation style="z-index: 500000;">
                            <template #activator="{ props, isActive }">
                                <v-btn v-bind="props" style="position: absolute;" @click="showMenu" size="x-small"
                                    v-if="isHovering || isActive" icon="mdi-dots-horizontal"></v-btn>
                            </template>
                            <v-list>
                                <v-list-item class="text-caption rounded-lg" density="compact"
                                    @click="unsent" v-if="!message.unsent">unsent</v-list-item>
                                <v-list-item class="text-caption rounded-lg" density="compact"
                                    @click="remove">Remove</v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div class="d-flex w-100 flex-column align-end">
                        <v-card flat class="pa-3 py-2 rounded-lg text-subtitle-2 font-weight-regular" color="primary"
                            style="border-bottom-right-radius: 0px !important;" v-if="!message.unsent">
                            {{ message.text }}
                        </v-card>
                        <v-card flat class="pa-3 py-2 rounded-lg text-subtitle-2 font-weight-regular border" color="background"
                            style="border-bottom-right-radius: 0px !important;" v-else>
                            unsent message
                        </v-card>
                    </div>
                </div>
                <!-- <v-icon color="primary" size="15" class="ml-1">mdi-check-circle-outline</v-icon> -->
                <!-- <v-icon color="primary" size="13">mdi-check-circle</v-icon>
                            <v-icon color="primary" size="13">mdi-circle-outline</v-icon> -->
            </div>
        </v-hover>
    </div>
    <div class="pa-5" v-else>
        <v-hover v-slot="{ props, isHovering }">
            <div class="d-flex align-end" v-bind="props">
                <v-avatar class="border mb-n1" size="30">
                    <v-img :src="'https://source.unsplash.com/random/35x35/?person&' + message.from._id"></v-img>
                </v-avatar>
                <div class="d-flex flex-column">
                    <span class="text-caption text-grey-darken-2 font-weight-regular mb-1 px-2">{{
        message.from.name.split(' ')[0] }}</span>
                    <div class="d-flex align-center">
                        <v-card class="ml-2 pa-3 py-2 rounded-lg text-subtitle-2 font-weight-regular" flat
                            style="border-bottom-left-radius: 0px !important;" variant="tonal" v-if="!message.unsent">
                            {{ message.text }}
                        </v-card>
                        <v-card class="ml-2 pa-3 py-2 rounded-lg text-subtitle-2 border font-weight-regular" flat
                            style="border-bottom-left-radius: 0px !important;" v-else>
                            unsent message
                        </v-card>
                        <div style="width: 60px;" class="h-100 d-flex align-center pa-2">
                            <v-menu v-model="showMenu" transition="none" no-click-animation style="z-index: 500000;">
                                <template #activator="{ props, isActive }">
                                    <v-btn v-bind="props" style="position: absolute;" @click="showMenu" size="x-small"
                                        v-if="isHovering || isActive" icon="mdi-dots-horizontal"></v-btn>
                                </template>
                                <v-list>
                                    <v-list-item class="text-caption rounded-lg" density="compact"
                                        @click="remove">Remove</v-list-item>
                                </v-list>
                            </v-menu>
                        </div>
                    </div>
                </div>
            </div>
        </v-hover>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ message: MessageType }>()
const { user } = storeToRefs(useUserStore())
const $project = useProjectStore()
const showMenu = ref(false)

function remove() {
    $project.removeMessage(props.message.project, props.message._id)
}

function unsent() {
    $project.unsentMessage(props.message.project, props.message._id)
}
</script>

<style scoped></style>