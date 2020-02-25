const resizeCanvas = canvasElement => {
  const canvasHeight = canvasElement.current.clientHeight;
  const canvasWidth = canvasElement.current.clientWidth;

  const canvasMeasure = {
    width: canvasWidth,
    height: canvasHeight
  };

  return canvasMeasure;
};

export default resizeCanvas;
