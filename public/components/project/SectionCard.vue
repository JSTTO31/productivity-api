<template>
  <v-card class="h-100 w-100 rounded-0 section" style="background-color: rgba(0, 0, 0, 0.1); position: absolute;overflow: visible;z-index: 100 !important;"
    :id="section._id || section.tempId">
    <v-layout class="h-100 w-100 " style="overflow: visible;z-index: 100 !important;">
      <v-app-bar color="transparent" density="compact" class="text-white pl-4 pa-0" flat>
        <h4>
          <input @blur="showRename = false" @mousedown.stop="" ref="textField" type="text" v-model="section.title" class="text-white" v-if="showRename" />
          <span v-else>
            {{ section.title }} <v-chip size="small">{{ section.tasks.length }}</v-chip>
          </span>
        </h4>
        <v-spacer></v-spacer>
        <v-tooltip text="New Task">
          <template #activator="{ props }">
            <v-btn v-bind="props" variant="text" icon="mdi-plus" size="small" @click.stop="showCreateTaskDialog = true"
              @mousedown.stop></v-btn>
          </template>
        </v-tooltip>
        <v-menu>
          <template #activator="{ props }">
            <v-btn @mousedown.stop variant="text" v-bind="props" icon="mdi-dots-horizontal" size="small"></v-btn>
          </template>
          <v-list class="pa-2" @mousedown.stop>
            <v-list-item density="compact" prepend-icon="mdi-plus"
              class="text-subtitle-2 font-weight-regular rounded-lg mb-1" @click="showCreateTaskDialog = true">New
              Task</v-list-item>
            <v-list-item density="compact" prepend-icon="mdi-text-short"
              class="text-subtitle-2 font-weight-regular rounded-lg mb-1" @click="focus">Rename</v-list-item>
            <v-list-item @click="addSection('left')" density="compact" prepend-icon="mdi-arrow-left"
              class="text-subtitle-2 font-weight-regular rounded-lg mb-1">New section left</v-list-item>
            <v-list-item @click="addSection('right')" density="compact" prepend-icon="mdi-arrow-right"
              class="text-subtitle-2 font-weight-regular rounded-lg mb-1">New section right</v-list-item>
            <v-list-item v-if="section._id || section.tempId" @click="
            removeSection(
              //@ts-ignore
              section?._id || section?.tempId
            )
            " density="compact" color="error" prepend-icon="mdi-trash-can-outline"
              class="text-subtitle-2 font-weight-regular rounded-lg text-error">Delete</v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-main class="h-100">
        <div class="h-100 px-3 task-container pb-10" color="transparent" flat style="overflow-y: scroll">
          <project-list-card-item @mousedown.stop v-for="task in taskFilter" :key="task._id || task.tempId"
            :task="task" :section="section"></project-list-card-item>
          <v-btn class="text-capitalize text-white rounded-lg" color="background" variant="tonal"
            prepend-icon="mdi-plus" block @mousedown.stop @click.stop="showCreateTaskDialog = true">
            New Task
          </v-btn>
        </div>
      </v-main>
    </v-layout>
    <v-dialog no-click-animation fullscreen v-model="showCreateTaskDialog" persistent class="pa-15 bg-transparent"
      @mousedown.stop contained>
      <v-card class="bg-transparent pa-1 rounded-0">
        <project-create-new-task-card :section="section"
          @close="showCreateTaskDialog = false"></project-create-new-task-card>
      </v-card>
    </v-dialog>
  
  </v-card>
</template>

<script setup lang="ts">
const props = defineProps<{ section: SectionType }>();
const {user} = storeToRefs(useUserStore())
const { project, sectionSort, sectionFilter } = storeToRefs(useProjectStore());
const emits = defineEmits(["update:section"]);
const showRename = ref(false)
const textField = ref();
const taskFilter = computed(() => props.section.tasks.slice()
    .filter((task) => {
      let filter = true
      const search = new RegExp(`${sectionFilter.value.search}`,'i') 
      const isWatcher = task.watchBy.some(item => (user.value?._id && user.value?._id == item ))
      if(sectionFilter.value.search.length > 0 && !search.test(task.title)){
        filter = false
      }

      if(sectionFilter.value.complete.length < 2 && ((sectionFilter.value.complete[0] == 'completed' && !task.completed) || (sectionFilter.value.complete[0] == 'incomplete' && task.completed))){
        filter = false
      }

      if(sectionFilter.value.watch.length < 2 && ((sectionFilter.value.watch[0] == 'watching' && !isWatcher) || (sectionFilter.value.watch[0] == 'unwatching' && isWatcher))){
        filter = false
      }

      if(sectionFilter.value.priority.length > 0 && !sectionFilter.value.priority.some(item => item == task.priority))
      {
        filter = false
      }

      return filter
    })
    .sort((a,b) => {
        if(!sectionSort.value) return 1
        if(sectionSort.value == 'asc'){
          //@ts-ignore
          return new Date(a.dueDate) - new Date(b.dueDate)
        }else{
          //@ts-ignore
          return new Date(b.dueDate) - new Date(a.dueDate)

        }
}))

const showCreateTaskDialog = ref(false);
function removeSection(id: string) {
  if (project.value) {
    project.value.sections = project.value.sections.filter(
      (item) =>
        !((item._id && item._id == id) || (item.tempId && item.tempId == id))
    );
  }
}

function addSection(position: 'left' | 'right' | null){
  if(!project.value) return
  const tempId = useTempID(8)
  const findIndex = project.value.sections.findIndex(item => (item._id && item._id == props.section._id) || (item.tempId && item.tempId == props.section.tempId))
  sectionFilter.value.sections.push(tempId)
  if(findIndex > -1 && position == 'left'){
    project.value.sections.splice(findIndex, 0, { tempId, title: "New Section", tasks: [], order: project.value.sections.length })
  }

  if(findIndex > -1 && position == 'right'){
    project.value.sections.splice(findIndex + 1, 0, { tempId, title: "New Section", tasks: [], order: project.value.sections.length })

  }
}

function focus() {
  showRename.value = true
  let timer = setTimeout(() => {
    textField.value.select();
    clearTimeout(timer)
  }, 100);
}

onMounted(() => {
  useSectionDraggable(props.section);
});
</script>

<style scoped>
.task-container::-webkit-scrollbar {
  height: 10px;
  width: 10px;
}

.dragging {
  border: 2px dashed rgb(203 213 225);
  background-color: red;
}

.task-container::-webkit-scrollbar {
  width: 5px;
}

.task-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.432);
  border-radius: 25px;
}


</style>
