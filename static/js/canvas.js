const canvas = document.createElement("canvas");
var sandbox = new GlslCanvas(canvas);

// Access the specific div by its ID
const mainDisplay = document.getElementById("mainDisplay");

// Append the canvas to the div
mainDisplay.appendChild(canvas);
canvas.id = "main-canvas";
sandbox.load(frag);