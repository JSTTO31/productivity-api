<template>
    <v-card  class="h-75   rounded-lg pa-5 bg-surface" flat>
        <v-card-title class="d-flex justify-center">
            <v-btn-group color="transparent">
                <v-btn class="text-capitalize" active>Pomodoro</v-btn>
                <v-btn class="text-capitalize">Short break</v-btn>
                <v-btn class="text-capitalize">Long break</v-btn>
            </v-btn-group>
        </v-card-title>
        <v-card-text class="px-15 py-10">
            <div class="d-flex justify-center align-center">
                <v-btn class="d-flex align-center py-8 px-0 mx-5 " size="xsmall"  variant="plain" flat>
                    <v-icon size="35">mdi-chevron-left</v-icon>
                </v-btn>
                <h1 class="text-center text-h1 font-weight-medium">
                    20:20
                </h1>
                <v-btn class="d-flex align-center py-8 px-0 mx-5"  size="xsmall" variant="plain" flat>
                    <v-icon size="35">mdi-chevron-right</v-icon>
                </v-btn>
            </div>
            <h4 class="text-center mt-3 font-weight-medium">Session 1/4</h4>
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
            <v-btn variant="elevated" class="text-capitalize px-10" color="primary" size="large" prepend-icon="mdi-play">Start</v-btn>
        </v-card-actions>
    </v-card>
    <!-- <v-card  class="h-75  rounded-lg pa-5 bg-yellow-lighten-4 d-flex align-center justify-center flex-column" flat>
        <v-avatar size="200" class="rounded-0 mb-10">
            <v-img src="/award.png"></v-img>
        </v-avatar>
        <h2 class="text-center">Congratulation you're being productive productive</h2>
    </v-card> -->
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>