import { CHANGE_CANVAS_WIDTH } from "../constants/ActionTypes";
import { CANVAS_MOBILE_BTTN } from "../constants/ActionTypes";
import { CANVAS_REDISPLAY_MOBILE_BTTN } from "../constants/ActionTypes";
import { SIDEBAR_CANVAS_RESIZE } from "../constants/ActionTypes";
import { CANVAS_COLOR } from "../constants/ActionTypes";
import { CANVAS_SOUNDWAVE_COLOR } from "../constants/ActionTypes";
import { SW_THICKNESS } from "../constants/ActionTypes";
import { RESET_CANVAS_BTTN } from "../constants/ActionTypes";
import { GRAPH_COMPLETED } from "../constants/ActionTypes";

const init = {
  width: 0,
  checkBttnPress: false,
  displayMobileBttn: false,
  sideBarWidth: 0,
  canvasColor: "#fff",
  swColor: "#000000",
  swThick: 1,
  resetBttn: false,
  gfCompleted: false
};

export default function(state = init, action) {
  switch (action.type) {
    case CHANGE_CANVAS_WIDTH:
      return { ...state, width: action.width };
    case CANVAS_MOBILE_BTTN:
      return { ...state, checkBttnPress: action.checkBttnPress };
    case CANVAS_REDISPLAY_MOBILE_BTTN:
      return { ...state, displayMobileBttn: action.displayMobileBttn };
    case SIDEBAR_CANVAS_RESIZE:
      return { ...state, sideBarWidth: action.width };
    case CANVAS_COLOR:
      return { ...state, canvasColor: action.color };
    case CANVAS_SOUNDWAVE_COLOR:
      return { ...state, swColor: action.color };
    case SW_THICKNESS:
      return { ...state, swThick: action.value };
    case RESET_CANVAS_BTTN:
      return { ...state, resetBttn: action.checkBttn };
    case GRAPH_COMPLETED:
      return { ...state, gfCompleted: action.check };
    default:
      return { ...state };
  }
}
