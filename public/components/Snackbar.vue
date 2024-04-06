<template>
    <v-alert class="rounded-lg mt-2" density="compact">
      {{ snackbar.message }}
      <template #append>
        <v-btn
        @click="close"
          variant="text"
        >
          Close
        </v-btn>
      </template>
    </v-alert>
</template>

<script setup lang="ts">
const props = defineProps(['snackbar'])
const {snackbars} = storeToRefs(useNotificationStore())
let timer : NodeJS.Timeout | null= null

timer = setTimeout(() => {
    snackbars.value = []
}, 2000);

function close(){
    snackbars.value = []
}


onBeforeUnmount(() => {
    if(timer) clearTimeout(timer)
})


</script>

<style scoped>

</style>