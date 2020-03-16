import drawU from "../drawGraphClassic";
const drawCanvasThinSW = (
  canvas,
  backgroundColor,
  arrAmplitud,
  swColor = "#000000",
  swThick = 1,
  swWidth = 1,
  textObj,
  callback
) => {
  if (backgroundColor === null) backgroundColor = "#fff";
  if (swColor === null) swColor = "#000000";
  if (swThick === null) swThick = 1;
  if (swWidth === null) swWidth = 1;

  var context = canvas.getContext("2d"),
    width = canvas.width,
    height = canvas.height;
  context.clearRect(0, 0, width, height);

  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  var paddingTopBottom = 20; //PX
  var paddingLeftRight = 0;

  var left = 0;
  var spacePosition = swWidth;

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
    // Parse to avoid concadenation
    left += parseInt(spacePosition);

    // Draw middle line
    // context.beginPath();
    // context.moveTo(0, width / 2);
    // context.lineTo(height, width / 2);
    // context.lineWidth = 1;
    // context.strokeStyle = "black";
    // context.stroke();
  }

  // Draw middle line
  context.beginPath();
  context.moveTo(0, width / 2);
  context.lineTo(height, width / 2);
  context.lineWidth = 1;
  context.strokeStyle = "black";
  context.stroke();

  // context.fillStyle = "red";
  // context.font = "14px Arial";
  // context.fillText("Hellogggggg", 200, 200);

  if (textObj != null) {
    const { text, fontSize, fontColor, xAxis, yAxis } = textObj;
    context.fillStyle = fontColor;
    context.font = fontSize + "px Arial";
    context.fillText(text, xAxis, yAxis);
  }
  if (left >= width) {
    const canvasEnd = true;
    typeof callback === "function" && callback(canvasEnd);
  }
};
export default drawCanvasThinSW;
