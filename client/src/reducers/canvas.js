import { CHANGE_CANVAS_WIDTH } from "../constants/ActionTypes";
import { CANVAS_MOBILE_BTTN } from "../constants/ActionTypes";
import { CANVAS_REDISPLAY_MOBILE_BTTN } from "../constants/ActionTypes";
import { SIDEBAR_CANVAS_RESIZE } from "../constants/ActionTypes";
import { CANVAS_COLOR } from "../constants/ActionTypes";
import { CANVAS_SOUNDWAVE_COLOR } from "../constants/ActionTypes";
import { SW_THICKNESS } from "../constants/ActionTypes";
import { RESET_CANVAS_BTTN } from "../constants/ActionTypes";
import { GRAPH_COMPLETED } from "../constants/ActionTypes";
import { SW_WIDTH } from "../constants/ActionTypes";
import { FONT_SIZE } from "../constants/ActionTypes";
import { FONT_COLOR } from "../constants/ActionTypes";
import { ADD_TXT_CANVAS } from "../constants/ActionTypes";
import { DOWNLOAD_CANVAS } from "../constants/ActionTypes";
import { SEND_CANVAS_EMAIL } from "../constants/ActionTypes";

const init = {
  width: 0,
  checkBttnPress: false,
  displayMobileBttn: false,
  sideBarWidth: 0,
  canvasColor: "#fff",
  swColor: "#000000",
  swThick: 1,
  swWidth: 1,
  resetBttn: false,
  gfCompleted: false,
  fontSize: 14,
  fontColor: "black",
  canvasTxt: false,
  downloadCanvas: false,
  sendCanvas: false
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
    case SW_WIDTH:
      return { ...state, swWidth: action.value };
    case FONT_SIZE:
      return { ...state, fontSize: action.value };
    case FONT_COLOR:
      return { ...state, fontColor: action.color };
    case ADD_TXT_CANVAS:
      return { ...state, canvasTxt: action.value };
    case DOWNLOAD_CANVAS:
      return { ...state, downloadCanvas: action.value };
    case SEND_CANVAS_EMAIL:
      return { ...state, sendCanvas: action.value };
    default:
      return { ...state };
  }
}
