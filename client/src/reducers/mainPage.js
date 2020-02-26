import { SCREEN_SIZE } from "../constants/ActionTypes";

const init = {
  width: 0,
  height: 0
};

export default function(state = init, action) {
  switch (action.type) {
    case SCREEN_SIZE:
      return { width: action.width, height: action.height };
    default:
      return state;
  }
}
