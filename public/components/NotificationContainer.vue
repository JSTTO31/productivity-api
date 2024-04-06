<template>
  <div id="notifications-container">
    <TransitionGroup name="slide">
      <NotificationListItem class="mt-3" v-for="notification in notifications" :key="notification.id"
        :notification="notification"></NotificationListItem>
    </TransitionGroup>
  </div>
  <div id="snackbars-container">
    <TransitionGroup name="slide-up">
      <snackbar v-for="snackbar in snackbars" :snackbar="snackbar" :key="snackbar.id"></snackbar>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '~/stores/notification';
const { notifications, snackbars } = storeToRefs(useNotificationStore())
</script>

<style scoped>
#notifications-container {
  position: fixed;
  bottom: 15px;
  left: 15px;
  z-index: 50000;
  width: 350px;
}

#snackbars-container {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50000;
  width: 350px;
}


.slide-up-enter-active,
.slide-up-leave-active {
  transition: opacity .2s linear, transform .55s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(50%);
}
.slide-enter-active,
.slide-leave-active {
  transition: opacity .2s linear, transform .35s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(50%);
}
</style>