import type { UseFetchOptions } from "nuxt/dist/app/composables"


export default (url: string, options: UseFetchOptions<ResponseType>) => {
    return useFetch('/api' + url, {
        watch: false,
        onResponseError(event){
            const $notification = useNotificationStore()
            if(event.response.status == 401){
                const title = 'Unauthorize Action'
                const message = 'You are not authorized to perform this action. Please contact your administrator for assistance.'
                $notification.add(title, message, 'error')
            }else{
                const title = 'Request Error'
                const message = 'Oops! Something went wrong with your request. Please try again later.'
                $notification.add(title, message, 'error')
            }

            return false
        }, 
        ...options,
        credentials: 'include'
    })
}