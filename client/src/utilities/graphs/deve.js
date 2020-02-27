import drawU from "../drawGraphClassic";
const drawCanvasThinSW = (canvas, arrAmplitud, swColor = "#000000") => {
  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

  // Divided in 30 for the 30 seconds limit
  var paddingTopBottom = 20; //PX
  var paddingLeftRight = 20;

  // Fix 30 frequency amplitudes
  var lineWidth = (width - paddingLeftRight) / 30;

  // move the stroke to the beginning of the canvas
  var initStroke = lineWidth / 2;
  var left = initStroke + paddingLeftRight / 2;

  // Draw middle line
  context.beginPath();
  context.moveTo(0, width / 2);
  context.lineTo(height, width / 2);
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.stroke();

  for (const stat in arrAmplitud) {
    var currentValue = arrAmplitud[stat];
    // Substract top and bottom padding
    var lineHeight = drawU.scaleToRange(
      currentValue,
      height - paddingTopBottom
    );
    // Determine how much to push down to center
    var pushDownTop = (height - lineHeight) / 2;

    // Draw line
    context.beginPath();
    context.moveTo(left, pushDownTop);
    context.lineTo(left, lineHeight + pushDownTop);
    context.lineWidth = lineWidth;
    context.strokeStyle = swColor;
    context.stroke();
    left += lineWidth;

    // Draw middle line
    context.beginPath();
    context.moveTo(0, width / 2);
    context.lineTo(height, width / 2);
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
  }
};
export default drawCanvasThinSW;
