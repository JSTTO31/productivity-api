<template>
    <div id="root" class="rounded-lg bg-white h-100 pa-5 bg-transparent" style="box-sizing: border-box !important;">
      <Transition name="slide">
        <v-card  width="350" height="650" class="rounded-lg" elevation="10" v-show="showPlayList">
            <h3 class="pa-3 px-4 d-flex align-center">
                <v-icon class="mr-2">mdi-playlist-play</v-icon>
                Playlist
                <v-spacer></v-spacer>
                <v-icon variant="text" class="ml-1" rounded="lg" size="20"
                        @click="emits('update:showPlayList', false)" color="success">mdi-circle</v-icon>
                <v-icon variant="text" class="ml-1" rounded="lg" size="20"
                    @click="emits('update:showPlayList', false)" color="warning">mdi-circle</v-icon>
                <v-icon variant="text" class="ml-1" rounded="lg" size="20"
                    @click="emits('update:showPlayList', false)" color="error">mdi-circle</v-icon>
            </h3>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
                <div class="px-2 pt-2">
                    <v-text-field hide-details label="Search music..." prepend-inner-icon="mdi-magnify" variant="outlined" single-line></v-text-field>
                </div>
                <v-list class="bg-transparent h-100" style="overflow: auto;">
                    <v-card class="rounded-0 pa-5" :variant="index == 0 ? 'tonal' : 'elevated'"  :color="index == 0 ? '' : 'transparent'" @click="" flat v-for="music, index in musicList" :key="music.title" >
                        <v-row>
                            <v-col cols="3">
                                <v-img :src="'https://source.unsplash.com/random/150x150/?music&' + music.title"></v-img>
                            </v-col>
                            <v-col cols="7">
                                <h4>{{ music.title }}</h4>
                                <h6 class="text-capitalize font-weight-regular">Artist: {{ music.artist }}</h6>
                                <h6 class="text-capitalize font-weight-regular">Genre: {{ music.genre }}</h6>
                            </v-col>
                            <v-col cols="2">
                            </v-col>
                        </v-row>
                    </v-card>
                </v-list>
            </v-card-text>
        </v-card>
      </Transition>
    </div>
</template>
<script setup lang="ts">
const musicList = [
  {
    title: 'Bohemian Rhapsody',
    artist: 'Queen',
    genre: 'Rock'
  },
  {
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    genre: 'Pop'
  },
  {
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Rock'
  },
  {
    title: 'Shape of You',
    artist: 'Ed Sheeran',
    genre: 'Pop'
  },
  {
    title: 'Stairway to Heaven',
    artist: 'Led Zeppelin',
    genre: 'Rock'
  },
  {
    title: 'Ain\'t No Sunshine',
    artist: 'Bill Withers',
    genre: 'Soul'
  },

];
const props = defineProps(['showPlayList'])
const emits = defineEmits(['update:showPlayList'])

onBeforeUpdate(() => {
    let card: HTMLElement | null = document.getElementById('root')
    if(card && props.showPlayList){
        card.style.zIndex = '300' 
    }
})


</script>

<style scoped>
#root{
    position: fixed;
    top: 50px;
    right: 75px;
}
</style>