<template>
    <v-alert :title="notification.title" :type="notification.type"  class="rounded-lg" :text="notification.message">
        <v-card id="progress-bar" height="2"  class="rounded-0" color="white"></v-card>
    </v-alert>
</template>

<script setup lang="ts">
import { useNotificationStore, type NotificationType } from '~/stores/notification';
const $notification = useNotificationStore()
const props = defineProps<{notification: NotificationType}>()
let timer : NodeJS.Timeout | null = null

timer = setTimeout(() => {
    if(timer){
        clearTimeout(timer)
        $notification.remove(props.notification.id)
    }
}, 5000);


</script>

<style scoped>
#progress-bar{
    position: absolute;
    top: 0;
    left: 0;
    animation: width 5s linear normal;
}

@keyframes width {
    from{
        width: 0%;
    }
    to{
        width: 100%;
    }
}
</style>