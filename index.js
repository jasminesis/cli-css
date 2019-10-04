let input = process.argv[2];

let r = parseInt(process.argv[3]);
let g = parseInt(process.argv[4]);
let b = parseInt(process.argv[5]);

if (input.includes('#')) {
    let rbgObj = hexToRgb(input);
    let r = rbgObj.r;
    let g = rbgObj.g;
    let b = rbgObj.b;
    console.log(`\x1b[38;2;${r};${g};${b}m%s\x1b[0m`, `This color in RGB is ${JSON.stringify(hexToRgb(input))}`);
    console.log(`This color in HSL is ${hexToHSL(input)}`);
} else {
    console.log(`This color in hex is ${JSON.stringify(rgbToHex(r, g, b))}`);
    console.log(`This color in HSL is ${RGBToHSL(r,g,b)}`)
}
console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
console.log('\x1b[33m%s\x1b[0m', "stringToMakeYellow");
console.log(`\x1b[38;2;${255};${0};${0}m%s\x1b[0m`, "something");

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToHSL(input) {
    var rbgObj = hexToRgb(input);
    let r = rbgObj.r;
    let g = rbgObj.g;
    let b = rbgObj.b;
    return RGBToHSL(r,g,b)

}

function RGBToHSL(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return "hsl(" + h + "," + s + "%," + l + "%)";
}