import { SCREEN_WIDTH } from "../constants/ActionTypes";
import { SCREEN_HEIGHT } from "../constants/ActionTypes";
import { SCREEN_SIZE } from "../constants/ActionTypes";

const init = {
  width: 0,
  height: 0
};

export default function(state = init, action) {
  switch (action.type) {
    case SCREEN_WIDTH:
      return { width: action.width };
    case SCREEN_HEIGHT:
      return { height: action.height };
    case SCREEN_SIZE:
      return { width: action.width, height: action.height };
    default:
      return state;
  }
}
