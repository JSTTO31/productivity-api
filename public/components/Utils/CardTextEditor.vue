<template>
    <utils-card :show-card="showEditor" title="Text Editor" icon="mdi-tune" :width="width" :height="height" key="sound"
        @close="emits('update:showEditor', false)" @minimize="emits('update:showEditor', false)">
        <template #title>
            <v-card id="card-title" class="rounded-t-lg rounded-b-0 bg-surface pb-5  pa-0" style="z-index: 200;">
                <v-divider class="mb-5"></v-divider>
                <div class=" w-100 px-5 py-0" style="display: flex;flex-wrap: wrap;row-gap: 10px;row">
                    <div class="mr-2">
                        <span>
                            <select id="select-fontName" hide-details rounded="0" style="border: 1px solid grey;"
                                class="option-select pa-0 text-h5 px-2 rounded"
                                :class="current.dark ? 'bg-surface' : 'bg-white'"
                                @change="$event => advanceOption($event, 'fontName')">
                                <option v-for="font in fontFamilies">{{ font }}</option>
                            </select>
                        </span>
                        <span>
                            <select id="select-fontName" style="border: 1px solid grey" hide-details rounded="0"
                                class="px-5 ml-1 rounded text-h5 option-select pa-0 "
                                :class="current.dark ? 'bg-surface' : 'bg-white'"
                                @change="$event => advanceOption($event, 'fontSize')">
                                <option v-for="size in 7">{{ size }}</option>
                            </select>
                        </span>
                    </div>
                    <span class="d-flex align-center">
                        <input ref="textColor" type="color" id="select-fontColor" hide-details rounded="0"
                            class="option-select" style="height: 0px;width: 0px;position: absolute;" single-line
                            variant="underlined" density="compact"
                            @change="$event => advanceOption($event, 'foreColor')" />
                        <v-card id="fontColor-activator"
                            class="px-4 justify-center rounded-0 h-100 d-flex align-center flex-column" variant="text"
                            @click="textColor.click()">
                            <v-icon size="20">mdi-format-color-text</v-icon>
                            <v-sheet tile height="3" width="35" :color="selectedTextColor"></v-sheet>
                        </v-card>
                    </span>
                    <span class="d-flex align-center">
                        <v-btn id="markerColor-activator" class="py-2 rounded-0" variant="elevated"
                            @click="advanceOption({ target: { value: selectedMarkColor } }, 'backColor')"
                            @contextmenu.prevent="markColor.click()" flat>
                            <v-icon :color="selectedMarkColor">mdi-marker</v-icon>
                        </v-btn>
                        <input ref="markColor" type="color" id="select-markColor" hide-details rounded="0"
                            class="option-select" single-line variant="underlined" density="compact"
                            style="height: 0px;width: 0px;position: absolute;"
                            @change="($event: Event) => advanceOption($event, 'backColor')" />
                    </span>
                    <v-btn id="bold" class="option-button format py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-bold</v-icon>
                    </v-btn>
                    <v-btn id="italic" class="option-button format py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-italic</v-icon>
                    </v-btn>
                    <v-btn id="underline" class="option-button format py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-underline</v-icon>
                    </v-btn>
                    <v-btn id="strikethrough" class="option-button format py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-strikethrough</v-icon>
                    </v-btn>
                    <v-divider vertical class="mx-2"></v-divider>
                    <v-btn id="superscript" class="option-button script py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-superscript</v-icon>
                    </v-btn>
                    <v-btn id="subscript" class="option-button script py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-subscript</v-icon>
                    </v-btn>
                    <v-divider vertical class="mx-2"></v-divider>
                    <v-btn id="insertOrderedList" class="option-button py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-list-numbered</v-icon>
                    </v-btn>
                    <v-btn id="insertUnorderedList" class="option-button py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                    </v-btn>
                    <v-divider vertical class="mx-2"></v-divider>
                    <v-btn id="link" class="option-button-link py-2 rounded-0" variant="text">
                        <v-icon>mdi-link</v-icon>
                    </v-btn>
                    <v-btn id="unlink" class="option-button py-2 rounded-0" variant="text">
                        <v-icon>mdi-link-off</v-icon>
                    </v-btn>
                    <v-divider vertical class="mx-2"></v-divider>
                    <v-btn id="justifyLeft" class="option-button align py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-align-left</v-icon>
                    </v-btn>
                    <v-btn id="justifyCenter" class="option-button align py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-align-center</v-icon>
                    </v-btn>
                    <v-btn id="justifyRight" class="option-button align py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-align-right</v-icon>
                    </v-btn>
                    <v-btn id="justifyFull" class="option-button align py-2 rounded-0" variant="text">
                        <v-icon>mdi-format-align-justify</v-icon>
                    </v-btn>
                    <v-menu>
                        <template #activator="{props}"> 
                            <v-btn v-bind="props" class="option-button py-2 rounded-0" variant="text">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="250" class="rounded-lg mt-1">
                            <v-list>
                                <v-list-item @click="toggleCode" append-icon="mdi-xml">Code</v-list-item>
                                <v-list-item @click="history('undo')" append-icon="mdi-undo">Undo</v-list-item>
                                <v-list-item @click="history('redo')" append-icon="mdi-redo">Redo</v-list-item>
                                <v-list-item @click="_export()" append-icon="mdi-sd">Save as</v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                    <a download id="hyperlink"></a>
                </div>
            </v-card>
        </template>
        <template #default="props">
            <v-card v-bind="props" class="pa-5 bg-background"
                style="overflow: auto;z-index: 100;">
                <v-card width="816" height="12in" class="my-5 mx-auto rounded-lg">
                    <div class="mx-auto rounded-lg w-100 bg-surface" id="text-input" contenteditable="true"
                        placeholder="Write here...">
                    </div>
                </v-card>
            </v-card>
        </template>
    </utils-card>
</template>  
<script setup lang="ts">
const props = defineProps(['showEditor'])
const emits = defineEmits(['update:showEditor'])
const width = 685, height = 600
const { current } = useTheme()
const { fontFamilies, markColor, toggleCode, textColor, selectedMarkColor, selectedTextColor, history, advanceOption } = useFormat('text-input')

onMounted(() => {
})

const _export = () => {
    const hyperlink = document.getElementById('hyperlink') as HTMLLinkElement
    const textInput = document.getElementById("text-input")
    if(hyperlink && textInput){
        useExport(hyperlink, textInput)
    }
}

</script>
 
<style scoped> 

 [contenteditable=true]:empty:before {
     content: attr(placeholder);
     pointer-events: none;
     display: block;
 }

 #text-input {
     width: 8.5in !important;
     height: 12in !important;
     outline: none;
     padding: 1in;
 }


 /* #card::-webkit-scrollbar{
    height: 0px;
    width: 0px;
 } */

 #card::-webkit-scrollbar {
     height: 8px;
     width: 8px;
 }


 #card::-webkit-scrollbar-thumb {
     background: lightgrey;
     border-radius: 25px;
 }



 select {
     font-size: 16px !important;
 }</style>