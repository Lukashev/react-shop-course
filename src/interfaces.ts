type ActionType = 'SET_MAIN_STATE'

type CurrencyType = 'USD' | 'EUR'

export interface Action {
  type: ActionType,
  payload: any
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
  cart: Product[]
  loading: boolean
  currency: CurrencyType
}