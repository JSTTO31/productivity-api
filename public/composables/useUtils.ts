

export default function useUtilities(){
    let innerWidth = window.innerWidth
    let innerHeight = window.innerHeight

    function window_resize(element: HTMLElement){
        
        if(element){
            const currentCardWidth = element.clientWidth
            const currentCardHeight= element.clientHeight
           
            
            if(currentCardWidth == innerWidth || currentCardHeight == innerHeight - 48){
                const gapWidth = window.innerWidth - innerWidth
                const gapHeight = window.innerHeight - innerHeight
                const nextCardWidth = currentCardWidth + gapWidth
                const nextCardHeight = currentCardHeight + gapHeight
                element.style.width = nextCardWidth + 'px'
                element.style.height = nextCardHeight + 'px'
            }

            
            innerHeight = window.innerHeight
            innerWidth = window.innerWidth
            
    
            
        }
    }
    
    function maximize(elementId: string, parentId: string){
        const parent = document.getElementById(parentId)
        const element = document.getElementById(elementId)
        if(element){
            const currentWidth = element.clientWidth
            const currentHeight = element.clientHeight
            const windowWidth = window.innerWidth
            const windowHeight =  window.innerHeight - 48
            const isMaximize = currentWidth == windowWidth && currentHeight == windowHeight 

            if(parent){
                parent.style.top = isMaximize ? '50px' : '48px'
                parent.style.left = isMaximize ? '40px' : '0px'
            }else{
                element.style.top = isMaximize ? '50px' : '48px'
                element.style.left = isMaximize ? '40px' : '0px'
            }
            element.style.width = isMaximize ? '685px' :  windowWidth + 'px'
            element.style.height = isMaximize ? '600px' : windowHeight + 'px'
        }
    }

    return {
        window_resize, maximize
    }
}