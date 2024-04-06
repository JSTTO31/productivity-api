<template>
  <v-card
    color="grey-lighten-1"
    class="rounded-lg w-100 d-flex flex-column mt-15 justify-center"
    elevation="5"
  >
    <v-card
      height="50"
      class="pa-2 rounded-0 border-b d-flex align-center"
      flat
    >
      <div class="d-flex mr-15 ml-2">
        <v-icon class="ml-1" color="success" size="18">mdi-circle</v-icon>
        <v-icon class="ml-1" color="warning" size="18">mdi-circle</v-icon>
        <v-icon class="ml-1" color="error" size="18">mdi-circle</v-icon>
      </div>
      <div class="w-25">
        <v-text-field
          density="compact"
          readonly
          hide-details
          variant="solo-filled"
          flat
          prepend-inner-icon="mdi-magnify"
          single-line
          label="Search..."
        ></v-text-field>
      </div>
    </v-card>
    <video class="w-100" loop autoplay muted :src="src"></video>
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps(['src'])
</script>

<style scoped></style>
