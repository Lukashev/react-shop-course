import { AxiosResponse } from "axios";
import {ThunkDispatch } from "redux-thunk";
import { Action, ReducerState } from '../interfaces'
import { Api } from "../utils/api";

export const setMainState = (payload: any): Action => ({
  type: 'SET_MAIN_STATE',
  payload
})

export const fetchProductList = (offset: number = 0) => async (dispatch: ThunkDispatch<ReducerState, any, Action>): Promise<void> => {
  try {
    dispatch(setMainState({ loading: true }))
    const result: AxiosResponse = await Api.get(`/products?_start=${offset}&_end=${offset + 6}`)
    dispatch(setMainState({ products: result.data }))
  } catch (e) {
    console.error(e)
  } finally {
    dispatch(setMainState({ loading: false }))
  }
}