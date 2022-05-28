import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function CheckoutSteps(props) {
  return (
    <div>
      <Row className="checkout-steps gx-5">
        <Col xs={3} md={3} lg={3} className={props.step1 ? 'active' : ''}>
          Sign-In
        </Col>
        <Col xs={3} md={3} lg={3} className={props.step2 ? 'active' : ''}>
          Shipping
        </Col>
        <Col xs={3} md={3} lg={3} className={props.step3 ? 'active' : ''}>
          Payment
        </Col>
        <Col xs={3} md={3} lg={3} className={props.step4 ? 'active' : ''}>
          Place Order
        </Col>
      </Row>
    </div>
  );
}
