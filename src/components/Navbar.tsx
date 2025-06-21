import React, { useState } from 'react';
import { Navbar, Container, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const MyNavbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [user, loading] = useAuthState(auth);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    signOut(auth);
    setShow(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" className='text-black'>To-Do Colaborativa</Navbar.Brand>

        {!user && !loading && (
          <>
            <Navbar.Brand href="/login" className="text-black">Login</Navbar.Brand>
            <Navbar.Brand href="/register" className="text-black">Register</Navbar.Brand>
          </>
        )}

        {user && (
          <>
            <Button variant="dark" onClick={handleShow}>Account</Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Username: {user.displayName || user.email}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="dark" onClick={handleClose}>Close</Button>
              </Modal.Footer>
            </Modal>

            <Button variant="dark" onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
