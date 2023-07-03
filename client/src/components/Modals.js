import { Col, Button, Card, Modal } from 'react-bootstrap';
import { useState } from 'react';

function WelcomeToJoyride() {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Welcome to JoyRide!</Modal.Title>
          </Modal.Header>
          <Modal.Body>Life is to short to drive a Prius</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Get Started
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default WelcomeToJoyride;