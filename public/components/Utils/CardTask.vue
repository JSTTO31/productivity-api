<template>
    <utils-card :show-card="showTask" title="Todo List" icon="mdi-list-status" :width="width" key="task"
        @close="emits('update:showTask', false)" @minimize="emits('update:showTask', false)" :height="450">
        <template #default="props">
            <v-card v-bind="props" class="rounded-0" style="overflow-y: auto;">
                <v-card-text>
                    <div class="d-flex align-center mb-1" v-if="!collapse">
                        <v-text-field prepend-inner-icon="mdi-plus" label="Add your new task..." variant="outlined"
                            hide-details density="compact" v-model="text" @keyup.enter="add_task"
                            single-line></v-text-field>
                    </div>
                    <v-list class="bg-transparent mb-2" v-if="!collapse">
                        <v-list-item v-for="task in tasks" :key="task.id" class="rounded mb-1 "
                            :prepend-icon="task.is_check ? 'mdi-checkbox-marked' : 'mdi-checkbox-blank-outline'"
                            :color="task.is_check ? 'primary' : ''" active :variant="task.is_check ? 'elevated' : 'text'"
                            @click="task.is_check = !task.is_check">
                            <span :class="task.is_check ? 'text-decoration-line-through' : ''">{{ task.title }} </span>
                            <template #append>
                                <v-btn icon="mdi-close" size="small" variant="text"
                                    @click.stop="remove_task(task.id)"></v-btn>
                            </template>
                        </v-list-item>
                    </v-list>
                    <div class="d-flex align-center" v-if="tasks.length">
                        <span v-if="pending_count">You have {{ pending_count }} pending tasks</span>
                        <span v-else>You have completed your tasks</span>
                        <v-spacer></v-spacer>
                        <v-btn class="text-capitalize" size="small" @click="tasks = []">clear all</v-btn>
                    </div>
                </v-card-text>
            </v-card>
        </template>
    </utils-card>
</template> 
<script setup lang="ts">
const props = defineProps(['showTask'])
const emits = defineEmits(['update:showTask'])
const width = 400, height = 200
const collapse = ref(false)
const tasks = ref<{ id: number, title: string, is_check: boolean }[]>([])
const text = ref('')
const pending_count = computed(() => tasks.value.filter(item => !item.is_check).length)
const add_task = () => {
    if (!text.value || tasks.value.length >= 10) return

    tasks.value.push({
        id: (tasks.value[tasks.value.length - 1]?.id || 0) + 1,
        title: text.value,
        is_check: false
    })

    text.value = ''
}

const remove_task = (id: number) => {
    tasks.value = tasks.value.filter(item => item.id != id)
}

onMounted(() => {
      const content = document.getElementById('Todo List-container')

      if(content){

        content.style.position = 'fixed';
        content.style.top = '18%';
        content.style.left = '36%';

      }





})

</script>
 
<style scoped></style>