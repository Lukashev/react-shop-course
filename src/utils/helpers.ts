import isEmpty from "validator/lib/isEmpty"
import isCreditCard from 'validator/lib/isCreditCard'

interface CurrencyStats {
  USD: number
  EUR: number
}

export const currencyStats: CurrencyStats = {
  'USD': 1,
  'EUR': 0.84
}

export const validatePaymentDetails = (details: any): { valid: boolean, message?: string } => {
  for (let key in details) {
    const value: string = details[key]
    if (isEmpty(value)) {
      return { valid: false, message: `${key} field is required`}
    }
    if (key === 'number' && !isCreditCard(value)) {
      return { valid: false, message: 'invalid credit card number'}
    }
    if (key === 'expiry') {
      const today = new Date()
      const expiryDate = new Date(value)
      if (today > expiryDate) {
        return { valid: false, message: 'invalid expiry date' }
      }
    }
  }
  return { valid: true }
}