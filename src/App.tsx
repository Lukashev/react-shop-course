import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import ProductList from './components/ProductList';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Container className='mb-4 mt-4'>
      <Row>
        <Col md={12} className='mb-4'>
          <AppNavbar />
        </Col>
      </Row>
      <Row>
        <Col md={12} className='pl-0'>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
