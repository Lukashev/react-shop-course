import React, { useState, useMemo, SetStateAction, Dispatch } from 'react'
import { Navbar, Form, FormControl, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import Currency from 'react-currency-formatter'
import debounce from 'lodash/debounce'
import { ReducerState, CartItem, Product, Action, CurrencyType } from '../../interfaces'
import CartModal from '../CartModal'
import { currencyStats } from '../../utils/helpers'
import PaymentCard from '../PaymentCard'

type Props = ReducerState & { setMainState: (payload: any) => Action, makePayment: (payload: { amount: number, currency: CurrencyType }) => void }
type CartBodyItem = CartItem & Product

const triggerState = (setState: Dispatch<SetStateAction<boolean>>, value: boolean) => {
  return (): void => {
    setState(value)
  }
}

const AppNavbar = (props: Props) => {
  const { cart, products, currency, setMainState, makePayment } = props
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [paymentCardVisible, setPaymentCardVisible] = useState<boolean>(false)

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
    return !paymentCardVisible ? (
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
                    quantity={+price * currencyStats[currency]}
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
    ) : (
      <PaymentCard />
    )
  }, [cart, products, currency, paymentCardVisible]) // eslint-disable-line

  const totalAmount: number = useMemo((): number => {
    const result = cart.reduce((acc: number, item) => {
      const productItem = products.find(p => p.id === item.id) as Product
      return acc + (productItem ? +productItem.price : 0) * item.quantity
    }, 0)
    return result
  }, [cart, products])

  const checkoutBtnClick = (): void => {
    setPaymentCardVisible(true)
  }

  const backBtnClick = (): void => {
    setPaymentCardVisible(false)
  }

  const completeOrder = (): void => {
    makePayment({ amount: totalAmount, currency })
  }

  const modalFooter = useMemo(() => {
    return (
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center">
          <h4 className='mr-2'>Total: </h4>
          <span>
            <Currency
              currency={currency}
              quantity={totalAmount * currencyStats[currency]}
            />
          </span>
        </div>
        <div className="d-flex align-items-center">
          {paymentCardVisible && (
            <Button variant="secondary" onClick={backBtnClick} className='mr-2'>
              Back
            </Button>
          )}
          <Button variant={!paymentCardVisible ? 'secondary' : 'success'} disabled={!cart.length} onClick={!paymentCardVisible ? checkoutBtnClick : completeOrder}>
            {!paymentCardVisible ? 'Checkout' : 'Pay'}
          </Button>
        </div>
      </div>
    )
  }, [totalAmount, currency, paymentCardVisible, cart.length])

  const onSearch = ({ target }: any): void => {
    setMainState({
      fetchOffset: 0,
      searchString: target.value
    })
  }

  const onSelectChange = (key: string) => ({ target }: any): void => {
    setMainState({
      [key]: target.value
    })
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">React Shop</Navbar.Brand>
      <div className="d-flex">
        <Form inline>
          <FormControl onChange={debounce(onSearch, 1000)} type="text" placeholder="Search" className="mr-sm-2" />
        </Form>
        <Button variant="danger pl-4 pr-4" onClick={triggerState(setModalVisible, true)}>
          <i className="fas fa-shopping-cart"></i>
          <small>
            <Badge variant="light ml-1">{cart.length}</Badge>
          </small>
        </Button>
        <Form inline>
          <Form.Control
            as="select"
            className="ml-2"
            custom
            onChange={onSelectChange('currency')}
          >
            <option value="USD">USD Dollar</option>
            <option value="EUR">EUR Euro</option>
          </Form.Control>
          <Form.Label className="my-1 mr-2 ml-2 text-light">
            Sort by:
          </Form.Label>
          <Form.Control
            as="select"
            className="ml-0"
            custom
            onChange={onSelectChange('sortBy')}
          >
            <option value="LOW">Price: Low to High</option>
            <option value="HIGH">Price: High to Low</option>
          </Form.Control>
        </Form>
      </div>
      <CartModal
        title='Shopping Cart'
        visible={modalVisible}
        handleClose={triggerState(setModalVisible, false)}
        footer={modalFooter}
        height={paymentCardVisible ? 526 : 281}
      >
        {modalBody}
      </CartModal>
    </Navbar>
  )
}

export default AppNavbar
