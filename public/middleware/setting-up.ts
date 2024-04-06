import { useUserStore } from "~/stores/user"


export default defineNuxtRouteMiddleware((to, from) => {
    if(process.client){
        const newUser = localStorage.getItem('newUser')
        if(newUser){
            return navigateTo('/r/access/home')
        }
    }
})