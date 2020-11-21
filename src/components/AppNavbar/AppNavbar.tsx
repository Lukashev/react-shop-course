import React, { useState, useMemo, SetStateAction, Dispatch } from 'react'
import { Navbar, Form, FormControl, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import { ReducerState, CartItem, Product } from '../../interfaces'
import CartModal from '../CartModal'
import Currency from 'react-currency-formatter'

type Props = ReducerState
type CartBodyItem = CartItem & Product

const triggerState = (setState: Dispatch<SetStateAction<boolean>>, value: boolean) => {
  return (): void => {
    setState(value)
  }
}

const AppNavbar = (props: Props) => {
  const { cart, products, currency } = props
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const modalBody = useMemo(() => {
    const cartItems: CartBodyItem[] = cart.map(item => ({ ...products.find(p => p.id === item.id), ...item })) as CartBodyItem[]
    return (
      <Container>
        <Row>
          {cartItems.map(({ imageUrl, title, quantity, price }) => (
            <Col md={12}>
              <div className="d-flex w-100 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={imageUrl} alt={title} width={50} height={50} className='mr-2' />
                  <p className='mb-0'>{title}</p>
                </div>
                <div className="d-flex  align-items-center">
                  <Button variant='danger' className='mr-2'>-</Button>
                  <h4>{quantity}</h4>
                  <Button variant='success' className='ml-2 mr-2'>+</Button>
                  <Currency
                    currency={currency}
                    quantity={+price}
                  />
                  <Button variant='outline-danger' className='ml-2'>x</Button>
                </div>
              </div>
              <hr></hr>
            </Col>
          ))}
        </Row>
      </Container>
    )
  }, [cart, products, currency])

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">React Shop</Navbar.Brand>
      <div className="d-flex">
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Button variant="danger pl-4 pr-4" onClick={triggerState(setModalVisible, true)}>
          <i className="fas fa-shopping-cart"></i>
          <small>
            <Badge variant="light ml-1">{cart.length}</Badge>
          </small>
        </Button>
      </div>
      <CartModal title='Shopping Cart' visible={modalVisible} handleClose={triggerState(setModalVisible, false)}>
        {modalBody}
      </CartModal>
    </Navbar>
  )
}

export default AppNavbar
