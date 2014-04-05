console.log("Go color!");

// convert number to hex string
function numberToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// get input value (by id) and return as number
function getInputValue(id) {
  var inputValue = document.getElementById(id).value;
  return parseInt(inputValue, 10);
}

// invert rgb number
function rgbInvert(i) {
  return 255 - i;
}

// convert rgb number (0-255) to cmy percentage number (0-100)
function rgbToCmy(n) {
  return Math.round((rgbInvert(n) / 255) * 100);
}

// convert rgb number (0-255) to six number (0-5)
function rgbToSix(r) {
  return r / 51;
}

// convert six number (0-5) to rgb number (0-255)
function sixToRgb(s) {
  return s * 51;
}

// convert rgb color value (three numbers 0-255) to hex color value (string)
function rgbToHexColor(colorSet) {
  return "#" + numberToHex(colorSet.r) + numberToHex(colorSet.g) + numberToHex(colorSet.b); 
}

// set background color (hexColor) of element (id)
function setBackgroundColor(id, hexColor) {
  document.getElementById(id).style.backgroundColor = hexColor;
}

// set inner text of element (id)
function setInnerText (id, text) {
  document.getElementById(id).innerText = text;
}

// update dom with box background color and color info
function updateDom(box, special, rgb, hex, colorSet, transform) {
  
  // update box background color
  var hexColor = rgbToHexColor(colorSet);
  setBackgroundColor(box, hexColor);
  
  // update color info
  setInnerText(special, transform(colorSet.r) + " " + transform(colorSet.g) + " " + transform(colorSet.b));
  setInnerText(rgb, colorSet.r + " " + colorSet.g + " " + colorSet.b);
  setInnerText(hex, hexColor);
}

// get and transform input values, return color set
function getInputValues(id1, id2, id3, transform) {
  return {
    r: transform(getInputValue(id1)), 
    g: transform(getInputValue(id2)), 
    b: transform(getInputValue(id3))
  }; 
}

// get additive rgb input values and update dom
function rgbGo() {
  var colorSet = getInputValues("r", "g", "b", function(x) {return x;});
  updateDom("rgbcolor", "rgb", "rgbrgb", "rgbhex", colorSet, function(x) {return x;});
}

// get subtractive cmy input values and update dom
function cmyGo() {
  var colorSet = getInputValues("c", "m", "y", rgbInvert);
  updateDom("cmycolor", "cmy", "cmyrgb", "cmyhex", colorSet, rgbToCmy);
}

// get additive six input values and update dom
function sixGo() {
  var colorSet = getInputValues("s", "i", "x", sixToRgb);
  updateDom("sixcolor", "six", "sixrgb", "sixhex", colorSet, rgbToSix);
}

