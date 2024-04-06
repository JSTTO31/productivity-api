<template>
    <utils-card :show-card="showTimer" v-bind="$attrs" title="Focus Session" icon="mdi-timer" :width="width"
        :height="height" key="timer" @close="emits('update:showTimer', false)" @minimize="emits('update:showTimer', false)">
        <template #default>
            <v-card-text id="content" class="py-15 pt-10 h-100 w-100 d-flex flex-column align-center bg-surface">
                <v-progress-circular :size="progressCircularSize" :width="progressCircularWidth" :model-value="progress"
                    id="progress">
                    <div id="progress-content">
                        <div class="d-flex flex-column align-center" v-if="!start_session">
                            <v-btn class="my-5 py-4" size="x-small" variant="text" rounded="lg" block icon="mdi-chevron-up"
                                @click="number_of_session++" :disabled="number_of_session >= 8"></v-btn>
                            <div>
                                <h1 class="text-center progress-title">{{ duration * number_of_session }} mins</h1>
                                <h4 class="text-center mt-5 font-weight-regular progress-subtitle">Durations</h4>
                            </div>
                            <v-btn class="my-5 py-4" size="x-small" variant="text" rounded="lg" block
                                icon="mdi-chevron-down" @click="number_of_session--"
                                :disabled="number_of_session <= 1"></v-btn>
                        </div>
                        <div v-else>
                            <h1 class="text-center progress-title">{{ duration }} mins</h1>
                            <h4 class="text-center mt-5 font-weight-regular progress-subtitle">up next: 5 mins break</h4>
                        </div>
                    </div>
                </v-progress-circular>
                <div class="mb-10">
                    <v-btn color="white" append-icon="mdi-timer-outline" class="text-capitalize font-weight-medium mt-10"
                        @click="start" v-if="!start_session">Start Session</v-btn>
                    <v-btn append-icon="mdi-timer-outline" class="text-capitalize font-weight-medium mt-10" @click="stop"
                        v-else color="red">Stop Session</v-btn>
                </div>
            </v-card-text>
            <v-overlay :model-value="is_break" persistent scrim="#363062"
                class="d-flex align-center justify-center flex-column">
                <div class="mb-10 d-flex justify-center">
                    <v-progress-circular size="500" width="18" color="white" :model-value="((5 - duration) / 5) * 100">
                        <div>
                            <h1 class="text-center text-h1">{{ duration }} mins</h1>
                            <h4 class="text-center mt-5 font-weight-regular" v-if="number_of_session > 1">up next: 25 mins
                            </h4>
                            <h4 class="text-center mt-5 font-weight-regular" v-else>up next: Completed </h4>
                        </div>
                    </v-progress-circular>
                </div>
                <div class="d-flex justify-center">
                    <v-btn width="180" size="large" prepend-icon="mdi-clock-alert-outline" color="red"
                        class="text-capitalize " @click="stop">Stop Session</v-btn>
                    &nbsp;
                    &nbsp;
                    <v-btn width="180" size="large" prepend-icon="mdi-clock-end" class="text-capitalize"
                        @click="afterBreak">Skip break</v-btn>
                </div>
            </v-overlay>
            <v-dialog width="500" :model-value="showAlert" @click="setAlert" id="alert-dialog" persistent scrim="#000">
                <v-card id="alert" class="rounded-xl d-flex justify-center align-center pa-15">
                    <v-icon color="warning" size="200">mdi-alert</v-icon>
                    <h2>Stop Procrastinating</h2>
                </v-card>
            </v-dialog>
            <audio id="audio-alarm" src="/audio/alarm.mp3" loop></audio>
            <audio id="audio-tictac" src="/audio/tictac.mp3" loop></audio>
            <audio id="audio-success" src="/audio/success.mp3"></audio>
            <audio id="audio-break" src="/audio/break.mp3"></audio>
            <v-alert id="alert-reminder" class="text-h6 pa-5 rounded-lg" v-if="is_break">
                It's break time! Take 5 minutes to stretch, relax, and recharge. You've got this! 🌟
            </v-alert>
        </template>
    </utils-card>
</template>
<script lang="ts">
export default defineComponent({
    inheritAttrs: false,
})
</script>
<script setup lang="ts">
import { useTimerStore } from '~/stores/timer';
const width = 400, height = 450
const props = defineProps(['showTimer'])
const emits = defineEmits(['update:showTimer'])
const { start_session, is_break, progress, number_of_session, duration, showAlert } = storeToRefs(useTimerStore())
const { start, afterBreak, stop, setAlert } = useTimerStore()
const { sounds } = storeToRefs(useAppStore())
const progressCircularSize = ref(width)
const progressCircularWidth = ref(10)

watch(is_break, (current) => {
    if (!current && start_session.value) {
        //@ts-ignore
        const audioBreak: HTMLAudioElement = document.getElementById('audio-break')
        audioBreak.play()
        audioBreak.volume = 1
        emits('update:showTimer', true)
    } else {
        emits('update:showTimer', false)
    }

})

watch(() => sounds.value.clock.value, () => {
    //@ts-ignore
    const audioTictac: HTMLAudioElement | null = document.getElementById('audio-tictac')
    if (audioTictac) {
        audioTictac.volume = sounds.value.clock.value / 100
    }
})

watch(() => showAlert.value, (current) => {
    //@ts-ignore
    const audioAlarm: HTMLAudioElement | null = document.getElementById('audio-alarm')
    if (audioAlarm) {
        if (!current) {
            audioAlarm.pause()
            audioAlarm.currentTime = 0
        } else {
            audioAlarm.volume = sounds.value.alarm.value / 100
            audioAlarm.play()
        }
    }
})

watch(start_session, () => {
    //@ts-ignore
    const audioTictac: HTMLAudioElement | null = document.getElementById('audio-tictac')

    if (!start_session.value) {
        //@ts-ignore
        const audioSuccess: HTMLAudioElement | null = document.getElementById('audio-success')
        if (audioTictac) {
            audioTictac.pause()
            audioTictac.currentTime = 0
        }

        if (audioSuccess) {
            audioSuccess.currentTime = 0
            audioSuccess.play()
            audioSuccess.volume = 1
        }

    } else {
        if (audioTictac) {
            audioTictac.play()
        }

    }

})

onMounted(() => {
    const content: HTMLElement | null = document.getElementById('Focus Session-container')
    const progressContent: HTMLElement | null = document.getElementById('progress-content')

    if (progressContent && content) {
        let originalHeight = height + 100

        content.style.position = 'fixed';
        content.style.top = '18%';
        content.style.left = '36%';

        const observer = new ResizeObserver((resize) => {
            progressContent.style.transform = `scale(${content.clientHeight / originalHeight})`
        })

        observer.observe(content)
    }
})

</script>

<style scoped>
#card-timer {
    position: fixed;
    top: 150px;
    left: 150px;
}

#timer-alert {
    position: fixed;
    bottom: 15px;
    right: 95px;
    z-index: 10000;
}

#alert {
    animation: vibrate .35s linear infinite;
}

@keyframes vibrate {
    0% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }

    20% {
        -webkit-transform: translate(-15px, 15px);
        transform: translate(-15px, 15px);
    }

    40% {
        -webkit-transform: translate(-15px, -15px);
        transform: translate(-15px, -15px);
    }

    60% {
        -webkit-transform: translate(15px, 15px);
        transform: translate(15px, 15px);
    }

    80% {
        -webkit-transform: translate(15px, -15px);
        transform: translate(15px, -15px);
    }

    100% {
        -webkit-transform: translate(0);
        transform: translate(0);
    }
}

#alert-dialog {
    animation: color-changing 1s linear infinite alternate both;
}

@keyframes color-changing {
    0% {
        background-color: rgba(0, 0, 0, 0.212);
    }

    100% {
        background-color: rgba(255, 0, 0, 0.616);
    }
}

#alert-reminder {
    position: fixed;
    right: 25px;
    bottom: 25px;
    z-index: 5000;
    width: 450px;
}</style>