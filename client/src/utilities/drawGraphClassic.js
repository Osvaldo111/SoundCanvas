/**
 * This function is designed to draw a graph
 * according to the frequency received.
 * The inner function uses the requestAnimationFrame
 * method to draw the graph dynamically according to the
 * values provided by the array.
 * https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
 * https://codepen.io/AdamBlum/pen/hIKnm
 * @param {Array} arr
 */
function drawGraphInCanvas(canvas, arrAmplitud) {
  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

  //   console.log("Width: ", width, " Height: ", height);
  // Save to restore original and avoid
  // accumulative transalate and scale.
  context.save();
  context.translate(0, height - 50);
  context.scale(1, -1);

  // Divided in 30 for the 30 seconds limit
  var distanceMovement = width / 30;

  var left = 0,
    // Prpoportional to the canvas height
    // removing 100px half from top and bottom
    previousValue = scaleToRange(arrAmplitud[0], height - 100),
    moveLeftBy = distanceMovement;

  for (const stat in arrAmplitud) {
    var currentValue = arrAmplitud[stat];

    // Prpoportional to the canvas height
    // removing 100px half from top and bottom
    var proportionalHeight = scaleToRange(currentValue, height - 100);

    context.beginPath();
    context.moveTo(left, previousValue);
    context.lineTo(left + moveLeftBy, proportionalHeight);
    context.lineWidth = 7;
    context.lineCap = "round";

    var strokeColor = getRandomColor();
    context.strokeStyle = strokeColor;

    context.stroke();

    previousValue = proportionalHeight;
    left += moveLeftBy;
  }

  // Restore the Original canvas
  context.restore();
}

/**
 * This function scales the given value of the
 * frequency amplitud which is 1-100. The range is 100
 * and the scale is the high of the canvas.
 * @param {Int} valueToScale
 * @param {Int} scale
 * @param {Int} range
 */
function scaleToRange(valueToScale, scale, range = 100) {
  return (valueToScale / range) * scale;
}

/**
 * Random color generator
 * https://stackoverflow.com/questions/1484506/random-color-generator
 */
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

module.exports = {
  drawGraphInCanvas: drawGraphInCanvas
};
