import React from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./inicio.css";

// Iconos para los accesos directos
import { FaUsers, FaShoppingCart, FaWarehouse, FaTags } from 'react-icons/fa';

const Inicio = () => {
  const navigate = useNavigate();

  // Datos de los accesos directos
  const accesosDirectos = [
    {
      id: 1,
      titulo: "Clientes",
      descripcion: "Gestión de clientes y servicios",
      icono: <FaUsers />,
      ruta: "/clientes/cliente",
      color: "#7b1fa2"
    },
    {
      id: 2,
      titulo: "Compras",
      descripcion: "Registro y control de compras",
      icono: <FaShoppingCart />,
      ruta: "/compras",
      color: "#6a1b9a"
    },
    {
      id: 3,
      titulo: "Bodega",
      descripcion: "Inventario y gestión de productos",
      icono: <FaWarehouse />,
      ruta: "/bodega",
      color: "#4a148c"
    },
    {
      id: 4,
      titulo: "Categorías",
      descripcion: "Administración de categorías",
      icono: <FaTags />,
      ruta: "/categorias",
      color: "#3b1a5e"
    }
  ];

  // Función para navegar a la ruta seleccionada
  const navegarA = (ruta) => {
    navigate(ruta);
  };
  
  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="inicio-container">
      <Container>
        <h2 className="text-center mb-5">Bienvenido al Sistema de Gestión Funeraria</h2>
        
        <Row className="justify-content-center">
          {accesosDirectos.map((acceso) => (
            <Col key={acceso.id} xs={12} sm={6} md={6} lg={3} className="mb-4">
              <Card 
                className="acceso-card" 
                onClick={() => navegarA(acceso.ruta)}
                style={{ borderColor: acceso.color }}
              >
                <Card.Body className="text-center">
                  <div className="icono-container" style={{ backgroundColor: acceso.color }}>
                    {acceso.icono}
                  </div>
                  <Card.Title className="mt-3">{acceso.titulo}</Card.Title>
                  <Card.Text>{acceso.descripcion}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        
        <Row className="justify-content-center mt-4">
          <Col xs={12} sm={6} md={6} lg={3} className="text-center">
            <Button 
              className="cerrar-sesion-btn" 
              variant="danger" 
              onClick={cerrarSesion}>
              Cerrar Sesión
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inicio;