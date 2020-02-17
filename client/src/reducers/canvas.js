import { CHANGE_CANVAS_WIDTH } from "../constants/ActionTypes";
import { CANVAS_MOBILE_BTTN } from "../constants/ActionTypes";
import { CANVAS_REDISPLAY_MOBILE_BTTN } from "../constants/ActionTypes";

const init = {
  width: 0,
  checkBttnPress: false,
  displayMobileBttn: false
};

export default function(state = init, action) {
  switch (action.type) {
    case CHANGE_CANVAS_WIDTH:
      return { width: action.width };
    case CANVAS_MOBILE_BTTN:
      return { checkBttnPress: action.checkBttnPress };
    case CANVAS_REDISPLAY_MOBILE_BTTN:
      return { displayMobileBttn: action.displayMobileBttn };
    default:
      return state;
  }
}
