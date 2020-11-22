import React from 'react'
import styled from 'styled-components'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  visible: boolean
  handleClose: () => void
  title?: string
  children?: JSX.Element
  btnLabel?: string
  btnClick?: () => void
  footer?: JSX.Element
}

const CartModal = (props: Props) => {
  const {
    visible = false,
    handleClose = () => { },
    title = 'Title',
    children = 'Content',
    btnLabel = 'OK',
    btnClick = () => { },
    footer
  } = props
  return (
    <Modal show={visible} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer className='d-flex align-items-center justify-content-between'>
        {footer}
        <Button variant="secondary" onClick={btnClick}>
          {btnLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CartModal
