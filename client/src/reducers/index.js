import { combineReducers } from "redux";
import canvas from "./canvas";
import mainPage from "./mainPage";

const rootReducer = combineReducers({ canvas, mainPage });

export default rootReducer;
