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
 * Get screen width
 * @param {int} width
 */
export const setScreenWidth = width => ({
  type: types.SCREEN_WIDTH,
  width
});

/**
 * Get screen heigh
 * @param {int} height
 */
export const setScreenHeight = height => ({
  type: types.SCREEN_HEIGHT,
  height
});

export const setScreenSize = (width, height) => ({
  type: types.SCREEN_SIZE,
  width,
  height
});
