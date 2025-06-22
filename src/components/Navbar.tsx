import React, { useState, useEffect } from 'react';
import { Navbar, Container, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const MyNavbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    signOut(auth);
    setShow(false);
  };

  useEffect(() => {
    if (user?.photoURL) {
      setPhotoURL(user.photoURL);
    } else {
      setPhotoURL('./src/assets/react.svg');
    }
  }, [user]);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">To-Do Colaborativa</Navbar.Brand>

        {!user && !loading && (
          <>
            <Navbar.Brand href="/login">Login</Navbar.Brand>
            <Navbar.Brand href="/register">Register</Navbar.Brand>
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
                <p><strong>Username:</strong> {user.displayName || user.email}</p>
                <p><strong>Gmail:</strong> {user.email}</p>
                <p><strong>Date:</strong> {user.metadata.creationTime}</p>
                <img src={photoURL} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
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
