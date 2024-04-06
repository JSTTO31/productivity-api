<template>
    <utils-card ref="el" :show-card="showSettings" title="Settings" :width="width" :height="height" icon="mdi-cog"
        key="media" @close="emits('update:showSettings', false)" @minimize="emits('update:showSettings', false)">
        <template #default="props">
            <v-layout class="h-100 pa-0" fluid>
                <v-navigation-drawer :rail="rail" width="300">
                    <v-list class="h-100" nav>
                        <v-list-item @click="selected = 0" :active="selected == 0" class="text-capitalize " prepend-icon="mdi-account-outline">
                            <span v-if="!rail">Profile
                                </span>
                        </v-list-item>
                        <v-list-item @click="selected = 1" :active="selected == 1" class="text-capitalize " prepend-icon="mdi-palette-outline">
                            <span v-if="!rail">Theme & Appearance
                                </span>
                        </v-list-item>
                        <v-list-item @click="selected = 2" :active="selected == 2" class="text-capitalize " prepend-icon="mdi-tune-vertical">
                            <span v-if="!rail">Sound setting
                                </span>
                        </v-list-item>
                        <v-list-item @click="" class="text-capitalize " prepend-icon="mdi-bell">
                            <span v-if="!rail">Notification Preferences
                                </span>
                        </v-list-item>
                        <v-list-item  @click="" class="text-capitalize " prepend-icon="mdi-lock-outline">
                            <span v-if="!rail">Privacy & Security
                                </span>
                        </v-list-item>
                    </v-list>
                </v-navigation-drawer>
                <v-main style="overflow-y: auto;" id="profile-main">
                    <v-container class="pb-15" v-if="selected == 0">
                        <v-card class="pa-5 d-flex" flat variant="tonal">
                            <div>
                                <v-card variant="text" style="border: 2px dashed rgba(var(--v-theme-primary));"
                                    height="100" width="100" class="rounded-circle d-flex align-center justify-center">
                                    <v-icon color="primary" size="50">mdi-account-outline</v-icon>
                                </v-card>
                            </div>
                            <div class="ml-5">
                                <h4>Personalize Your Photo!</h4>
                                <p class="text-subtitle-2 font-weight-regular">Hey! Remember, editing your photo helps
                                    others identify you better. Get creative!"</p>
                                <v-btn prepend-icon="mdi-upload" class="text-capitalize mt-5" color="success"
                                    size="small">Upload</v-btn>
                            </div>
                        </v-card>
                        <div class="mt-5">
                            <div class="d-flex" style="gap: 5px;">
                                <div class="w-50">
                                    <label for="">Name</label>
                                    <v-text-field density="comfortable" single-line label="Name" class="mt-1"
                                        variant="outlined"></v-text-field>
                                </div>
                                <div class="w-50">
                                    <label for="">Username</label>
                                    <v-text-field density="comfortable" single-line label="Username" class="mt-1"
                                        variant="outlined"></v-text-field>
                                </div>
                            </div>
                            <label for="">Email address</label>
                            <v-text-field density="comfortable" single-line label="Email address" class="mt-1"
                                variant="outlined"></v-text-field>
                            <label for="">School</label>
                            <v-text-field density="comfortable" single-line label="School" class="mt-1"
                                variant="outlined"></v-text-field>
                        </div>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="text-capitalize rounded-lg" color="primary" variant="elevated">Save
                                changes</v-btn>
                        </v-card-actions>
                    </v-container>
                    <v-container class="pb-15" v-else-if="selected == 1">
                        <v-card class="rounded-lg pa-0 mt-n3" flat>
                            <v-card-title class="text-subtitle-1">Color Mode</v-card-title>
                            <v-card-text>
                                <v-select hide-details variant="outlined" density="comfortable" :items="colors"
                                    item-title="label" item-value="value" class="w-50"
                                    v-model="selectedBackgroundColor"></v-select>
                            </v-card-text>
                        </v-card>
                        <v-card class="rounded-lg" flat>
                            <v-card-title class="text-subtitle-1">Background Themes</v-card-title>
                            <v-card-text>
                                <v-card class="rounded-lg pa-5 border" flat>
                                    <v-tooltip v-for="theme in themes.filter(item  => item.type == 'video')">
                                        <template #activator="{ props }">
                                            <v-avatar
                                                :style="selectedTheme.id == theme.id ? 'border: 4px solid #F5E8C7' : 'border: 1px solid #435585'"
                                                @click="selectedTheme = theme" style="cursor:pointer" v-bind="props"
                                                size="55" v-ripple :color="theme.color" class="mb-4 rounded-xl mr-3">
                                                <v-img :src="theme.icon"></v-img>
                                            </v-avatar>
                                        </template>
                                        {{ theme.label }}
                                    </v-tooltip>
                                    <v-avatar
                                        v-for="theme in themes.filter(item  => item.type == 'color')"
                                        :style="theme.backgroundColor"
                                        @click="selectedTheme = theme" style="cursor:pointer"
                                        size="55" v-ripple class="mb-4 rounded-xl mr-3">
                                        <v-img :src="theme.icon"></v-img>
                                    </v-avatar>
                                </v-card>
                            </v-card-text>
                        </v-card>
                        <v-card class="rounded-lg" flat>
                            <v-card-title class="text-subtitle-1">Cards Animation</v-card-title>
                            <v-card-text class="mt-n5">
                                <v-switch :model-value="true" color="primary"></v-switch>
                            </v-card-text>
                            <v-card-title class="text-subtitle-1 mt-n10">Transparent</v-card-title>
                            <v-card-text class="mt-n5">
                                <v-switch :model-value="true" color="primary"></v-switch>
                            </v-card-text>
                            <v-card-title class="text-subtitle-1 mt-n10">Hide navigation bar</v-card-title>
                            <v-card-text class="mt-n5">
                                <v-switch v-model="hideBar" color="primary"></v-switch>
                            </v-card-text>
                        </v-card>

                    </v-container>
                    <v-container class="pb-15 px-5" v-else>
                        <div v-for="sound in sounds">
                            <label class="mx-2 text-subtitle-1 font-weight-medium">{{ sound.label }}</label>
                            <v-slider step="10"
                                :prepend-icon="sound.value >= 80 ? 'mdi-volume-high' : sound.value > 1 ? 'mdi-volume-medium' : 'mdi-volume-off'"
                                color="primary" v-model="sound.value" @click:prepend="prependClick(sound)"></v-slider>
                        </div>
                    </v-container>
                </v-main>
            </v-layout>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
import { colors } from '../../stores/color';
const props = defineProps(['showSettings'])
const emits = defineEmits(['update:showSettings',])
import { themes } from '../../stores/theme'
const { selectedTheme, hideBar } = storeToRefs(useThemeStore())
const { selectedBackgroundColor } = storeToRefs(useColorStore())
const { sounds } = storeToRefs(useAppStore())
const selected = ref(0)
const el = ref()
const width = 900;
const height = 550;
const rail = ref(false)

const prependClick = (sound: { label: string, value: number }) => {
    if (sound.value == 100) {
        sound.value = 0
    } else {
        sound.value = 100
    }
}


onMounted(() => {
    const container = document.getElementById('Settings-container')
    if (container) {
        container.style.position = 'fixed';
        container.style.top = '18%';
        container.style.left = '20%';

        const observer = new ResizeObserver((rs) => {
            if(rs[0].contentRect.width <= 700){
                rail.value = true
            }else{
                rail.value = false
            }
            
        })

        observer.observe(container)
    }
})

</script>
 
<style scoped>
#profile-main::-webkit-scrollbar {
    width: 7px;
}

#profile-main::-webkit-scrollbar-thumb {

    margin-right: 5px;
    border-radius: 5px;
}

#profile-main:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, .2);
}



</style>