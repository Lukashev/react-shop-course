import { Action, ReducerState } from "../interfaces";

export const initialState: ReducerState = {
  products: [],
  cart: [],
  loading: false,
  currency: 'USD'
}

export default (state: ReducerState = initialState, action: Action) => {
  const { type, payload } = action
  switch(type) {
    case 'SET_MAIN_STATE':
      return { ...state, ...payload }
    default:
      return state  
  }
}