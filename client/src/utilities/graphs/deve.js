import drawU from "../drawGraphClassic";
const drawCanvasThinSW = (canvas, arrAmplitud) => {
  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;
  //   alert();
  //   console.log("Width: ", width, " Height: ", height);
  // Save to restore original and avoid
  // accumulative transalate and scale.
  context.save();

  // Divided in 30 for the 30 seconds limit
  var paddingLeftRight = 20; //PX
  var distanceMovement = (width - paddingLeftRight) / 30;
  var left = 0,
    // Prpoportional to the canvas height
    // removing 100px half from top and bottom
    previousValue = drawU.scaleToRange(arrAmplitud[0], height - 100),
    moveLeftBy = distanceMovement;

  // line in the middle of the canvas
  context.beginPath();
  context.moveTo(0, width / 2);
  context.lineTo(height, width / 2);
  context.lineWidth = 10;
  context.stroke();

  context.beginPath();
  context.moveTo(width / 2, 0 + 10);
  context.lineTo(width / 2, height - 10);
  context.lineWidth = 1;
  context.strokeStyle = "green";
  context.stroke();

  context.beginPath();
  context.moveTo(10, 0);
  context.lineTo(10, height);
  context.lineWidth = 1;
  context.strokeStyle = "green";
  context.stroke();

  for (const stat in arrAmplitud) {
    // var currentValue = arrAmplitud[stat];
    // // Prpoportional to the canvas height
    // // removing 100px half from top and bottom
    // var proportionalHeight = drawU.scaleToRange(currentValue, height - 100);
    // context.beginPath();
    // context.moveTo(left, previousValue);
    // context.lineTo(left + moveLeftBy, proportionalHeight);
    // context.lineWidth = 7;
    // context.lineCap = "round";
    // var strokeColor = drawU.getRandomColor();
    // context.strokeStyle = strokeColor;
    // context.stroke();
    // previousValue = proportionalHeight;
    // left += moveLeftBy;
  }
  // Restore the Original canvas
  context.restore();
};

export default drawCanvasThinSW;
