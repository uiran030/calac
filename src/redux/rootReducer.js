import { combineReducers } from "redux";
// import loginReducer from "./user/reducer";
import sidCookieReducer from "./user/reducer";

const rootReducer = combineReducers({
  // login: loginReducer,
  sidCookie: sidCookieReducer,
});

export default rootReducer;
