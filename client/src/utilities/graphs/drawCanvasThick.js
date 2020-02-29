import drawU from "../drawGraphClassic";
const drawCanvasThick = (
  canvas,
  arrAmplitud,
  swColor = "#78AB46",
  swThick = 10
) => {
  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;

  var paddingTopBottom = 20; //PX
  var paddingLeftRight = 20;

  // Fix 30 frequency amplitudes
  var lineWidth = Math.round((width - paddingLeftRight) / 30);

  // The soundwave width or thickness
  const swLineWidth = Math.round((lineWidth / 10) * swThick);

  console.log("The line width: ", lineWidth);
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
    console.log(swLineWidth);
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
    context.lineWidth = swLineWidth;
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
export default drawCanvasThick;
