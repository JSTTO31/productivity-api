<template>
     <v-card 
          style="overflow-y: auto;"
          class="rounded-lg w-33 align-center justify-center border"
          flat
          height="400"
     >
        <v-card-text class="d-flex align-center justify-center mt-10">
           <v-progress-circular size="280" :model-value="15 / 25 * 100" width="10">
               <h1>15 minutes</h1>
           </v-progress-circular>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>