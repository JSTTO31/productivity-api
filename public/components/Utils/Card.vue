<template>
    <transition name="slide">
        <v-card  :id="title + '-container'" :width="width" :height="height ? height : 'auto'"  main="true" elevation="10" v-show="showCard" class="rounded-lg" :element-width-data="width" :element-height-data="height">
            <v-card :id="props.title + '-card-title'" class="rounded-0 bg-surface  pa-0" style="z-index: 1500;" flat>
                <h4 class="pa-3 d-flex align-center pl-5 w-100 rounded-t-lg" :id="title + '-container-header'" style="cursor: grab;">
                    <v-icon class="mr-2">{{ icon }}</v-icon>
                    {{ title }}
                    <v-spacer></v-spacer>
                    <v-icon class="ml-1" size="18" color="success"  @click="maximize()" >mdi-circle</v-icon>
                    <!-- <v-icon class="ml-1" size="18" color="warning" @click="emits('minimize')">mdi-circle</v-icon> -->
                    <v-icon class="ml-1" size="18" color="error"  @click="emits('close')">mdi-circle</v-icon>
                </h4>
                <slot name="title"></slot>
            </v-card>
            <v-divider></v-divider>
            <slot :id="title + '-card-content'"></slot>
        </v-card>
    </transition>
</template>  
<script setup lang="ts">
const props = defineProps<{
    'showCard': boolean, 'title': string, 'icon' : string, 'width' : number, 'height' : number | null
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
    const container = document.getElementById(props.title + '-container')
    if(container){
        const currentWidth = container.clientWidth
        const currentHeight = container.clientHeight
        const windowWidth = window.innerWidth
        const windowHeight =  window.innerHeight - 48
        const isMaximize = currentWidth == (windowWidth) && currentHeight == windowHeight 

        if(!isMaximize){
            container.classList.remove('rounded-lg')
            container.classList.add('rounded-0')
        }else{
            container.classList.remove('rounded-0')
            container.classList.add('rounded-lg')
        }

        container.style.top = isMaximize ? '50px' : '48px'
        container.style.left = isMaximize ? '40px' : '0px'
        container.style.width = (isMaximize ? props.width :  windowWidth) + 'px'
        container.style.height = (isMaximize ? props.height : windowHeight) + 'px'
    }
}

onMounted(() => {
    const container: HTMLElement | null = document.getElementById(props.title + '-container')
    const title = document.getElementById(props.title + '-card-title')
    const content = document.getElementById(props.title + '-card-content')

    if (container) { 

        
        const {isDrag: drag} = useDraggable(container)
        
        watchEffect(() => {
            isDrag = drag

            if(isDrag && container){
                container.classList.remove('rounded-0')
                container.classList.add('rounded-lg')
            }
        })
    }
    
    if(container){
        if(content && title){
            const observer = new ResizeObserver(() => {
                content.style.height = container.clientHeight - title.clientHeight + 'px'
            })

            observer.observe(container)
        }
        
        useResizeable(container)
        window.addEventListener('resize', window_resize)
    }

})

onUnmounted(() => {
    removeEventListener('resize', window_resize)
})


onUpdated(() => {
    const containerChild : HTMLElement | null = document.getElementById(props.title + '-container')
    const title = document.getElementById(props.title + '-card-title')
    const content = document.getElementById(props.title + '-card-content')

    if(containerChild){
        if(content && title){
            content.style.height = containerChild.clientHeight - title.clientHeight + 'px'
        }
    }
})

</script>
 
<style scoped> 


 </style>