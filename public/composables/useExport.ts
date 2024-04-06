

export default function(activator: HTMLLinkElement,element: HTMLElement){
    const preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    const postHtml = '</body></html>'
    const content = preHtml + element.innerHTML + postHtml
    const url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(content)

    activator.href = url
    //@ts-ignore
    activator.download = 'AntiProcrastining.doc';
    activator.click()
}