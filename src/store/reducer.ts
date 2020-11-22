import { Action, ReducerState } from "../interfaces";

const storageCart = localStorage.getItem('cart')

export const initialState: ReducerState = {
  products: [],
  cart: storageCart ? JSON.parse(storageCart) : [],
  loading: false,
  currency: 'USD',
  fetchOffset: 0,
  searchString: ''
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