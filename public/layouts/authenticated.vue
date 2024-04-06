<template>
  <UtilsThemeBackground
    id="video"
    ref="video"
    style="position: fixed; top: 0; left: 0"
  ></UtilsThemeBackground>
  <v-app-bar
    class="pa-0 border-b px-5 bg-surface"
    :color="name == 'dark' ? '' : 'primary'"
    :model-value="!hideBar"
    density="compact"
    flat
    v-if="user"
  >
    <AppLogo
      style="font-size: 22px"
      @click="$router.push({ name: 'index' })"
    ></AppLogo>
    <v-spacer></v-spacer>
    <v-tabs
      stacked
      style="position: absolute; left: 50%; transform: translateX(-50%)"
    >
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        @click="$router.push({ name: 'r-access-home' })"
      >
        <v-icon>mdi-home</v-icon>
        Home
      </v-tab>
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        :to="{ name: 'r-access-projects' }"
      >
        <v-icon>mdi-square-edit-outline</v-icon>
        Projects
      </v-tab>
      <v-tab
        size="small"
        style="opacity: 0.8"
        class="text-capitalize"
        :to="{ name: 'r-access-schedules' }"
      >
        <v-icon>mdi-calendar</v-icon>
        Schedules
      </v-tab>
      <v-tab
        size="small"
        :to="{ name: 'r-access-performance' }"
        style="opacity: 0.8"
        class="text-capitalize"
      >
        <v-icon>mdi-chart-arc</v-icon>
        Performance
      </v-tab>
    </v-tabs>
    <v-spacer></v-spacer>

    <v-btn
      class="ml-2"
      variant="text"
      size="small"
      icon="mdi-volume-high"
    ></v-btn>
    <v-btn
      class="ml-2"
      variant="text"
      size="small"
      icon="mdi-arrow-expand"
      @click="fullscreen"
    ></v-btn>
    <v-badge dot color="red" class="ml-2">
      <v-btn variant="text" size="small" icon="mdi-bell"></v-btn>
    </v-badge>
    <v-divider vertical class="mx-4" inset></v-divider>
    <v-menu>
      <template #activator="{ props }">
        <v-avatar
          v-bind="props"
          size="35"
          class="border text-caption font-weight-bold ml-2"
          color="#F5E8C7"
          style="z-index: 20"
        >
          <v-img :src="user.picture"></v-img>
        </v-avatar>
      </template>
      <v-card width="150">
        <v-list>
          <v-list-item prepend-icon="mdi-logout" @click="$user.logout"
            >Logout</v-list-item
          >
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
  <ClientOnly>
    <slot></slot>
    <template #fallback>
      <v-main> <Loading></Loading></v-main>
    </template>
  </ClientOnly>
  <navigationDrawerRight></navigationDrawerRight>
  <NotificationContainer></NotificationContainer>
  <audio id="audio-celebration" src="/audio/celebration.mp3"></audio>
</template>

<script setup lang="ts">
import { useTimeSpentStore } from "../stores/timeSpent";
const $user = useUserStore();
const { user } = storeToRefs(useUserStore());
const { name } = useTheme();
const { hideBar } = storeToRefs(useThemeStore());
const { todayTimeSpent, total } = storeToRefs(useTimeSpentStore());
const $timespent = useTimeSpentStore();
function fullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}
let interval: null | NodeJS.Timeout = null;
const duration = computed(() => ((todayTimeSpent.value?.spent || 0) / (1000 * 60 * 60)) >= 2 ? 1000 * 60 * 25 : 1000 * 60 * 1)
onMounted(() => {
  $timespent.getTimeSpent().then(() => {
    interval = setInterval(() => {
      $timespent.update()
    }, duration.value);
  });

  document.onvisibilitychange = () => {
    if (document.visibilityState == "hidden") {
      if (interval) clearInterval(interval);
        $timespent.update().then(() => {
          if(todayTimeSpent.value){
            const remaining = (1000 * 60 * 60 * 2) - todayTimeSpent.value.spent
            if(remaining){
              const hours = Math.floor((remaining / (1000 * 60)) / 60)
              const minutes = Math.floor((remaining / (1000 * 60)) % 60)
              // var notification = new Notification("Daily Usage Reminder", {
              //   body: `You still have ${Math.floor(hours)}hr and ${Math.floor(minutes)}min remaining time to spend in the app today. Keep up the good work!`,
              //   icon: "/favicon.png" // Path to the notification icon
              // });
            }
          }
        })
    } else {
      interval = setInterval(() => {
        $timespent.update()
      },  duration.value);
    }
  };

  window.onbeforeunload = () => {
    $timespent.update()
  }

  
  if (Notification.permission == 'default') {
      Notification.requestPermission()
  }
});
</script>

<style>
body::-webkit-scrollbar {
  width: 0;
}
</style>
