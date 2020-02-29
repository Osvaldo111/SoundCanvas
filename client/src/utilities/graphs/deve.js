import drawU from "../drawGraphClassic";
const drawCanvasThinSW = (
  canvas,
  arrAmplitud,
  swColor = "#000000",
  swThick = 1,
  callback
) => {
  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;
  context.clearRect(0, 0, width, height);
  var paddingTopBottom = 20; //PX
  var paddingLeftRight = 0;

  // Fix 30 frequency amplitudes
  // var lineWidth = Math.round((width - paddingLeftRight) / 30);

  // The soundwave width or thickness
  // const swLineWidth = Math.round((lineWidth / 10) * swThick);

  // move the stroke to the beginning of the canvas
  // var initStroke = lineWidth / 2;
  var left = 0;
  var spacePosition = 1;

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
    context.lineWidth = swThick;
    context.strokeStyle = swColor;
    context.stroke();
    left += spacePosition;

    // Draw middle line
    context.beginPath();
    context.moveTo(0, width / 2);
    context.lineTo(height, width / 2);
    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.stroke();
  }

  if (left >= width) {
    const canvasEnd = true;
    typeof callback === "function" && callback(canvasEnd);
  }
};
export default drawCanvasThinSW;
