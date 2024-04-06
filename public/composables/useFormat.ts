export default function useFormat(id: string) {
  const state = useTextSelection();
  const fontFamilies = [
    "Arial, sans-serif",
    "Arial Black, sans-serif",
    "Book Antiqua, serif",
    "Courier, monospace",
    "Courier New, monospace",
    "Georgia, serif",
    "Helvetica, sans-serif",
    "Impact, sans-serif",
    "Lucida Console, monospace",
    "Lucida Sans Unicode, sans-serif",
    "Palatino Linotype, serif",
    "Tahoma, sans-serif",
    "Times New Roman, serif",
    "Trebuchet MS, sans-serif",
    "Verdana, sans-serif",
    "Comic Sans MS, cursive",
    "Garamond, serif",
    "Century Gothic, sans-serif",
    "Franklin Gothic Medium, sans-serif",
    "Gill Sans, sans-serif",
    "Optima, sans-serif",
    "Lucida Grande, sans-serif",
    "Candara, sans-serif",
    "Geneva, sans-serif",
    "Monaco, monospace",
    "Brush Script MT, cursive",
    "Consolas, monospace",
    "Roboto, sans-serif",
    "Open Sans, sans-serif",
    "Lato, sans-serif",
    "Montserrat, sans-serif",
    "Roboto Condensed, sans-serif",
    "Oswald, sans-serif",
    "Merriweather, serif",
    "Playfair Display, serif",
    "Raleway, sans-serif",
    "Nunito, sans-serif",
    "Ubuntu, sans-serif",
  ];
  const fontSizes = [
    "12px",
    "14px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
    "36px",
    "40px",
    "48px",
    "56px",
    "64px",
    "72px",
    "96px",
  ];
  const headings = [
    {
      label: "Heading 1",
      value: "H1",
    },
    {
      label: "Heading 2",
      value: "H2",
    },
    {
      label: "Heading 3",
      value: "H3",
    },
    {
      label: "Heading 4",
      value: "H4",
    },
    {
      label: "Heading 5",
      value: "H5",
    },
    {
      label: "Heading 6",
      value: "H6",
    },
  ];
  const textColor = ref();
  const selectedTextColor = ref("#000");
  const selectedMarkColor = ref("yellow");
  const markColor = ref();
  const format = ref<string[]>([]);
  function toggleCode() {
    const textInput = document.getElementById(id);
    const showed = format.value.some((item) => item == "code");

    if (!textInput) return;

    if (showed) {
      format.value = format.value.filter((item) => item != "code");
      textInput.innerHTML = textInput.textContent || "";
    } else {
      textInput.textContent = textInput.innerHTML;
      format.value.push("code");
    }
  }
  function toggleScript(value: "subscript" | "superscript") {
    const exists = format.value.some((item) => item == value);

    if (exists) {
      format.value = format.value.filter((item) => item != value);
    } else {
      format.value = format.value.filter(
        (item) => item != "subscript" && item != "superscript"
      );
      format.value.push(value);
    }
  }
  function history(value: "undo" | "redo") {
    document.execCommand(value, false);
  }
  function advanceOption(e: any, command: string) {
    
    switch(command){
        case 'foreColor' :
            selectedTextColor.value = e.target.value
        break;
        case 'backColor' :
            console.log('triggered');
            
            selectedMarkColor.value = e.target.value
        break;
    }


    modifyText(command, false, e.target.value);
  }
  function modifyText(
    command: string,
    showUI = false,
    value: string | undefined
  ) {
    document.execCommand(command, showUI, value);
  }

  onMounted(() => {
    const textInput = document.getElementById(id);
    textInput?.addEventListener("keydown", () => {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      if (range) {
        const parent = range.commonAncestorContainer.parentElement
        if (parent) {
            const parentStyles = window.getComputedStyle(parent)
            selectedTextColor.value = parentStyles.color
        }
      }
    });

    const optionButtons = document.querySelectorAll(".option-button");
    const buttonLink = document.getElementById("link");

    buttonLink?.addEventListener("click", () => {
      const link = prompt("Insert your link");
      if (!link) return;
      if (/http/i.test(link)) {
        modifyText("createLink", false, link);
      } else {
        modifyText("createLink", false, "http://" + link);
      }
    });
    optionButtons.forEach((button) => {
      button.addEventListener("click", (e) =>
        modifyText(button.id, false, undefined)
      );
    });
  });

  return {
    fontFamilies,
    fontSizes,
    headings,
    textColor,
    markColor,
    format,
    toggleScript,
    toggleCode,
    state,
    history,
    selectedMarkColor,
    selectedTextColor,
    modifyText,
    advanceOption,
  };
}
