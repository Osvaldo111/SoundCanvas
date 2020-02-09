import React from "react";
import "../style/canvas.css";
/**
 * author: Osvaldo Carrillo
 * Date: 02/08/2020
 * This class represents the canvas on which the
 * sound wave is drawn.
 */
export default class Canvas extends React.Component {
  render() {
    return (
      <div className="canvasContainer">
        <canvas className="canvas"> </canvas>
      </div>
    );
  }
}
