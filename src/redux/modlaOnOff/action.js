import {MODAL_OPEN, MODAL_CLOSE} from './types';

export const modalOpen = () => {
  return {
    type : MODAL_OPEN,
  }
}

export const modalClose = () => {
  return {
    type : MODAL_CLOSE,
  }
}