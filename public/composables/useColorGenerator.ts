export default function() {
    // Define ranges for saturation and brightness
    const minSaturation = 30; // Minimum saturation (0-100)
    const maxSaturation = 70; // Maximum saturation (0-100)
    const minBrightness = 30; // Minimum brightness (0-100)
    const maxBrightness = 70; // Maximum brightness (0-100)
  
    // Generate random values for hue, saturation, and brightness
    const hue = Math.floor(Math.random() * 360); // Random hue (0-360)
    const saturation = Math.floor(Math.random() * (maxSaturation - minSaturation + 1) + minSaturation); // Random saturation
    const brightness = Math.floor(Math.random() * (maxBrightness - minBrightness + 1) + minBrightness); // Random brightness
  
    // Convert HSB (Hue, Saturation, Brightness) to RGB (Red, Green, Blue)
    const rgbColor = hsbToRgb(hue, saturation, brightness);
  
    // Convert RGB values to hexadecimal color code
    const hexColor = rgbToHex(rgbColor[0], rgbColor[1], rgbColor[2]);
  
    return hexColor;
  }
  
  // Function to convert HSB to RGB
  //@ts-ignore
  function hsbToRgb(h, s, b) {
    h /= 360;
    s /= 100;
    b /= 100;
    let r, g, bVal;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = b * (1 - s);
    const q = b * (1 - f * s);
    const t = b * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0: r = b; g = t; bVal = p; break;
      case 1: r = q; g = b; bVal = p; break;
      case 2: r = p; g = b; bVal = t; break;
      case 3: r = p; g = q; bVal = b; break;
      case 4: r = t; g = p; bVal = b; break;
      case 5: r = b; g = p; bVal = q; break;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(bVal * 255)];
  }
  
  // Function to convert RGB to hexadecimal color code
  //@ts-ignore
  function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }


// export default function() {
//   // Generate random values for red, green, and blue channels within a restricted range
//   const red = Math.floor(Math.random() * 56) + 200; // Restricting to the range 200-255
//   const green = Math.floor(Math.random() * 56) + 200; // Restricting to the range 200-255
//   const blue = Math.floor(Math.random() * 56) + 200; // Restricting to the range 200-255

//   // Convert the RGB values to hexadecimal format
//   const redHex = red.toString(16).padStart(2, '0');
//   const greenHex = green.toString(16).padStart(2, '0');
//   const blueHex = blue.toString(16).padStart(2, '0');

//   // Construct the hexadecimal color string
//   const colorHex = `#${redHex}${greenHex}${blueHex}`;

//   return colorHex;
// }





// export default function() {
//   // Generate random hue (between 0 and 360)
//   const hue = Math.floor(Math.random() * 360);

//   // Set saturation and lightness within a range for a softer look
//   const saturation = 50 + Math.random() * 25; // Vary between 50 and 75
//   const lightness = 60 + Math.random() * 20; // Vary between 60 and 80

//   // Convert HSL to RGB
//   //@ts-ignore
//   const hslToRgb = (h, s, l) => {
//     const c = (1 - Math.abs(2 * l - 1)) * s;
//     const x = c * (1 - Math.abs((h / 60) % 2 - 1));
//     const m = l - c / 2;
//     let r, g, b;
//     if (h >= 0 && h < 60) {
//       [r, g, b] = [c, x, 0];
//     } else if (h >= 60 && h < 120) {
//       [r, g, b] = [x, c, 0];
//     } else if (h >= 120 && h < 180) {
//       [r, g, b] = [0, c, x];
//     } else if (h >= 180 && h < 240) {
//       [r, g, b] = [0, x, c];
//     } else if (h >= 240 && h < 300) {
//       [r, g, b] = [x, 0, c];
//     } else {
//       [r, g, b] = [c, 0, x];
//     }
//     return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
//   };

//   const [red, green, blue] = hslToRgb(hue, saturation / 100, lightness / 100);

//   // Convert the RGB values to hexadecimal format
//   const redHex = Math.round(red).toString(16).padStart(2, '0');
//   const greenHex = Math.round(green).toString(16).padStart(2, '0');
//   const blueHex = Math.round(blue).toString(16).padStart(2, '0');

//   // Construct the hexadecimal color string
//   const colorHex = `#${redHex}${greenHex}${blueHex}`;

//   return colorHex;
// }



// export default function() {
//   // Define a hue range (e.g., blue to green)
//   const minHue = 180; // Blue
//   const maxHue = 300; // Green

//   // Generate a random hue within the defined range
//   const hue = Math.floor(Math.random() * (maxHue - minHue + 1)) + minHue;

//   // Generate a random saturation and lightness within a suitable range
//   const saturation = 50 + Math.random() * 25; // Vary between 50 and 75
//   const lightness = 50 + Math.random() * 25; // Vary between 50 and 75

//   // Convert HSL to RGB
//   const hslToRgb = (h, s, l) => {
//     const c = (1 - Math.abs(2 * l - 1)) * s;
//     const x = c * (1 - Math.abs((h / 60) % 2 - 1));
//     const m = l - c / 2;
//     let r, g, b;
//     if (h >= 0 && h < 60) {
//       [r, g, b] = [c, x, 0];
//     } else if (h >= 60 && h < 120) {
//       [r, g, b] = [x, c, 0];
//     } else if (h >= 120 && h < 180) {
//       [r, g, b] = [0, c, x];
//     } else if (h >= 180 && h < 240) {
//       [r, g, b] = [0, x, c];
//     } else if (h >= 240 && h < 300) {
//       [r, g, b] = [x, 0, c];
//     } else {
//       [r, g, b] = [c, 0, x];
//     }
//     return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
//   };

//   const [red, green, blue] = hslToRgb(hue, saturation / 100, lightness / 100);

//   // Convert the RGB values to hexadecimal format
//   const redHex = Math.round(red).toString(16).padStart(2, '0');
//   const greenHex = Math.round(green).toString(16).padStart(2, '0');
//   const blueHex = Math.round(blue).toString(16).padStart(2, '0');

//   // Construct the hexadecimal color string
//   const colorHex = `#${redHex}${greenHex}${blueHex}`;

//   return colorHex;
// }
