import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import usuario1 from '../../img/usuario.png'
import { useAuth, useToast } from "../../App";

const DetallesUsuario = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { error } = useToast();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/api/usuarios', {
                    headers: { 'Authorization': `Bearer ${user?.token ?? ''}` }
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    const encontrado = data.find(u => String(u.idUsuario) === String(id));
                    setUsuario(encontrado || null);
                }
            } catch (e) {
                error('No se pudo cargar el usuario');
            }
        };
        cargar();
    }, [id, user, error]);

    if (!usuario) {
        return <h2 className="text-center mt-5">Usuario no encontrado</h2>;
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <h3 className="text-center">Detalles del Usuario</h3>
                        </Card.Header>
                        <Card.Body>
                            <h4>Id Usuario: {usuario.idUsuario}</h4>
                            <h4>Documento: {usuario.documento}</h4>
                            <h4>Nombres: {usuario.primerNombre} {usuario.segundoNombre || ''}</h4>
                            <h4>Apellidos: {usuario.primerApellido} {usuario.segundoApellido || ''}</h4>
                            <h4>Email: {usuario.email}</h4>
                            <h4>Direccion: {usuario.direccion}</h4>
                            <h4>Telefono: {usuario.telefono}</h4>
                            <Button variant="outline-dark" className="mt-3" onClick={() => navigate('/usuarios/Usuario')}>Atrás</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col>
                    <Card style={{ width: '30rem' }}>
                        <Card.Header>
                            <h3 className="text-center">{usuario.rolUsuario || 'Sin rol'}</h3>
                        </Card.Header>
                        <Card.Img variant="top" src={usuario1} />
                        <Card.Body>
                            <Card.Text>
                                Información adicional del usuario.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetallesUsuario;
