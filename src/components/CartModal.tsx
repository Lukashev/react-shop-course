import React from 'react'
import styled from 'styled-components'
import { Modal } from 'react-bootstrap'

interface Props {
  visible: boolean
  handleClose: () => void
  title?: string
  children?: JSX.Element
  footer?: JSX.Element
  height?: number
}

const StyledModal = styled(Modal)`
  & .modal {
    &-body {
      max-height: ${(props: Props) => props.height}px;
      overflow: auto;
    }
  }
`

const CartModal = (props: Props) => {
  const {
    visible = false,
    handleClose = () => { },
    title = 'Title',
    children = 'Content',
    footer,
    height
  } = props
  return (
    <StyledModal show={visible} onHide={handleClose} animation={false} height={height}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer className='d-flex align-items-center justify-content-between'>
        {footer}
      </Modal.Footer>
    </StyledModal>
  )
}

export default CartModal
