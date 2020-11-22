import React, { useEffect } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Container, Row, Col } from 'react-bootstrap'
import { ReducerState, Action } from '../../interfaces'
import Card from '../Card'

interface Actions {
  fetchProductList: (offeset: number) => (dispatch: ThunkDispatch<ReducerState, any, Action>) => Promise<void>
  setMainState: (payload: any) => Action
}

type Props = ReducerState & { actions: Actions }

const ProductList = (props: Props) => {
  const { actions: { fetchProductList, setMainState }, products, currency, cart, fetchOffset, searchString } = props

  useEffect(() => {
    fetchProductList(fetchOffset)
  }, [fetchOffset, fetchProductList, searchString])

  const cardProps = { currency, setMainState, cart }

  return (
    <Container>
      <Row>
        {products.map(item => {
          return (
            <Col lg={3} md={6} sm={6} xs={12} key={item.id}>
              <Card {...item} {...cardProps} />
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default ProductList
