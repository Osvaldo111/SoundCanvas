import * as types from "../constants/ActionTypes";

/**
 *
 */
export const changeCanvasWidth = width => ({
  type: types.CHANGE_CANVAS_WIDTH,
  width
});

/**
 * Check is the mobile bttn is pressed
 * @param {Boolean} check
 */
export const isMobileBttnPress = checkBttnPress => ({
  type: types.CANVAS_MOBILE_BTTN,
  checkBttnPress
});

/**
 * Check when the sidebar is closed to
 * redisplay the mobile bttn.
 * @param {Boolean} check
 */
export const displayMobileBttn = displayMobileBttn => ({
  type: types.CANVAS_REDISPLAY_MOBILE_BTTN,
  displayMobileBttn
});

/**
 * Set the screen width and height
 * @param {int} width
 * @param {int} height
 */
export const setScreenSize = (width, height) => ({
  type: types.SCREEN_SIZE,
  width,
  height
});

/**
 * Set the sidebar with to resize the canvas
 */
export const setSideBarWidth = width => ({
  type: types.SIDEBAR_CANVAS_RESIZE,
  width
});

/**
 * Set the background color of the canvas
 * @param {String} color
 */
export const setCanvasColor = color => ({
  type: types.CANVAS_COLOR,
  color
});

/**
 * Set the soundwave color
 * @param {String} color
 */
export const setSWColor = color => ({
  type: types.CANVAS_SOUNDWAVE_COLOR,
  color
});

/**
 * Set the thickness of the soundwave
 * @param {Int} value
 */
export const setSWThick = value => ({
  type: types.SW_THICKNESS,
  value
});

/**
 * Check when the reset button is pressed.
 * @param {Boolean} checkBttn
 */
export const isResetBttn = checkBttn => ({
  type: types.RESET_CANVAS_BTTN,
  checkBttn
});

/**
 * Check when the drawing process is stopped.
 * @param {Boolean} check
 */
export const isGraphCompleted = check => ({
  type: types.GRAPH_COMPLETED,
  check
});

/**
 * Set the width of the sound wave.
 * @param {Int} value
 */
export const setSWWidth = value => ({
  type: types.SW_WIDTH,
  value
});

/**
 * Set the font size of the text
 * @param {Int} value
 */
export const setFontSize = value => ({
  type: types.FONT_SIZE,
  value
});

/**
 * Set the font color
 * @param {String} color
 */
export const setFontColor = color => ({
  type: types.FONT_COLOR,
  color
});

/**
 * Check if the user wants to add text to
 * the canvas
 * @param {Boolean} value
 */
export const isTxtCanvas = value => ({
  type: types.ADD_TXT_CANVAS,
  value
});
