import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#">To-Do Colaborativa</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
