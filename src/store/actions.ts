import { AxiosResponse } from "axios";
import {ThunkDispatch } from "redux-thunk";
import { Action, ReducerState, CurrencyType } from '../interfaces'
import { Api } from "../utils/api";
import { validatePaymentDetails } from "../utils/helpers";

export const setMainState = (payload: any): Action => ({
  type: 'SET_MAIN_STATE',
  payload
})

export const fetchProductList = () => async (dispatch: ThunkDispatch<ReducerState, any, Action>, getState: () => ReducerState): Promise<void> => {
  try {
    dispatch(setMainState({ loading: true }))
    const { searchString } = getState()
    const result: AxiosResponse = await Api.get(`/products?title_like=${searchString}`)
    dispatch(setMainState({ products: result.data }))
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(setMainState({ loading: false }))
  }
}


export const makePayment = (payload: { amount: number, currency: CurrencyType }) => async (dispatch: ThunkDispatch<ReducerState, any, Action>, getState: () => ReducerState): Promise<void> => {
  try {
    dispatch(setMainState({ loading: true }))
    const { paymentDetails, cart } = getState()
    const { valid, message } = validatePaymentDetails(paymentDetails)
    if (!valid) {
      if (message) alert(message)
      return
    }
    const result: AxiosResponse = await Api.post(`/orders`, { ...paymentDetails, ...payload, meta: cart })
    if (result) {
      localStorage.removeItem('cart')
      dispatch(setMainState({ cart: [], paymentDetails: { cvc: '', expiry: '', name: '', number: '' } }))
      alert('Payment successfully completed')
    }
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(setMainState({ loading: false }))
  }
}
