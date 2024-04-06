<template>
    <v-layout class="h-100 w-100 bg-surface" style="z-index: 300;">
        <v-app-bar density="compact" class="pl-5 border-b" flat>
            <h4>
                <v-icon>mdi-chat</v-icon>
                Team Discussion
            </h4>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" class="rounded-0" @click="emits('close')"></v-btn>
        </v-app-bar>
        <v-main>
            <v-card id="chat-box-main" class="rounded-0 h-100 py-5" style="overflow-y: auto;" flat
                v-if="project.messages.length > 0">
                <project-list-item-message v-for="message in project.messages" :message="message" :key="message._id" />
            </v-card>
            <div v-else>
                <div class="pa-15 mt-5">
                    <v-img src="/undraw/messaging.svg"></v-img>
                    <h3 class="mt-10 text-center">Welcome to team messaging! Connect, collaborate, and share ideas with
                        your team.</h3>
                </div>
            </div>
        </v-main>
        <v-footer app>
            <v-text-field @keyup.enter="send" v-model="message" hide-details rounded="lg" single-line
                density="comfortable" variant="solo-filled" class="" flat append-inner-icon="mdi-send"
                label="Write your message here..."></v-text-field>
            <!-- <v-btn class="ml-2 rounded-lg" icon="mdi-image" flat></v-btn>
                <v-btn class="ml-2 rounded-lg" icon="mdi-microphone" flat></v-btn> -->
        </v-footer>
    </v-layout>
</template>

<script setup lang="ts">
const props = defineProps<{ project: ProjectType }>()
const emits = defineEmits(['close'])
const $project = useProjectStore()
const message = ref("")


async function scrollTobottom() {
    const chatboxmain = document.getElementById('chat-box-main')
    if (chatboxmain) {
        chatboxmain.scrollTo(0, chatboxmain.scrollHeight)
    }
}

async function send() {
    $project.sendMessage(props.project._id, message.value).then(() => {
        message.value = ''

        nextTick(() => {
            scrollTobottom()
        })
    })
}


watch(() => props.project.messages.length, () => {
    scrollTobottom()
})

await $project.getMessages(props.project._id)

onMounted(() => {
    scrollTobottom()
})

</script>

<style scoped>
#chat-box-main::-webkit-scrollbar {
    width: 5px;
}

#chat-box-main::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.26);
    border-radius: 25px;
}
</style>