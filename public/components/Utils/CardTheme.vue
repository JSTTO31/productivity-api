<template>
    <v-card class="pa-5 rounded-0" flat width="325">
        <h4 class="font-weight-regular">Select your theme</h4>
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
        <v-card-actions class="pb-0">
                <v-slider label="Theme" step="10" :prepend-icon="sounds.theme.value >= 80 ? 'mdi-volume-high' : sounds.theme.value > 1 ? 'mdi-volume-medium' : 'mdi-volume-off'" v-model="sounds.theme.value" color="primary" @click:prepend="prependClick(sounds.theme)"></v-slider>
        </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';
import {themes} from '../../stores/theme'
const {selectedTheme} = storeToRefs(useThemeStore())
const {sounds} = storeToRefs(useAppStore())
const prependClick = (sound: {label: string, value: number}) => {
    if(sound.value == 100){
        sound.value = 0
    }else{
        sound.value = 100
    }
}
</script>

<style scoped>

</style>