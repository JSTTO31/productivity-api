export default function (sectionData: SectionType) {
  const {project} = storeToRefs(useProjectStore())
  const parents = document.getElementsByClassName("section-parent");
  const sections = document.getElementsByClassName("section");
  const section: HTMLElement = document.getElementById(
    //@ts-ignore
    sectionData._id || sectionData.tempId
  ) as HTMLElement;

  if (section) {
    section.onmousedown = mousedown;

    function mousedown(e: MouseEvent) {
      e.preventDefault();
      const currentPositionX = section.offsetLeft;
      let direction: null | "left" | "right" = null;
      let positionRight = section.getBoundingClientRect().right;
      let positionLeft = section.getBoundingClientRect().left;
      let sectionIndex = parseInt(
        section.getAttribute("data-section-order") as string
      );
      let index = parseInt(
        section.getAttribute("data-section-order") as string
      );
      section.style.cursor = "grabbing";
      //@ts-ignore
      section.parentElement.style.background = 'rgba(0, 0, 0, 0.3)'

      document.onmousemove = dragElement;
      document.onmouseup = mouseup;
     

      function dragElement(e: MouseEvent) {
        e.preventDefault();
        // target section styles
        section.style.position = "absolute";
        section.style.left = section.offsetLeft + e.movementX + "px";
        section.style.width = section.clientWidth + "px";
        section.style.background = "rgba(0,0,0,.5)";
        section.style.zIndex = "500";
        // the direction of the movement
        direction = e.movementX > 0 ? "right" : e.movementX < 0 ? "left" : null;
        positionRight =
          section.getBoundingClientRect().right - section.clientWidth / 2;
        positionLeft =
          section.getBoundingClientRect().left + section.clientWidth / 2;

        //@ts-ignore
        Array.from(sections).forEach((item: HTMLElement) => {
          if (
            positionRight > item.getBoundingClientRect().left &&
            item.id != (sectionData._id || sectionData.tempId)
          ) {
            const order = parseInt(
              item.getAttribute("data-section-order") as string
            );
            if (direction == "right" && sectionIndex < order) {
              item.style.left = item.offsetLeft - item.getBoundingClientRect().width + "px";
              item.setAttribute("data-section-order", sectionIndex.toString());
              sectionIndex = order
            }
          }

          if (
            positionLeft < item.getBoundingClientRect().right &&
            item.id != (sectionData._id || sectionData.tempId)
          ) {
            const order = parseInt(
              item.getAttribute("data-section-order") as string
            );

            if (direction == "left" && sectionIndex > order) {
              item.style.left =
                item.offsetLeft + item.getBoundingClientRect().width + "px";
              item.setAttribute("data-section-order", sectionIndex.toString());
              sectionIndex = order;
            }
          }

          Array.from(parents).forEach(item => {
            const element = item as HTMLElement 
            const parentOrder = parseInt(element.getAttribute('data-parent-order') as string)
            element.style.background = 'none'
            if(parentOrder == sectionIndex){
                element.style.background = 'rgba(0,0,0,.3)'
            }
          })
        });
      }

      function mouseup() {
        document.onmousemove = null;
        document.onmouseup = null;
        section.style.left = currentPositionX + "px";
        section.style.background = "rgba(0,0,0,.1)";
        section.style.zIndex = "100";
      section.style.cursor = "default";
      Array.from(sections).forEach((item, index) => {
        const element = item as HTMLElement;
        element.style.left = 0 + "px";
        //@ts-ignore
        element.parentElement.style.background = 'none'
        element.setAttribute('data-section-order', index.toString())
      });
        //@ts-ignore
        const tempSection = project.value?.sections[sectionIndex];
        //@ts-ignore
        project.value.sections[sectionIndex] = project.value.sections[index];
        //@ts-ignore
        project.value.sections[index] = tempSection;

      }
    }
  }
}
