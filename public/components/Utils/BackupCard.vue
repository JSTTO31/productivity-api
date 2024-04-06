<template>
    <div :id="title + '-container'">
        <transition name="scale">
            <v-card :id="title + '-container-child'" :width="width" :height="height" color="background" main="true" elevation="10" v-show="showCard" class="rounded-lg" :element-width-data="width" :element-height-data="height">
                <v-card id="card-title" class="rounded-0 bg-surface pa-0" style="z-index: 200;">
                    <h4 class="py-4 px-4 d-flex align-center pl-5 w-100 rounded-t-lg" :id="title + '-container-header'" style="cursor: grab;">
                        <v-icon class="mr-2">{{ icon }}</v-icon>
                        {{ title }}
                        <v-spacer></v-spacer>
                        <v-icon class="ml-1" color="success" size="20" @click="emits('minimize')">mdi-circle</v-icon>
                        <v-icon class="ml-1" color="warning" size="20" @click="maximize()">mdi-circle</v-icon>
                        <v-icon class="ml-1" color="error" size="20" @click="emits('close')">mdi-circle</v-icon>
                    </h4>
                    <v-divider></v-divider>
                    <slot class="h-100 bg-red" id="card-content"></slot>
                </v-card>
            </v-card>
        </transition>
    </div>
</template>  
<script setup lang="ts">
const props = defineProps<{
    'showCard': boolean, 'title': string, 'icon' : string, 'width' : number, 'height' : number
}>()
const emits = defineEmits(['minimize', 'close'])
let isDrag : Ref<boolean> | null = null

function window_resize(){
    const element = document.getElementById(props.title + '-container-child')

    if(element){
        const currentCardWidth = element.clientWidth
        const currentCardHeight= element.clientHeight
        
        if(currentCardWidth == innerWidth || currentCardHeight == innerHeight - 48){
            const gapWidth = window.innerWidth - innerWidth
            const gapHeight = window.innerHeight - innerHeight
            const nextCardWidth = currentCardWidth + gapWidth
            const nextCardHeight = currentCardHeight + gapHeight
            element.style.width = nextCardWidth + 'px'
            element.style.height = nextCardHeight + 'px'
        }

        
        innerHeight = window.innerHeight
        innerWidth = window.innerWidth
    }
}

function maximize(){
    const parent = document.getElementById(props.title + '-container')
    const element = document.getElementById(props.title + '-container-child')
    if(element && parent){
        const currentWidth = element.clientWidth
        const currentHeight = element.clientHeight
        const windowWidth = window.innerWidth
        const windowHeight =  window.innerHeight - 48
        const isMaximize = currentWidth == windowWidth && currentHeight == windowHeight 

        if(!isMaximize){
            element.classList.remove('rounded-lg')
            element.classList.add('rounded-0')
        }else{
            element.classList.remove('rounded-0')
            element.classList.add('rounded-lg')
        }

        parent.style.top = isMaximize ? '50px' : '48px'
        parent.style.left = isMaximize ? '40px' : '0px'
        element.style.width = (isMaximize ? props.width :  windowWidth) + 'px'
        element.style.height = (isMaximize ? props.height : windowHeight) + 'px'
    }
}

onMounted(() => {
    const container: HTMLElement | null = document.getElementById(props.title + '-container')
    const containerChild : HTMLElement | null = document.getElementById(props.title + '-container-child')
    console.log(container);
    
    if (container) {
        const {isDrag: drag} = useDraggable(container)
        watchEffect(() => {
            isDrag = drag

            if(isDrag && containerChild){
                containerChild.classList.remove('rounded-0')
                containerChild.classList.add('rounded-lg')
            }
        })
    }

    if(containerChild){
        useResizeable(containerChild, props.width, props.height)
        window.addEventListener('resize', window_resize)
    }

})

onBeforeRouteLeave((to, from, next) => {
    removeEventListener('resize', window_resize)
    return next()
})

</script>
 
<style scoped> 
#container {
     position: fixed;
     top: 55px;
     left: 50px;
     z-index: 100;
 }

 </style>