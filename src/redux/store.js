import { createStore } from "redux";
import rootReducer from "./rootReducer";
// import logger from "redux-logger";
// import { composeWithDevTools } from "redux-devtools-extension";

// const middleware = [logger]; // 미들웨어가 여러개가 될 수 있기 때문에 하는 작업

const store = createStore(
  rootReducer
  // composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
