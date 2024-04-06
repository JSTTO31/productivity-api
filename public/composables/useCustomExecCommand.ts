

export default function useCustomExecCommand(value: string){
    const selection = window.getSelection()
    const range = selection?.getRangeAt(0)
    const selectedText = range?.toString()

    //@ts-ignore
    if(!range || range.commonAncestorContainer?.data === undefined) return
    

    switch(value){
        case 'code' : break;
        default: 
            const current_parent = range.commonAncestorContainer.parentElement
            let hasElement = false
            let isRoot = false;
            let parent = range.commonAncestorContainer.parentElement
            //@ts-ignore
            hasElement = parent.nodeName.toLowerCase() ==  value
            
            // find the parent already have the given element
            while(!hasElement && !isRoot){
                if(parent?.attributes.getNamedItem('contenteditable')?.value){
                    isRoot = true
                    continue
                }
                //@ts-ignore
                parent = parent.parentElement
                hasElement = parent?.nodeName.toLowerCase() ==  value
            }


            if(!hasElement){
                const element = document.createElement(value)
                element.textContent = selectedText || ''
                range?.deleteContents()
                range?.insertNode(element)
            }else{
                parent?.replaceWith(...parent.childNodes)
            }

    }
}