const resizeCanvas = canvasElement => {
  const canvasHeight = canvasElement.current.offsetHeight;
  const canvasWidth = canvasElement.current.offsetWidth;

  const canvasMeasure = {
    width: canvasWidth,
    height: canvasHeight
  };

  return canvasMeasure;
};

export default resizeCanvas;
