import { LOGIN_SUCCESS } from "./types";

const initialState = {
  no: "",
  id: "",
  name: "",
  phone: "",
  gender: "",
  birth: "",
  quiz: "",
  answer: "",
  email: "",
  createdAt: "",
  updatedAt: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;

// 참고
// const initialState = {
//   user: null,
//   error: null
// };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_SUCCESS':
//       return {
//         ...state,
//         user: action.payload,
//         error: null
//       };
//     default:
//       return state;
//   }
// };
//
