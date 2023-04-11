// import { POST_DATA } from "./types";

// const initialState = {
//   no: "",
//   id: "",
//   name: "",
//   phone: "",
//   gender: "",
//   birth: "",
//   quiz: "",
//   answer: "",
//   email: "",
//   createdAt: "",
//   updatedAt: "",
// };

// const loginReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case POST_DATA:
//       return {
//         ...action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default loginReducer;

// =================================================
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
