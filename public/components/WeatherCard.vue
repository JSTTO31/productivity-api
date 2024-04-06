<template>
    <v-card class="d-flex ma-4 pb-0 flex-column text-white pa-8 align-center rounded-lg weather-card-animate-opacity"
        style="position: relative;" variant="tonal">
        <div>
            <h2 class="font-weight-bold">Metro Manila, Malabon City</h2>
            <h4 class=" font-weight-medium">Partly Cloudy</h4>
            <div class="d-flex align-center justify-space-between ">
                <h1 style="font-family: 'lato';font-size: 110px;font-weight: 600;">
                    25&#xb0;
                </h1>
                <!-- <v-icon size="120">mdi-weather-cloudy</v-icon> -->
                <v-avatar size="115" class="rounded-0">
                    <v-img src="/weather/partly-cloudy.png"></v-img>
                </v-avatar>
            </div>
            <div class="d-flex mt-3 rounded-lg align-center justify-space-between">
                
                <div style="font-size: 22px;font-weight: 500;">
                    <v-icon>mdi-weather-windy</v-icon>
                    123 km/h
                </div>
                <div style="font-size: 22px;font-weight: 500;">
                    <v-icon>mdi-weather-hail</v-icon>
                    25%
                </div>
            </div>
            <div class="mt-5">
                <v-row class="d-flex w-100 ma-0 pa-0 font-weight-bold text-subtitle-1 mb-2" v-for="weather in weathers.slice(3)" :key="weather.label">
                    <v-col col="5" class="px-0 py-2">
                        {{ weather.label }}
                    </v-col>
                    <v-col col="2" class="d-flex px-0 py-2 justify-center">
                        {{ weather.deg }}&#xb0
                    </v-col>
                    <v-col class="d-flex px-0 py-2">
                        <v-spacer></v-spacer>
                        <v-icon>{{ weather.icon }}</v-icon>
                    </v-col>
                </v-row>
            </div>
        </div>
        
        <!-- <div class="pt-10">
            <v-card class="rounded-xl pa-2 px-5 bg-white" variant="tonal">
                <v-row class="d-flex w-100 ma-0 pa-0 font-weight-bold text-subtitle-1 mb-2" v-for="weather in weathers" :key="weather.label">
                    <v-col col="5" class="px-0 py-2">
                        {{ weather.label }}
                    </v-col>
                    <v-col col="2" class="d-flex px-0 py-2 justify-center">
                        {{ weather.deg }}&#xb0
                    </v-col>
                    <v-col class="d-flex px-0 py-2">
                        <v-spacer></v-spacer>
                        <v-icon>{{ weather.icon }}</v-icon>
                    </v-col>
                </v-row>
            </v-card>
        </div> -->
    </v-card>
</template>

<script setup lang="ts">
const weathers = [
    {
        label: 'Sunday',
        deg: '27',
        icon: 'mdi-weather-cloudy'
    },
    {
        label: 'Monday',
        deg: '25',
        icon: 'mdi-weather-cloudy'
    },
    {
        label: 'Tuesday',
        deg: '20',
        icon: 'mdi-weather-rainy'
    },
    {
        label: 'Wednesday',
        deg: '32',
        icon: 'mdi-weather-hazy'
    },
    {
        label: 'Thursday',
        deg: '35',
        icon: 'mdi-weather-sunny'
    },
]


</script>

<style scoped>
.weather-card-animate-opacity {
    transition: opacity .6s ease;
    /* opacity: .4; */

}

.weather-card-animate-opacity:hover {
    opacity: 1;
}</style>