import React, { useEffect, useMemo, useState } from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { Container, Row, Col, Pagination } from 'react-bootstrap'
import { ReducerState, Action } from '../../interfaces'
import Card from '../Card'

const PAGE_LIMIT = 4

interface Actions {
  fetchProductList: () => (dispatch: ThunkDispatch<ReducerState, any, Action>) => Promise<void>
  setMainState: (payload: any) => Action
}

type Props = ReducerState & { actions: Actions }

const ProductList = (props: Props) => {
  const { actions: { fetchProductList, setMainState }, products, currency, cart, searchString } = props
  const [activePage, setActivePage] = useState<number>(0)

  useEffect(() => {
    fetchProductList()
  }, [fetchProductList, searchString])

  const cardProps = { currency, setMainState, cart }

  const pagItems = useMemo(() => {
    const pageLimit = Math.ceil(products.length / PAGE_LIMIT)
    let items = []
    for (let i = 0; i < pageLimit; i++) {
      items.push(
      <Pagination.Item
        key={i}
        active={activePage === i}
        onClick={() => setActivePage(i)}
        >
          {i + 1}
      </Pagination.Item>
      )
    }
    return items
  }, [activePage, products.length])

  return (
    <Container>
      <Row>
        {products.length ? products.slice(activePage, activePage + PAGE_LIMIT).map(item => {
          return (
            <Col lg={3} md={6} sm={6} xs={12} key={item.id}>
              <Card {...item} {...cardProps} />
            </Col>
          )
        }) : <h4 className='pl-3'>Products not found</h4>}
      </Row>
      <Pagination className='justify-content-center'>
        {pagItems}
      </Pagination>
    </Container>
  )
}

export default ProductList
