<template>
     <utils-card :show-card="showSound" title="Sound Settings" icon="mdi-tune" :width="width" :height="height" key="sound" @close="emits('update:showSound', false)" @minimize="emits('update:showSound', false)">
        <template #default>
            <v-card-text class="bg-surface h-100">
                <div v-for="sound in sounds">
                    <label class="mx-2 text-subtitle-1">{{ sound.label }}</label>
                    <v-slider step="10" :prepend-icon="sound.value >= 80 ? 'mdi-volume-high' : sound.value > 1 ? 'mdi-volume-medium' : 'mdi-volume-off'" color="primary" v-model="sound.value" @click:prepend="prependClick(sound)"></v-slider>
                </div>
            </v-card-text>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
import { useAppStore } from '~/stores/app';
const width = 450
const height = 320
const props = defineProps(['showSound'])
const emits = defineEmits(['update:showSound'])
const {sounds} = storeToRefs(useAppStore())
const prependClick = (sound: {label: string, value: number}) => {
    if(sound.value == 100){
        sound.value = 0
    }else{
        sound.value = 100
    }
}

onMounted(() => {
    let card: HTMLElement | null = document.getElementById('card-sound')
    let soundSettings : HTMLElement | null = document.getElementById('sound-settings')
})

</script>
 
<style scoped> 

</style>