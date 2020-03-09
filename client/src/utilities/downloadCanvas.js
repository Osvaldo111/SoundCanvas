/**
 * This function is designed to return a node element
 * "a" tag with the URL containing the image in the format
 * specified, so the image can be downloaded by the user.
 * @param {Canvas} canvas
 * @param {Node} elm
 */
export const downloadCanvas = (canvas, elm, callback) => {
  elm.href = canvas.toDataURL("image/jpg");
  typeof callback === "function" && callback();
};
