import React from "react";
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import ContactenosFooter from './ContactenosFooter';
import logo from '../../img/1.png';
import Ataud1 from '../../img/Ataud1.jpg';
import Urna1 from '../../img/Urna1.jpg';
import Lapida2 from '../../img/Lapida2.png';
import Arreglo3 from '../../img/Arreglo3.jpg';
import Promocion from '../../img/Promocion.png';
import { Link } from "react-router-dom";

const PaginaInicio = () => {
    return (
        <div style={{ background: "#D0D3D8", minHeight: "100vh" }}>
        <div style={{ background: "#FFFFFF", boxShadow: "0 2px 10px rgba(0,0,0,0.08)" }}>
          <Container>
            <Row className="align-items-center" style={{ padding: "12px 0" }}>
              <Col xs="auto">
                <img
                  src={logo}
                  alt="AlmaSoft"
                  style={{ height: 80, width: 80, objectFit: "cover", borderRadius: 8 }}
                />
              </Col>
              <Col className="text-end">
                <Button as={Link} to="/login" variant="outline-dark">Iniciar Sesión</Button>
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="align-items-center">
            <div style={{ padding: "60px 0" }}>
                <h1 className="text-center fw-bold" style={{ color: "#5B42C7", fontSize: "3rem" }}>Funeraria AlmaSoft</h1>
                <p className="text-center text-muted" style={{ maxWidth: 800, margin: "20px auto", fontSize: "1.2rem", lineHeight: "1.6" }}>
                    Acompañamos con respeto y calidez en los momentos más difíciles, ofreciendo soluciones integrales y personalizadas para honrar la memoria de tus seres queridos.
                </p>
            </div>

            <Row className="justify-content-center g-4">
                <Col md={10}>
                    <Card className="shadow-sm" style={{ borderRadius: 20, padding: "20px" }}>
                        <Card.Body>
                            <Row>
                                <Col md={6} className="mb-3">
                                    <h3 className="fw-bold" style={{ color: "#5B42C7" }}>Quiénes Somos</h3>
                                    <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                        Somos AlmaSoft, una funeraria comprometida con la dignidad, el respeto y la excelencia en el servicio. Nuestro equipo humano está preparado para brindar acompañamiento, asesoría y logística con empatía y profesionalismo.
                                    </p>
                                </Col>
                                <Col md={6}>
                                    <h3 className="fw-bold" style={{ color: "#5B42C7" }}>Qué Ofrecemos</h3>
                                    <p style={{ fontSize: "1rem", lineHeight: "1.6" }}>
                                        Ofrecemos planes funerarios, productos y servicios integrales para cada necesidad, desde la preparación y velación hasta el sepelio y la gestión documental, con opciones personalizadas y transparentes.
                                    </p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="text-center mt-5 mb-4" style={{ color: "#5B42C7", fontWeight: "700" }}>Servicios Destacados</h2>
            <Row className="justify-content-center g-4">
                {[{img: Ataud1, title: "Ataud Imperium", text: "Ataúde de alta calidad, materiales nobles y acabados premium."},
                  {img: Urna1, title: "Urna Classic", text: "Urna clásica con diseño sobrio para preservar el recuerdo."},
                  {img: Lapida2, title: "Lápida", text: "Lápida personalizada en materiales resistentes a la intemperie."},
                  {img: Arreglo3, title: "Arreglo Corona Funeraria", text: "Arreglo floral diseñado para homenajes solemnes y elegantes."}
                ].map((item, index) => (
                    <Col key={index}>
                        <Card className="my-3 shadow-sm" style={{ width: '18rem', borderRadius: '15px', transition: "transform 0.3s, box-shadow 0.3s" }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = "translateY(-8px)";
                                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                            }}
                        >
                            <Card.Img variant="top" src={item.img} style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', height: '200px', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title style={{ color: "#5B42C7", fontWeight: 600 }}>{item.title}</Card.Title>
                                <Card.Text style={{ fontSize: "0.95rem", color: "#555" }}>
                                    {item.text}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <ContactenosFooter />

        </Container>
        </div>
    );
}

export default PaginaInicio;
