import React from "react";
import { Container, Form, Card, Button, Alert, } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../App";
import { useState } from "react";
import Fondo from '../../img/3302177.jpg';


const Registrarse = () => {

    const [formData, setData] = useState({
        DocumentoCliente: '',
        NombreCliente: '',
        ApellidoCliente: '',
        DireccionCliente: '',
        TelefonoCliente: '',
        CorreoCliente: '',
        Credencial: ''
    });

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const { info, success, error } = useToast();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }



    const enviarDatos = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    documento: Number(formData.DocumentoCliente),
                    primer_nombre: formData.NombreCliente,
                    primer_apellido: formData.ApellidoCliente,
                    correo: formData.CorreoCliente,
                    credencial: formData.Credencial,
                    rol_id: 2
                })
            });
            const data = await res.json();
            if (res.status === 201) {
                setMostrarAlerta(true);
                success('Usuario registrado');
                navigate('/login');
            } else {
                error(data.message || 'Error al registrar');
            }
        } catch (err) {
            error('Error de red');
        }
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${Fondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",              
                justifyContent: "center",     
                alignItems: "center"          
            }}
        >
            <Container className=" align-items-center" style={{ maxWidth: "600px" }}>
                <Card>
                    <Card.Header>
                        <h3 className="text-center">Registrarse</h3>
                        {mostrarAlerta && (
                            <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
                                Datos enviados  correctamente!!!!......
                            </Alert>
                        )}
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={enviarDatos}>
                            <Form.Group className="mb-3" controlId="DocumentoCliente">
                                <Form.Label>DOCUMENTO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DocumentoCliente"
                                    value={formData.DocumentoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el documento"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="NombreCliente">
                                <Form.Label>NOMBRE</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="NombreCliente"
                                    value={formData.NombreCliente}
                                    onChange={handleChange}
                                    placeholder="digite el nombre "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="ApellidoCliente">
                                <Form.Label>APELLIDO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="ApellidoCliente"
                                    value={formData.ApellidoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el apellido "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="DireccionCliente">
                                <Form.Label>DIRECCION</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="DireccionCliente"
                                    value={formData.DireccionCliente}
                                    onChange={handleChange}
                                    placeholder="digite la direccion  "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="TelefonoCliente">
                                <Form.Label>TELEFONO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="TelefonoCliente"
                                    value={formData.TelefonoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el telefono  "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="CorreoCliente">
                                <Form.Label>CORREO</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="CorreoCliente"
                                    value={formData.CorreoCliente}
                                    onChange={handleChange}
                                    placeholder="digite el Correo  "
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Credencial">
                                <Form.Label>CONTRASEÑA</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="Credencial"
                                    value={formData.Credencial}
                                    onChange={handleChange}
                                    placeholder="********"
                                />
                            </Form.Group>

                            <Button style={{background:"#7856AE"}} type="submit">Guardar</Button>
                            <Button style={{background:"#7856AE"}} type="button" onClick={() => info("Operación cancelada")}>Cancelar</Button>

                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Registrarse;
