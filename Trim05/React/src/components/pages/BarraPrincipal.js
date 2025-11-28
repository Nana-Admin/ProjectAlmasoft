import React from "react";
import { Container, Nav, Navbar, NavDropdown, Form, Button} from 'react-bootstrap';
import logo from '../../img/logoAS.png';
import { Link, useNavigate } from "react-router-dom";


const BarraPrincipal = () => {
    const navigate = useNavigate();
    return (
        <Navbar style={{ backgroundColor: "#ffffffff" }} expand="lg" variant="dark" >
            <Container>
                <Navbar.Brand href="#" className="d-flex align-items-center">
                    <img
                        alt="logo"
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="fs-4">ALMASOFT</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="d-flex ms-auto">
                        <Button variant="dark" className="me-2" onClick={() => navigate('/ecommerce')}>Buscar</Button>
                        <Button as={Link} to="/pages/IniciarSesion" className="me-2" variant="dark">Iniciar Secion</Button>
                        <Button as={Link} to="/pages/Registrarse" variant="dark">Registrarse</Button>
                    </div>
                </Navbar.Collapse>

            </Container>
        </Navbar>
    );
}



export default BarraPrincipal;
