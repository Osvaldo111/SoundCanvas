import { CHANGE_CANVAS_WIDTH } from "../constants/ActionTypes";
import { CANVAS_MOBILE_BTTN } from "../constants/ActionTypes";
import { CANVAS_REDISPLAY_MOBILE_BTTN } from "../constants/ActionTypes";
import { SIDEBAR_CANVAS_RESIZE } from "../constants/ActionTypes";

const init = {
  width: 0,
  checkBttnPress: false,
  displayMobileBttn: false,
  sideBarWidth: 0
};

export default function(state = init, action) {
  switch (action.type) {
    case CHANGE_CANVAS_WIDTH:
      return { width: action.width };
    case CANVAS_MOBILE_BTTN:
      return { checkBttnPress: action.checkBttnPress };
    case CANVAS_REDISPLAY_MOBILE_BTTN:
      return { displayMobileBttn: action.displayMobileBttn };
    case SIDEBAR_CANVAS_RESIZE:
      return { sideBarWidth: action.width };
    default:
      return state;
  }
}
