import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const BarraCliente = () => {
  return (
    <Navbar style={{ backgroundColor: "#633f9eff" }} expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/inicio"
              style={{
                color: "white",
                fontWeight: "500",
                textDecoration: "none",
                fontSize: "1.1rem",
              }}
            >
              ADMIN
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default BarraCliente;
