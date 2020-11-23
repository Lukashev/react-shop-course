import React from 'react'
import Cards from 'react-credit-cards';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { Action } from '../../interfaces';

export interface PaymentCardState {
  cvc: string
  expiry: string
  name: string
  number: string
}

interface Props {
  paymentDetails: PaymentCardState
  setMainState: (payload: any) => Action
}

export const PaymentCard = (props: Props): JSX.Element => {
  const { paymentDetails: { cvc, expiry, name, number }, setMainState } = props

  const handleChange = (key: string) => ({ target }: any): void => {
    setMainState({
      paymentDetails: {
        ...props.paymentDetails,
        [key]: target.value
      }
    })
  }

  return (
    <Container>
      <Row>
        <Col>
          <Cards
            cvc={cvc}
            expiry={expiry}
            name={name}
            number={number}
            focused={'number'}
            callback={(...args) => console.log(args)}
          />
        </Col>
        <Col>
          <Form noValidate className='mt-4'>
            <Form.Row>
              <Form.Group as={Col} className='w-100'>
                <Form.Label>Card number</Form.Label>
                <Form.Control
                  required
                  type="tel"
                  name="number"
                  value={number}
                  onChange={handleChange('number')}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className='w-100'>
                <Form.Label>Card holder</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange('name')}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className='w-100'>
                <Form.Label>CVC</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="cvc"
                  value={cvc}
                  onChange={handleChange('cvc')}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className='w-100'>
                <Form.Label>Expiry</Form.Label>
                <Form.Control
                  required
                  type="date"
                  name="expiry"
                  value={expiry}
                  onChange={handleChange('expiry')}
                />
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
