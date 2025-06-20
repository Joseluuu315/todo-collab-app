import React, { useState } from 'react';
import { Navbar, Container, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getUserName } from '../service/todoService';

const MyNavbar: React.FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" className="bg-dark">
      <Container>
        <Navbar.Brand href="/" className="text-black">To-Do Colaborativa</Navbar.Brand>
        <Navbar.Brand href="/login" className="text-black">Login</Navbar.Brand>
        <Navbar.Brand href="/register" className="text-black">Register</Navbar.Brand>
        <button className="btn" onClick={handleShow}>Account</button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Username: {getUserName()}</p>
          </Modal.Body>
        </Modal>

      </Container>
    </Navbar>
  );
};

export default MyNavbar;
