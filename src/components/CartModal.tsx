import React from 'react'
import { Modal, Button } from 'react-bootstrap'

interface Props {
  visible: boolean
  handleClose: () => void
  title?: string
  children?: JSX.Element
  btnLabel?: string
  btnClick?: () => void
}

const CartModal = (props: Props) => {
  const {
    visible = false,
    handleClose = () => {},
    title = 'Title',
    children = 'Content',
    btnLabel = 'OK',
    btnClick = () => {}
  } = props
  return (
    <Modal show={visible} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={btnClick}>
          {btnLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default CartModal
