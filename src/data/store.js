import { createStroe } from 'redux';
import subscriberReducer from './reducer';

const store = createStroe(subscriberReducer);

export default store;