<template>
    <v-card class="mb-3 rounded bg-surface task" :disabled="!havePermission" style="z-index: 100 !important;cursor:pointer"
        :id="task._id || task.tempId"
        @click="$router.push({ query: { task: task?._id || task.tempId, section: section?._id || section.tempId } })">
        <!-- <v-card class="rounded-lg ma-2 mt-2 mb-3" flat>
            <v-img :src="'https://source.unsplash.com/random/500x200/?collaboration&' + task.title"></v-img>
        </v-card> -->
        <v-card class="d-flex handle align-center justify-center rounded-lg" flat>
            <v-icon>mdi-dots-horizontal</v-icon>
        </v-card>
        <v-divider></v-divider>
        <div class="pa-3 pt-0">
            <div class="d-flex align-center">
                <p class="font-weight-medium text-subtitle-1">{{ title }}</p>
                <v-spacer></v-spacer>
                <!-- <v-progress-circular :model-value="25" size="20"></v-progress-circular> -->
                <v-btn size="" variant="text" @mousedown.stop @click.stop="ToggleCompleted" color="success" v-if="task.completed"
                    icon="mdi-check-decagram"></v-btn>
                <v-btn size="" variant="text" @mousedown.stop @click.stop="ToggleCompleted" v-else
                    icon="mdi-check-decagram-outline"></v-btn>
            </div>
            <p class="text-caption font-weight-regular mt-1">{{ description }}</p>
            <div class="d-flex mt-2" style="gap: 10px;">
                <v-chip size="small" prepend-icon="mdi-calendar" class="mb-1 text-capitalize rounded" color="success">{{
        timeAgo }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded" color="info"
                    v-if="task.priority == 'low'">{{ task.priority }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded"
                    color="warning" v-else-if="task.priority == 'medium'">{{ task.priority }}</v-chip>
                <v-chip size="small" prepend-icon="mdi-flag-outline" class="mb-1 text-capitalize rounded" color="error"
                    v-else>{{ task.priority }}</v-chip>
            </div>
            <v-divider class="my-1"></v-divider>
            <div class="d-flex align-center" v-if="task.assignees.length > 0">
                <v-card v-for="assignee in  task.assignees" :key="assignee.email" class="rounded-circle mr-n5 border" flat>
                    <v-avatar class="border" size="30">
                        <v-img :src="assignee.picture"></v-img>
                    </v-avatar>
                </v-card>
                <v-spacer></v-spacer>

                <v-chip :prepend-icon="isWatcher ? 'mdi-eye-outline' : 'mdi-eye-off-outline'" variant="text"
                    size="small" class="mr-2 text-capitalize rounded">Watch</v-chip>
                <v-badge :content="task.notes ? task.notes.length : 0" location="right" inline>
                    <v-chip prepend-icon="mdi-note-text-outline" variant="text" size="small"
                        class="text-capitalize rounded">Notes</v-chip>
                </v-badge>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import type { SectionType, TaskType } from '~/stores/project';
const props = defineProps<{ task: TaskType, section: SectionType }>()
const timeAgo = computed(() => useTimeAgo(new Date(props.task.dueDate)).value.match(/hours|hour|second|seconds|minute|minutes/ig) ? 'Due Today' : useTimeAgo(new Date(props.task.dueDate)).value)
const { project } = storeToRefs(useProjectStore())
const title = computed(() => props.task.title.length > 25 ? props.task.title.substring(0, 25) + '...' : props.task.title)
const description = computed(() => props.task.description.length > 70 ? props.task.description.substring(0, 70) + '...' : props.task.description)
const { user } = storeToRefs(useUserStore())
const { role } = storeToRefs(useProjectStore())
const havePermission = computed(() => props.task.assignees.some(item => item._id == user.value?._id || role.value == 'admin' || role.value == 'owner'))
const $notification = useNotificationStore()
const ToggleCompleted = () => {
    if (props.task.completed) {
        props.task.completed = false
    } else {
        useConfetti()
        props.task.completed = true
        const title = "Task Completed"
        const message = "Great job! You have successfully completed the task. 🎉😊"
        const type = "success"
        $notification.add(title, message, type)

    }
}
const isWatcher = computed(() => props.task.watchBy.some(item => item == user.value?._id))

function mousedown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const sectionsContainer = document.getElementById('sections-container')
    //@ts-ignore
    const card: HTMLElement = document.getElementById(props.task?._id || props.task?.tempId) as HTMLElement
    //@ts-ignore
    const handle = card.querySelector('.handle') as HTMLElement
    //@ts-ignore
    const parentSection: HTMLElement = document.getElementById(props.section?._id || props.section?.tempId) as HTMLElement
    const sections = document.getElementsByClassName('section')
    let pos1: number, pos2: number, pos3: number, pos4: number
    let currentPositionLeft = card.getBoundingClientRect().x
    let currentPositionTop = card.getBoundingClientRect().y
    let beforeSectionIndex = Math.floor(currentPositionLeft / card.clientWidth)
    let afterSectionIndex = Math.floor(currentPositionLeft / card.clientWidth)
    pos1 = e.clientX
    pos2 = e.clientY

    parentSection.style.zIndex = '1000'
    card.style.transform = 'rotate(-5deg)'
    card.style.zIndex = '1000'
    handle.style.cursor = 'grabbing'


    document.onmousemove = dragElement
    document.onmouseup = (e) => {
        e.preventDefault()
        document.onmousemove = null
        document.onmouseup = null
        card.style.position = 'static'
        card.style.top = currentPositionTop + 'px'
        card.style.left = currentPositionLeft + 'px'
        card.style.transform = 'rotate(0deg)'
        card.style.boxShadow = 'none'
        card.style.zIndex = '100'
        handle.style.cursor = 'default'

        parentSection.style.zIndex = '100'

        // remove dummy and push new position
        if (sections[afterSectionIndex]) {
            const currentSectionTaskContainer = sections[afterSectionIndex].querySelector('.task-container')
            if (currentSectionTaskContainer) {
                const findDummyIndex = Array.from(currentSectionTaskContainer.children).findIndex((element) => element.classList.contains('dummy'))
                if (findDummyIndex > -1) {
                    currentSectionTaskContainer.removeChild(currentSectionTaskContainer.children[findDummyIndex])
                    if (project.value) {
                        const section = project.value.sections[afterSectionIndex]
                        if (section) {
                            const tempTask = props.task
                            props.section.tasks = props.section.tasks.filter(task => (task._id && task._id != props.task._id) || (task.tempId && task.tempId != props.task.tempId))
                            section.tasks.splice(findDummyIndex, 0, tempTask)
                        }
                    }
                }
            }

        }
    }

    function dragElement(e: MouseEvent) {
        e.preventDefault()
        pos3 = e.clientX - pos1
        pos4 = e.clientY - pos2
        pos1 = e.clientX
        pos2 = e.clientY

        card.style.width = card.clientWidth + 'px'
        card.style.position = 'fixed'
        card.style.boxShadow = '2px 2px 5px rgba(0,0,0,.5)'
        currentPositionTop += pos4
        currentPositionLeft += pos3
        card.style.top = (currentPositionTop) + 'px'
        card.style.left = (currentPositionLeft) + 'px'

        beforeSectionIndex = afterSectionIndex
        afterSectionIndex = Math.floor((currentPositionLeft + (sectionsContainer?.scrollLeft || 0) - (card.clientWidth / 2)) / card.clientWidth)

        const currentSection = sections[afterSectionIndex]


        if (currentSection) {
            const currentSectionTaskContainer = currentSection.querySelector('.task-container')

            if (beforeSectionIndex != afterSectionIndex) {
                const beforeSection = sections[beforeSectionIndex]
                const beforeSectionTaskContainer = beforeSection.querySelector('.task-container')
                if (beforeSectionTaskContainer) {
                    const findDummyCard = Array.from(beforeSectionTaskContainer.children).find(element => element.classList.contains('dummy'))
                    if (findDummyCard) {
                        beforeSectionTaskContainer.removeChild(findDummyCard)
                    }
                }
            }



            if (currentSectionTaskContainer) {
                if (currentSectionTaskContainer.childElementCount > 1) {
                    const findClosestTaskCard = Array.from(currentSectionTaskContainer.children).find(element => (element.getBoundingClientRect().y >= currentPositionTop))
                    const findDummyCard = Array.from(currentSectionTaskContainer.children).find(element => element.classList.contains('dummy'))

                    if (findDummyCard && (findClosestTaskCard && !findClosestTaskCard.classList.contains('dummy'))) {
                        currentSectionTaskContainer.removeChild(findDummyCard)
                    }

                    if (findClosestTaskCard && (findClosestTaskCard && !findClosestTaskCard.classList.contains('dummy'))) {
                        const div = document.createElement('div')
                        div.style.height = card.clientHeight + 'px'
                        div.style.background = 'rgba(0,0,0,.5)'
                        div.style.borderRadius = '5px'
                        div.style.marginBottom = '10px'
                        div.classList.add('dummy')
                        currentSectionTaskContainer.insertBefore(div, findClosestTaskCard)
                    }



                } else {
                    const div = document.createElement('div')
                    div.style.height = card.clientHeight + 'px'
                    div.style.background = 'rgba(0,0,0,.5)'
                    div.style.borderRadius = '5px'
                    div.style.marginBottom = '10px'
                    div.classList.add('dummy')
                    currentSectionTaskContainer.prepend(div)
                }
            }
        }
    }
}

onMounted(() => {
    //@ts-ignore
    const card : HTMLElement = document.getElementById(props.task._id || props.task.tempId) as HTMLElement
    const handle = card.querySelector('.handle') as HTMLElement
    
    if (handle && handle.parentElement) {
        handle.onclick = (e) => e.stopPropagation()
        handle.onmousedown = mousedown
    }
})
</script>

<style scoped>
.handle{
    cursor: grab;
}
</style>