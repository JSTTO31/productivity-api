import { useUserStore } from "~/stores/user"


export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const {user} = storeToRefs(useUserStore())
        if(!user.value){
            return navigateTo('/')
        }
        const newUser = localStorage.getItem('newUser')
        if(!newUser){
            return navigateTo('/setting-up')
        }
    }
})