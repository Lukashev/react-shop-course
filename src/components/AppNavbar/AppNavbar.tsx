import React, { useState, useMemo, SetStateAction, Dispatch } from 'react'
import { Navbar, Form, FormControl, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import Currency from 'react-currency-formatter'
import { ReducerState, CartItem, Product, Action } from '../../interfaces'
import CartModal from '../CartModal'

type Props = ReducerState & { setMainState: (payload: any) => Action }
type CartBodyItem = CartItem & Product

const triggerState = (setState: Dispatch<SetStateAction<boolean>>, value: boolean) => {
  return (): void => {
    setState(value)
  }
}

const AppNavbar = (props: Props) => {
  const { cart, products, currency, setMainState } = props
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  const changeCartState = (newCart: CartItem[]): void => {
    localStorage.setItem('cart', JSON.stringify(newCart))
    setMainState({ cart: newCart })
  }

  const setQuantity = (id: number, value: number) => (): void => {
    const itemIndex = cart.findIndex(item => item.id === id)
    if (itemIndex < 0) return
    let newCart = [...cart]
    newCart[itemIndex].quantity += value
    changeCartState(newCart)
  }

  const deleteCartItem = (id: number) => (): void => {
    const newCart = cart.filter(item => item.id !== id)
    changeCartState(newCart)
  }

  const modalBody = useMemo(() => {
    const cartItems: CartBodyItem[] = cart.map(item => ({ ...products.find(p => p.id === item.id), ...item })) as CartBodyItem[]
    return (
      <Container>
        <Row>
          {cartItems.length ? cartItems.map(({ id, imageUrl, title, quantity, price }) => (
            <Col md={12} key={id}>
              <div className="d-flex w-100 align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <img src={imageUrl} alt={title} width={50} height={50} className='mr-2' />
                  <p className='mb-0'>{title}</p>
                </div>
                <div className="d-flex  align-items-center">
                  <Button
                    variant='danger'
                    className='mr-2'
                    disabled={!!!(quantity > 1)}
                    onClick={setQuantity(id, -1)}
                  >-</Button>
                  <h4>{quantity}</h4>
                  <Button
                    variant='success'
                    className='ml-2 mr-2'
                    onClick={setQuantity(id, 1)}
                  >+</Button>
                  <Currency
                    currency={currency}
                    quantity={+price}
                  />
                  <Button
                    variant='outline-danger'
                    className='ml-2'
                    onClick={deleteCartItem(id)}
                  >x</Button>
                </div>
              </div>
              <hr></hr>
            </Col>
          )) : 'Cart is empty...'}
        </Row>
      </Container>
    )
  }, [cart, products, currency]) // eslint-disable-line

  const totalAmount: number = useMemo((): number => {
    const result = cart.reduce((acc: number, item) => {
      const productItem = products.find(p => p.id === item.id) as Product
      return acc + (productItem ? +productItem.price : 0) * item.quantity 
    }, 0)
    return result
  }, [cart, products])

  const modalFooter = useMemo(() => {
    return (
      <div className="d-flex align-items-center">
        <h4 className='mr-2'>Total: </h4>
        <span>
          <Currency
            currency={currency}
            quantity={totalAmount}
          />
        </span>
      </div>
    )
  }, [totalAmount, currency])

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
      <CartModal
        title='Shopping Cart'
        visible={modalVisible}
        btnLabel='Checkout'
        handleClose={triggerState(setModalVisible, false)}
        footer={modalFooter}
      >
        {modalBody}
      </CartModal>
    </Navbar>
  )
}

export default AppNavbar
