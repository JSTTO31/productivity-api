export default function dragElement(element: HTMLElement){
    const isDrag = ref(false)
    let containerWidth : number = 0, containerHeight: number = 0;
    const main = document.getElementById('main')
    let markerCard : HTMLDivElement | null = null
    
    // function setPosition(e:MouseEvent, container: HTMLElement){
    //     const clientY = e.clientY + 48.8
    //     const clientX = e.clientX 
    //     const windowHeightHalf = (window.innerHeight - 48.8) / 2
    //     const windowWidthHalf = window.innerWidth / 2


    //     let containerWidth = window.innerWidth + 'px'
    //     let containerHeight = window.innerHeight + 'px'
    //     let containerPositionLeft = 'auto'
    //     let containerPositionRight = 'auto'
    //     let containerPositionBottom = 'auto'
    //     let containerPositionTop = 'auto'


    //     if(e.clientX <= 0){
    //         containerWidth = window.innerWidth / 2 + 'px'
    //         containerPositionLeft = '0'
            

    //         if(clientY > windowHeightHalf + 150){
    //             containerPositionTop = windowHeightHalf + 48.8 + 'px'
    //             containerHeight = windowHeightHalf + 'px'
    //         }else if(clientY < windowHeightHalf - 150){
    //             containerPositionTop =  48.8 + 'px'
    //             containerHeight =  windowHeightHalf + 'px'
    //         }else{
    //             containerPositionTop = 48.8 + 'px'
    //             containerHeight = window.innerHeight - 48.8 + 'px'
    //         }

    //     }else if(e.clientX >= (window.innerWidth - 5)){
    //         containerPositionTop = 48.8 + 'px'
    //         containerPositionRight = '0'
    //         containerHeight = window.innerHeight - 48.8 + 'px'
    //         containerWidth = window.innerWidth / 2 + 'px'

    //         const clientY = e.clientY + 48.8
    //         const windowHeightHalf = (window.innerHeight - 48.8) / 2

    //         if(clientY > windowHeightHalf + 150){
    //             containerPositionTop = windowHeightHalf + 48.8 + 'px'
    //             containerHeight = windowHeightHalf + 'px'
    //         }else if(clientY < windowHeightHalf - 150){
    //             containerPositionTop = 48.8 + 'px'
    //             containerHeight =  windowHeightHalf + 'px'
    //         }else{
    //             containerPositionTop = 48.8 + 'px'
    //             containerHeight = window.innerHeight- 48.8 + 'px'
    //         }
    //     }else if(e.clientY >= 48.8){
    //         containerPositionBottom = '0'
    //         containerHeight = (window.innerHeight - 48.8) / 2 + 'px'

    //         if(clientX >= windowWidthHalf + 150){
    //             containerPositionLeft = windowWidthHalf + 'px';
    //             containerWidth = window.innerWidth / 2 + 'px'
    //         }else if(clientX <= windowWidthHalf - 150){
    //             containerPositionLeft =  '0';
    //             containerWidth = window.innerWidth / 2 + 'px'
    //         }else{
    //             containerPositionLeft = '0'
    //             containerWidth = window.innerWidth + 'px'
    //         }
            
    //     }else if(e.clientY <= window.innerHeight){
    //         containerPositionTop = 48.8 + 'px'
    //         containerPositionLeft = '0'
    //         containerHeight = (window.innerHeight - 48.8) / 2 + 'px'
            
    //         if(clientX >= windowWidthHalf + 150){
    //             containerPositionLeft = windowWidthHalf + 'px';
    //             containerWidth = window.innerWidth / 2 + 'px'
    //         }else if(clientX <= windowWidthHalf - 150){
    //             containerPositionLeft =  '0';
    //             containerWidth = window.innerWidth / 2 + 'px'
    //         }else{
    //             containerPositionLeft = '0'
    //             containerWidth = window.innerWidth + 'px'
    //         }
    //     }

    //     container.style.left = containerPositionLeft
    //     container.style.right = containerPositionRight
    //     container.style.bottom = containerPositionBottom
    //     container.style.top = containerPositionTop
    //     container.style.width = containerWidth
    //     container.style.height = containerHeight


    // }

    // function showMarkerCard(e: MouseEvent){
    //     const container = document.createElement('div')
    //     const child = document.createElement('div')
    //     container.classList.add('marker')

    //     container.style.position = 'fixed'
    //     container.style.padding = '8px 8px 8px 8px'
    //     container.style.zIndex = window.getComputedStyle(element).zIndex
    //     setPosition(e, container)
    //     child.style.height = '100%'
    //     child.style.width = '100%'
    //     child.style.borderRadius = '10px'
    //     child.style.background = 'rgb(var(--v-theme-background))'
    //     child.style.boxShadow = '1px -1px 14px 0px rgba(0,0,0,0.75)'
    //     child.style.filter = 'brightness(90%)'
    //     container.appendChild(child)



    //     if(main){
    //         main.prepend(container)
    //     }

    //     markerCard = container
    // }

    // function removeCardMarker(){
    //     if(main && markerCard){
    //         main.removeChild(markerCard)
    //         markerCard = null
    //     }
    // }

    if(element){
        containerWidth = parseInt(element.getAttribute('element-width-data') || '0')
        containerHeight = parseInt(element.getAttribute('element-height-data') || '0')
    }

    const header = document.getElementById(element.id + '-header')
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0

    if(header){
        header.onmousedown = dragMouseDown
    }else{
        element.onmousedown = dragMouseDown
    }

    function dragMouseDown(e: MouseEvent){
        e = e || window.Event
        e.preventDefault()
        pos3 = e.clientX
        pos4 = e.clientY
        
        
        if(header){
            header.style.cursor = 'grabbing'
        }
        
        
        document.onmousemove = elementDrag
        document.onmouseup = (e: MouseEvent) => {
            document.onmouseup = null
            document.onmousemove = null
            isDrag.value = false
            if(markerCard){
                // setPosition(e, element)
                element.classList.remove('rounded-lg')
                element.classList.add('rounded-0')
                // element.classList.add('border')
            }
            if(header){
                header.style.cursor = 'grab'
            }
            
            // removeCardMarker()
        }
    }

    function elementDrag(e: MouseEvent){
        e = e || window.Event
        e.preventDefault()
        isDrag.value = true
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX
        pos4 = e.clientY

        e.stopPropagation()

        if(e.clientX <= 0 || e.clientX >= (window.innerWidth - 5) || e.clientY >= window.innerHeight || e.clientY  <= 48.8){
            if(!markerCard){
                // showMarkerCard(e)
            }else{
                // setPosition(e, markerCard)
            }
        }else{
            if(markerCard){
                // removeCardMarker()
            }
        }


        element.classList.remove('rounded-0')
        // element.classList.remove('border')
        element.classList.add('rounded-lg')
          
        if(element.clientWidth == (window.innerWidth) && element.offsetLeft == 0 && element.offsetTop == 48){
            const currentMousePositionX = e.clientX
            element.style.width = containerWidth + 'px'
            element.style.height = containerHeight + 'px'
            element.style.left = (currentMousePositionX) - (containerWidth * (currentMousePositionX / (window.innerWidth))) + 'px'
        }  

        element.style.top = (element.offsetTop - pos2) + 'px'
        element.style.left = (element.offsetLeft - pos1) + 'px'
        isDrag.value = true
    }

    return {isDrag}
}