import { ADD_SUBSCRIBER, REMOVE_SUBSCRIBER } from './types.js'

const addSubscriber = () => {
  return {
    type : ADD_SUBSCRIBER
  }
}

const removeSubscriber = () => {
  return {
    type : 'REMOVE_SUBSCRIBER'
  }
}