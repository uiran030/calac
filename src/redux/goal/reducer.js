import { SET_GOAL } from "./types";

const initialState = {
  count : 100,
};

const goalReducer = (state=initialState, action) => {
  switch (action.type){
    case SET_GOAL :
      return {
        ...state,
        count : state.count + 1,
      };
    default :
      return state;
  }
};

export default goalReducer;