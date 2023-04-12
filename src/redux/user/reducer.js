import { SET_HAS_SID_COOKIE } from "./types";

const initialState = {
  hasSidCookie: false,
};

const sidCookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HAS_SID_COOKIE:
      return {
        ...state,
        hasSidCookie: action.payload,
      };
    default:
      return state;
  }
};

export default sidCookieReducer;
