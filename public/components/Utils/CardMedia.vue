<template>
    <utils-card ref="el" :show-card="showMedia" title="Media" :width="width" :height="height" icon="mdi-movie-open"
        key="media" @close="emits('update:showMedia', false)" @minimize="emits('update:showMedia', false)">
        <template #default="props">
            <v-card v-bind="props" class="rounded-0">
                <v-card  id="content" flat class="rounded-0 h-75 w-100">
                    <iframe v-if="url" :src="url" style="outline: none;border: none;width: 100%;height: 100%;" title="Juice WRLD - Fast" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
               
                    <v-card v-else flat color="primary" variant="elevated"
                        class="w-100 h-100 d-flex  justify-center rounded-0 flex-column pa-5">
                        <h2>
                            Dive into Learning Joy! 📚✨
                        </h2>
                        <p class="text-justify text-subtitle-2">
                            Time to explore your favorite study materials! Just paste the URL, hit play, and let the joy of
                            learning unfold! 🚀🎉
                        </p>
                    </v-card>
                </v-card>
                <v-card-actions id="actions" class="px-2 h-25 bg-surface" v-if="showAction">
                    <v-text-field v-model="urlTextField" single-line density="compact" hide-details label="Enter the url"
                        prepend-inner-icon="mdi-link-variant" rounded="0"></v-text-field>
                    <v-btn class="text-capitalize ml-2" color="primary" variant="elevated" flat icon="mdi-play" rounded
                        size="40" @click="changeUrl"></v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
const props = defineProps(['showMedia'])
const emits = defineEmits(['update:showMedia',])
const el = ref()
const width = 400;
const height = 335;
const url = ref()
const urlTextField = ref()
const showAction = ref(true)
function changeUrl() {
    if (!urlTextField.value) return


    if (/embed/i.test(urlTextField.value)) {
        url.value = urlTextField.value
    } else {
        const domain = urlTextField.value.match(/.*(\.com)/)[0]
        let key = urlTextField.value.match(/\?v=.*/)[0]

        if (key && domain) {
            key = key.replace(/\?v=/, '')
            url.value = `${domain}/embed/${key}`
            urlTextField.value = ''
        }

    }
}


onMounted(() => {
    const container = document.getElementById('Media-container')
    if (container) {
        container.style.position = 'fixed';
        container.style.top = '25%';
        container.style.left = '37%';


        const observer = new ResizeObserver(() => {
            if(container.clientWidth == window.innerWidth){
                showAction.value = false
            }else{
                showAction.value = true
            }
        })

        observer.observe(container)
    }
})

</script>
 
<style scoped> #card-media {
     position: fixed;
     top: 50px;
     left: 50px;
     z-index: 100;
 }</style>