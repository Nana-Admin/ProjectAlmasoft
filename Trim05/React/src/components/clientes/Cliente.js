import React, { useEffect, useMemo, useState } from "react";
import { Container, Table, Row, Col, Button, Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth, useToast } from "../../App";

const clientes = [];



const Cliente = () => {
    const [termino, setTermino] = useState("");
    const { user } = useAuth();
    const { error } = useToast();
    const [lista, setLista] = useState([]);
    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/api/clientes', {
                    headers: { 'Authorization': `Bearer ${user?.token ?? ''}` }
                });
                const data = await res.json();
                if (Array.isArray(data)) {
                    const normalizados = data.map(c => ({
                        id: c.cliente_id,
                        documento: String(c.usuario?.usuario_documento ?? ''),
                        primerNombre: c.usuario?.usuario_primer_nombre ?? '',
                        segundoNombre: c.usuario?.usuario_segundo_nombre ?? '',
                        primerApellido: c.usuario?.usuario_primer_apellido ?? '',
                        segundoApellido: c.usuario?.usuario_segundo_apellido ?? '',
                        email: c.usuario?.usuario_correo ?? '',
                        direccion: c.usuario?.usuario_direccion ?? '',
                        telefono: c.usuario?.telefonos?.[0]?.telefono ? String(c.usuario.telefonos[0].telefono) : '',
                        fechaNacimiento: c.cliente_fecha_nacimiento ? new Date(c.cliente_fecha_nacimiento).toLocaleDateString('es-CO') : '',
                        edad: c.cliente_edad ?? ''
                    }));
                    setLista(normalizados);
                }
            } catch (err) {
                error('No se pudo cargar clientes');
            }
        };
        cargar();
    }, [user]);

    const filtrados = useMemo(() => {
        const t = termino.trim().toLowerCase();
        if (!t) return lista;
        return lista.filter(c => (c.documento || '').toLowerCase().includes(t));
    }, [termino, lista]);
    return (
<Container fluid style={{ padding: "20px 25px" }}>         
       <Row className="mb-4">
                <Col>
                    <h2 className="text-center">Lista de clientes</h2>
                </Col>
                
            </Row>
            <Form style={{ marginTop: "2px", paddingRight: "10px", marginBottom: "8px" }} onSubmit={(e) => e.preventDefault()}>

                <Row>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por documento de indentidad......"
                            value={termino}
                            onChange={(e) => setTermino(e.target.value)}
                        />
                    </Col>
                   <Col md={4} className="d-flex justify-content-end flex-wrap gap-4">
                        <Button type="submit" variant="outline-dark">Buscar</Button>
                        <Button type="button" variant="outline-dark" onClick={() => setTermino("")}>Mostrar Todos</Button>
                        <Button variant="dark" as={Link} to="/clientes/AgregarCliente">
                            Agregar Cliente
                        </Button>
                        </Col>
                    </Row>
            </Form>
            <Table striped bordered hover >
                <thead className="table-secondary">
                    <tr >
                        <td scope="col">Documento</td>
                        <td scope="col">Primer Nombre</td>
                        <td scope="col">Segundo Nombre</td>
                        <td scope="col">Primer Apellido</td>
                        <td scope="col">Segundo Apellido</td>
                        <td scope="col">Email</td>
                        <td scope="col">Direccion</td>
                        <td scope="col">Telefono</td>
                        <td scope="col">Fecha de Nacimiento</td>
                        <td scope="col">Edad</td>
                        <td scope="col">Acciones</td>
                    </tr>
                </thead>

                <tbody>
                    {filtrados.map((cliente) => (
                        <tr key={cliente.id}>
                            <td>{cliente.documento}</td>
                            <td>{cliente.primerNombre}</td>
                            <td>{cliente.segundoNombre}</td>
                            <td>{cliente.primerApellido}</td>
                            <td>{cliente.segundoApellido}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.direccion}</td>
                            <td>{cliente.telefono}</td>
                            <td>{cliente.fechaNacimiento}</td>
                            <td>{cliente.edad}</td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                        Acciones
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/clientes/editar/${cliente.id}`}>
                                            Editar
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to={`/clientes/detalles/${cliente.id}`}>
                                            Detalles
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Habilitar</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </Table>

            <nav aria-label="page navigation">
                <ul class=" pagination justify-content-center">
                    <li class="page-item disabled">
                        <a class="page-link">ATRAS</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">SIGUIENTE</a>
                    </li>
                </ul>
            </nav>



        </Container>
    );

}

export default Cliente;
