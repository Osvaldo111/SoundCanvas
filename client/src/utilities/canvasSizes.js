/**
 * Author: Osvaldo Carrillo
 * Date: 02/25/2020
 * This function replace the functionality of the media
 * queries to make the canvas responsive. This is uses to
 * display the animations on the canvas with resolution.
 * @param {Callback} callback
 */
const canvasSizes = callback => {
  var width = window.innerWidth;
  var height = window.innerHeight;
  console.log("The height window: ", height, " The width: ", width);

  if (width >= 1366 && height <= 768) {
    // This resizes the canvas to 500px to 500px
    //Devices 1366px 750px. Example: Notebook 10"
    console.log("MIN-WIDTH: 1366PX MAX-HEIGTH: 768PX******");
    const canvasSizes = 500;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else if (width >= 1280 && height <= 768) {
    // This resizes the canvas to 500px to 500px
    // Devices 1280px 768px. Example: Notebook 13"
    console.log("MIN-WIDTH: 1280PX MAX-HEIGTH: 768PX******");
    const canvasSizes = 500;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else if (width >= 1024 && height <= 768) {
    console.log("MIN-WIDTH: 1024PX MAX-HEIGTH: 768PX******");
    // This resizes the canvas to 400px to 400px
    // Devices 1024px 750px. Example: Notebook 10"
    const canvasSizes = 400;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else if (width <= 425) {
    console.log("425PX******");
    // This resizes the canvas to 350px to 350px
    const canvasSizes = 350;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else if (width <= 576) {
    console.log("576PX******");
    // This resizes the canvas to 500px to 500px
    const canvasSizes = 500;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else if (width <= 992) {
    console.log("992PX******");
    // This resizes the canvas to 550px to 550px
    const canvasSizes = 550;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  } else {
    // This resizes the canvas to 600px to 600px
    // Extra large devices (large desktops, 1200px and up)
    console.log("1200PX AND UP******");
    const canvasSizes = 600;
    var canvasSize = {
      width: canvasSizes,
      height: canvasSizes
    };
    callback(canvasSize);
  }
};

export default canvasSizes;
