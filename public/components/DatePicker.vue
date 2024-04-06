<template>
    <!-- <v-menu :close-on-content-click="false" location="bottom right">
        <template #activator="{props}">
          
        </template>
        <v-card >
            <v-date-picker :model-value="new Date()" @update:model-value="$value => emits('update:date', $value)"  :hide-header="true"></v-date-picker>
        </v-card>
    </v-menu>  -->
    <div>
        <v-text-field :error-messages="errorMessage ? errorMessage : ''" readonly :model-value="new Date(date).toDateString()" style="cursor: pointer !important;" v-bind="props" @click="focus" variant="solo-filled" flat density="compact" prepend-inner-icon="mdi-calendar"></v-text-field>
        <input @change="changeDate" ref="calendar" class="mt-n5" type="date" :value="new Date(date).toISOString().substring(0, 10)" style="height: 0px;position: absolute" />
    </div>      
</template>

<script setup lang="ts">
const props = defineProps(['date', 'errorMessage'])
const emits = defineEmits(['update:date'])
const calendar = ref()
function focus(){
    calendar.value.showPicker()
}

function changeDate(e: any){
    emits('update:date', e.target.value)
}
</script>

<style scoped>

</style>