import { CHANGE_CANVAS_WIDTH } from "../constants/ActionTypes";
import { CANVAS_MOBILE_BTTN } from "../constants/ActionTypes";
import { CANVAS_REDISPLAY_MOBILE_BTTN } from "../constants/ActionTypes";
import { SIDEBAR_CANVAS_RESIZE } from "../constants/ActionTypes";
import { CANVAS_COLOR } from "../constants/ActionTypes";
import { CANVAS_SOUNDWAVE_COLOR } from "../constants/ActionTypes";
import { SW_THICKNESS } from "../constants/ActionTypes";

const init = {
  width: 0,
  checkBttnPress: false,
  displayMobileBttn: false,
  sideBarWidth: 0,
  canvasColor: "#fff",
  swColor: "#000000",
  swThick: 1
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
    case CANVAS_COLOR:
      return { canvasColor: action.color };
    case CANVAS_SOUNDWAVE_COLOR:
      return { swColor: action.color };
    case SW_THICKNESS:
      return { swThick: action.value };
    default:
      return state;
  }
}
