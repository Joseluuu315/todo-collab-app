import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" className="bg-dark">
      <Container>
        <Navbar.Brand href="/" className="text-black">To-Do Colaborativa</Navbar.Brand>
        <Navbar.Brand href="/login" className="text-black">Login</Navbar.Brand>
        <Navbar.Brand href="/register" className="text-black">Register</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
