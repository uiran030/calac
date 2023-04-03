import {combineReducers} from 'redux';
import modalReducer from './modlaOnOff/reducer';

const rootReducer = combineReducers({
  modalOnOff : modalReducer,
})

export default rootReducer