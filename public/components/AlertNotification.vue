<template>
   <v-alert id="timer-alert" width="350" class="pa-5 rounded-lg" density="compact" elevation="5" color="#435585" v-if="show">
        <div v-if="title">
            <h4 class="d-flex align-center">
                {{ title }}
                <v-spacer></v-spacer>
                <v-btn icon="mdi-close" size="x-small" variant="text" @click="close"></v-btn>
            </h4>
            <v-divider class="my-2"></v-divider>
        </div>
        <slot name="content">
            
        </slot>
        <div class="w-100 mt-5 d-flex">
            <slot name="actions">
            
            </slot>
        </div>
        
    </v-alert>
</template>

<script setup lang="ts">
const props = defineProps(['title', 'show'])
const emits = defineEmits(['update:show'])
let timer : NodeJS.Timeout | null = null
const close = () => {
    if(timer)[
        clearTimeout(timer)
    ]

    emits('update:show', false)
}

watch(() => props.show, () => {

    console.log('triggered');
    

    timer = setTimeout(() => {
        emits('update:show', false)
        if(timer){
            clearTimeout(timer)
        }
    }, 5000);
})
</script>

<style scoped>

</style>