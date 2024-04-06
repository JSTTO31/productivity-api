<template>
    <video  id="video" style="width: 100vw;position: absolute;top: 0;left: 0;"  muted :autoplay="true" v-if="selectedTheme.type == 'video'" :src="
    //@ts-ignore
    selectedTheme.backgrounds[selectedBackground].path" 
    loop>
    </video>
    <div v-else style="width: 100vw;height: 100vh;position: absolute;top: 0;left: 0;filter: brightness(90%)" :style="selectedTheme.backgroundColor">
    </div>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app';

const {selectedTheme, selectedBackground} = storeToRefs(useThemeStore())
const {sounds} = storeToRefs(useAppStore())

watch(sounds.value.theme, () => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(!video) return
  video.muted = false
  video.volume = sounds.value.theme.value / 100
})


onMounted(() => {
  //@ts-ignore
  const video : HTMLVideoElement | null = document.getElementById('video')
  if(video){
    setTimeout(() => {
      video.muted = false
      video.volume = sounds.value.theme.value / 100
      video.play()
    }, 2500);
  }
})
</script>

<style scoped>
#video{
  position: fixed;
}
</style>