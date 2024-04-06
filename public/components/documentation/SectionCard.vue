<template>
    <v-card style="padding: 25px;outline: none;cursor: default;" class="rounded-lg pa-0" id="section" v-ripple="false" v-hover="false">
        <!-- <div class="d-flex justify-center bg-grey-lighten-5 py-2">
            <v-icon>mdi-dots-horizontal</v-icon>
        </div> -->
        <div class="pa-5">
            <v-card color="transparent" flat id="card-title" class=" pa-0" style="z-index: 200;">
                <div class=" w-100 py-0" style="display: flex;flex-wrap: wrap;row-gap: 10px;row">
                    <v-btn icon="mdi-undo" class="option-button format rounded-lg ml-2" variant="text">
                    </v-btn>
                    <v-btn icon="mdi-redo" class="option-button format rounded-lg ml-2" variant="text">
                    </v-btn>
                    <v-btn id="bold" icon="mdi-format-bold" class="option-button format rounded-lg ml-2" variant="text">
                    </v-btn>
                    <v-btn id="italic" icon="mdi-format-italic" class="option-button format rounded-lg ml-2"
                        variant="text">
                    </v-btn>
                    <v-btn id="underline" icon="mdi-format-underline" class="option-button format rounded-lg ml-2"
                        variant="text">
                    </v-btn>
                    <v-btn id="strikethrough" icon="mdi-format-strikethrough"
                        class="option-button format rounded-lg ml-2" variant="text">
                    </v-btn>
                    <v-btn id="insertOrderedList" icon="mdi-format-list-numbered" class="option-button rounded-lg ml-2"
                        variant="text">
                    </v-btn>
                    <v-btn id="insertUnorderedList" icon="mdi-format-list-bulleted"
                        class="option-button rounded-lg ml-2" variant="text">
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="transparent" icon="mdi-cards-outline" flat class="ml-2 rounded-lg"></v-btn>
                    <v-btn color="transparent" icon="mdi-trash-can" flat class="ml-2 rounded-lg"></v-btn>
                    <v-btn color="transparent" icon="mdi-dots-horizontal" flat class="ml-2 rounded-lg"></v-btn>
                </div>
            </v-card>
            <h2 contenteditable="true" class="pa-2 mt-2 text-grey-darken-4">{{ section.title }}</h2>
            <p class="pa-2 mt-1 text-grey-darken-4" contenteditable="true">{{ section.content }}</p>
        </div>
    </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['section', 'selected'])
</script>

<style scoped></style>