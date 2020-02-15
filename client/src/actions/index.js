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
