<template>
  <v-app-bar style="padding-inline: 115px;" height="80" flat absolute color="transparent">
    <AppLogo style="font-size: 28px;"></AppLogo>
    <v-spacer></v-spacer>
    <v-btn variant="plain" class="mx-1 text-capitalize" :to="{ hash: '#features' }">Features</v-btn>
    <v-btn variant="plain" class="mx-1 text-capitalize" :to="{ hash: '#testimonial' }">Testimonial</v-btn>
    <v-btn variant="plain" class="mx-1 text-capitalize" :to="{ hash: '#how-it-works' }">How it works</v-btn>
    <v-btn variant="plain" class="mx-1 text-capitalize mr-n15" :to="{ hash: '#faq' }">FAQ</v-btn>
    <v-spacer></v-spacer>
    <v-btn variant="text" icon="mdi-weather-sunny" class="mr-10" @click="setColorMode" v-if="name == 'dark'"></v-btn>
    <v-btn variant="text" icon="mdi-weather-night" class="mr-10" @click="setColorMode" v-else></v-btn>
    <client-only>
      <div v-if="!user">
        <v-btn class="text-capitalize mr-3 rounded-lg font-weight-bold" rounded="5" variant="elevated"
          @click="$router.push({ name: 'auth-login' })" color="grey-darken-3">Login</v-btn>
        <v-btn class="text-capitalize mr-3 rounded-lg font-weight-bold" rounded="5" variant="elevated"
          @click="$router.push({ name: 'auth-register' })" color="primary">Sign up</v-btn>
      </div>
      <div v-else>
        <v-btn color="primary" variant="elevated" class="text-capitalize rounded-lg font-weight-bold" @click="$router.push({
      name: 'r-access-home'
    })">Let's go to work</v-btn>
        <v-btn color="grey-darken-3" variant="elevated" class="ml-2 text-capitalize rounded-lg font-weight-bold"
          @click="$user.logout">Logout</v-btn>
      </div>
    </client-only>
  </v-app-bar>
  <slot></slot>
</template>

<script setup lang="ts">
const $color = useColorStore()
const { name } = useTheme()
const $user = useUserStore()
const { user } = storeToRefs(useUserStore())
const app = ref(false)

function setColorMode() {
  if ((name.value == 'system' || name.value == 'dark')) {
    $color.setBackgroundColor('light')
  } else {
    $color.setBackgroundColor('dark')

  }
}

</script>

<style scoped>

#contact-staff {
  position: fixed;
  bottom: 25px;
  right: 25px
}
</style>