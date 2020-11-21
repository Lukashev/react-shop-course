import React, { memo } from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import Currency from 'react-currency-formatter'
import { Product } from '../interfaces'

type Props = Product & { currency?: string }

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
  const { imageUrl, title, description, price, currency = 'USD' } = props
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
            quantity={+price}
            currency={currency}
          />
        </span>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </StyledCard>
  )
}

const propsAreEqual = (prevProps: Props, nextProps: Props): boolean => prevProps.id === nextProps.id

export default memo(CardItem, propsAreEqual)
