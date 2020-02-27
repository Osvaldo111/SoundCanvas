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

export const setCanvasColor = color => ({
  type: types.CANVAS_COLOR,
  color
});
