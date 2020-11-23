import React, { memo, useCallback } from 'react'
import { Card, Button } from 'react-bootstrap'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import Currency from 'react-currency-formatter'
import { Product, Action, CartItem, CurrencyType } from '../interfaces'
import { currencyStats } from '../utils/helpers'

type Props = Product & { currency?: CurrencyType, setMainState: (payload: any) => Action, cart: CartItem[] }

const StyledCard = styled(Card)`
  min-height: 509px;
  & .card-text {
    font-size: 14px;
  }
  & .card-price {
    display: block;
  }
`

const CardItem = (props: Props) => {
  const { id, imageUrl, title, description, price, currency = 'USD', setMainState, cart } = props

  const addToCart = useCallback(() => {
    const payload = [...cart, { id, quantity: 1 }]
    setMainState({ cart: payload })
    // update localStorage
    localStorage.setItem('cart', JSON.stringify(payload))
  }, [setMainState, cart, id])

  return (
    <StyledCard className='mb-4'>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body className='d-flex flex-column justify-content-between'>
        <Card.Title>{title}</Card.Title>
        <Card.Text className='mb-2'>
          {description}
        </Card.Text>
        <span className='card-price font-weight-bold mb-2'>
          <Currency
            quantity={+price * currencyStats[currency]}
            currency={currency}
          />
        </span>
        <Button
          variant="primary"
          onClick={addToCart}
          disabled={!!cart.find(item => item.id === id)}
          >Add to cart</Button>
      </Card.Body>
    </StyledCard>
  )
}

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean => {
  return isEqual(prevProps, nextProps)
}

export default memo(CardItem, propsAreEqual)
