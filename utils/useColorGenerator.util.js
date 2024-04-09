module.exports = function() {
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