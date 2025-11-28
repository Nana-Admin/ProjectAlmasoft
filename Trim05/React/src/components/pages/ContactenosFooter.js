import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const ContactenosFooter =()=>{
    return(
      <Container fluid style={{ backgroundColor: "#211730", color: "#fff", padding: "24px 0", marginTop: 40 }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <h5 className="text-center mb-4">Contáctenos</h5>
            <Row>
              <Col md={4} className="mb-3 d-flex align-items-center gap-2">
                <FiPhone size={22} color="#C68AFF" />
                <a href="tel:+576015551234" style={{ color: "#C68AFF", textDecoration: "none" }}>(601) 555 1234</a>
              </Col>
              <Col md={4} className="mb-3 d-flex align-items-center gap-2">
                <MdEmail size={22} color="#C68AFF" />
                <a href="mailto:contacto@almosoft.com" style={{ color: "#C68AFF", textDecoration: "none" }}>contacto@almosoft.com</a>
              </Col>
              <Col md={4} className="mb-3 d-flex align-items-center gap-2">
                <FaWhatsapp size={22} color="#25D366" />
                <a href="https://wa.me/573001234567" target="_blank" rel="noreferrer" style={{ color: "#25D366", textDecoration: "none" }}>+57 300 123 4567</a>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
}

export default ContactenosFooter;
