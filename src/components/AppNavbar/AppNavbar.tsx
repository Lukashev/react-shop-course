import React from 'react'
import { Navbar, Form, FormControl } from 'react-bootstrap'

interface Props { }

const AppNavbar = (props: Props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">React Shop</Navbar.Brand>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      </Form>
    </Navbar>
  )
}

export default AppNavbar
