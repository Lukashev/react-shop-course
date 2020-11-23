import { PaymentCardState } from "./components/PaymentCard/PaymentCard"

type ActionType = 'SET_MAIN_STATE'

export type CurrencyType = 'USD' | 'EUR'
export type SortType = 'HIGH' | 'LOW'
export interface Action {
  type: ActionType,
  payload: any
}

export interface CartItem {
  id: number,
  quantity: number
}

export interface Product {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly price: string
  readonly imageUrl: string
}

export interface ReducerState {
  readonly products: Product[]
  cart: CartItem[]
  loading: boolean
  currency: CurrencyType
  sortBy: SortType
  fetchOffset: number
  searchString?: string
  paymentDetails: PaymentCardState
}