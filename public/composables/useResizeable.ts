

export default function(container: HTMLElement){
    const width = 400, height = 250

    if(container){
        const resizers = ['right', 'top', 'left', 'bottom'];
        const edgesResizers = ['top-right', 'top-left', 'bottom-left', 'bottom-right'];
        // container.style.width = width + 'px'
        // container.style.height = height + 'px'

        resizers.forEach((resizer: string, key: number) : void => {
            const element = document.createElement('span')
            element.style.position = 'absolute'
            //@ts-ignore
            element.style[resizer == 'top' || resizer == 'bottom' ? 'left' : resizer] = '0'
            //@ts-ignore
            element.style[resizer == 'left' || resizer == 'right' ? 'top' : resizer] = '0'
            element.style.backgroundColor = 'transparent'
            element.style.cursor = 'ew-resize'
            element.style.zIndex = '1000'

            if(resizer == 'bottom' || resizer == 'top'){
                element.style.height = '5px'
                element.style.width = '100%'
                element.style.cursor = 'ns-resize'
            }else{
                element.style.width = '5px'
                element.style.height = '100%'
                element.style.cursor = 'ew-resize'
            }

            let pos1: number, pos2 : number;

            element.onmousedown = function(e: MouseEvent){
                e = e || window.Event 
                e.preventDefault()
                pos1 = resizer == 'bottom' || resizer == 'top' ? e.clientY : e.clientX
                document.onmousemove = (e: MouseEvent) => {
                    e.preventDefault()

                    switch(resizer){
                        case 'right' : 
                            pos2 = e.clientX - pos1
                            pos1 = e.clientX    
                            
                            if(container.clientWidth + pos2 < width) return
                            container.style.width = container.clientWidth + pos2 + 'px'
                        break;
                        case 'left' : 
                            pos2 = e.clientX - pos1
                            pos1 = e.clientX
                            if(container.clientWidth - pos2 < width) return
                            container.style.left = container.offsetLeft + pos2 + 'px'
                            container.style.width = container.clientWidth - pos2 + 'px'
                        break
                        case 'bottom' : 
                            pos2 = e.clientY - pos1
                            pos1 = e.clientY
                            if(container.clientHeight + pos2 < height) return
                            container.style.height = container.clientHeight + pos2 + 'px'
                        break;
                        case 'top' : 
                            pos2 = e.clientY - pos1
                            pos1 = e.clientY
                            if(container.clientHeight - pos2 < height) return
                            container.style.top = container.offsetTop + pos2 + 'px'
                            container.style.height = container.clientHeight - pos2 + 'px'
                        break;
                    }
                }
            }

            container.appendChild(element)
        })

        edgesResizers.forEach((resizer: string) => {
            const element = document.createElement('span')
            element.style.width = "15px"
            element.style.height = "15px"
            element.style.backgroundColor = "transparent"
            element.style.position = "absolute"
            element.style.zIndex = '1000'


            switch(resizer){
                case 'top-right': 
                    element.style.top = '0px'
                    element.style.right = '0px'
                    element.style.cursor = 'ne-resize'
                    var posx1 : number, posx2: number, posy1: number, posy2;
                    element.onmousedown = function(e: MouseEvent){
                        e = e || window.Event
                        e.preventDefault()
                        posx1 = e.clientX
                        posy1 = e.clientY

                        document.onmousemove = function(e: MouseEvent){
                            posx2 = e.clientX - posx1
                            posx1 = e.clientX
                            posy2 = e.clientY - posy1
                            posy1 = e.clientY
                            if(container.clientWidth + posx2 < width || container.clientHeight - posy2  < height)return
                            container.style.width = container.clientWidth + posx2 + 'px'
                            container.style.height = container.clientHeight - posy2 + 'px'
                            container.style.top = container.offsetTop + posy2 + 'px'
                        }


                    }
                break;
                case 'top-left': 
                    element.style.top = '0px'
                    element.style.left = '0px'
                    element.style.cursor = 'nw-resize'
                    var posx1 : number, posx2: number, posy1: number, posy2;
                    element.onmousedown = function(e: MouseEvent){
                        e = e || window.Event
                        e.preventDefault()
                        posx1 = e.clientX
                        posy1 = e.clientY

                        document.onmousemove = function(e: MouseEvent){
                            posx2 = e.clientX - posx1
                            posx1 = e.clientX
                            posy2 = e.clientY - posy1
                            posy1 = e.clientY
                            if(container.clientWidth - posx2 < width || container.clientHeight - posy2  < height)return
                            container.style.width = container.clientWidth - posx2 + 'px'
                            container.style.height = container.clientHeight - posy2 + 'px'
                            container.style.top = container.offsetTop + posy2 + 'px'
                            container.style.left = container.offsetLeft + posx2 + 'px'
                        }


                    }
                break;
                case 'bottom-right': 
                    element.style.bottom = '0px'
                    element.style.right = '0px'
                    element.style.cursor = 'se-resize'
                    var posx1 : number, posx2: number, posy1: number, posy2;
                    element.onmousedown = function(e: MouseEvent){
                        e = e || window.Event
                        e.preventDefault()
                        posx1 = e.clientX
                        posy1 = e.clientY
                        
                        document.onmousemove = function(e: MouseEvent){
                            posx2 = e.clientX - posx1
                            posx1 = e.clientX
                            posy2 = e.clientY - posy1
                            posy1 = e.clientY
                            if(container.clientWidth + posx2 < width || container.clientHeight + posy2  < height)return

                            container.style.width = container.clientWidth + posx2 + 'px'
                            container.style.height = container.clientHeight + posy2 + 'px'
                        }

                    }
                break;
                case 'bottom-left': 
                    element.style.bottom = '0px'
                    element.style.left = '0px'
                    element.style.cursor = 'sw-resize'
                    var posx1 : number, posx2: number, posy1: number, posy2;
                    element.onmousedown = function(e: MouseEvent){
                        e = e || window.Event
                        e.preventDefault()
                        posx1 = e.clientX
                        posy1 = e.clientY

                        document.onmousemove = function(e: MouseEvent){
                            posx2 = e.clientX - posx1
                            posx1 = e.clientX
                            posy2 = e.clientY - posy1
                            posy1 = e.clientY
                            if(container.clientWidth - posx2 < width || container.clientHeight + posy2  < height)return
                            container.style.width = container.clientWidth - posx2 + 'px'
                            container.style.height = container.clientHeight + posy2 + 'px'
                            container.style.left = container.offsetLeft + posx2 + 'px'
                        }


                    }
                break;
            }


            container.appendChild(element)
        })

        container.onmouseup = function(e: MouseEvent){
            document.onmousemove = null
        }
        document.onmouseup = function(e: MouseEvent){
            document.onmousemove = null
        }

    }
}