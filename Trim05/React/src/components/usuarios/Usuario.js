import React, { useEffect, useMemo, useState } from "react";
import { Container, Table, Row, Col, Form, Button, Dropdown } from "react-bootstrap";
import { useToast } from "../../App";
import { Link } from "react-router-dom";
import { useAuth } from "../../App";


const usuarios = [
    {
        idUsuario:"1",
        rolUsuario:"Cliente",
        documento: "1025887459",
        primerNombre: "Anderson",
        segundoNombre: "Giovanny",
        primerApellido: "Montoya",
        segundoApellido: "Rojas",
        email: "anderson@gmail.com",
        direccion: "Calle 133",
        telefono: "3115644111",
        credencial:"anderson123"
    },
    {
        idUsuario:"2",
        rolUsuario:"Administrador",
        documento: "1025887459",
        primerNombre: "Esteban",
        segundoNombre: "a",
        primerApellido: "Martinez",
        segundoApellido: "Martinez",
        email: "esteban@gmail.com",
        direccion: "Calle 55",
        telefono: "3115644111",
        credencial:"esteban123"
    },
    {
        idUsuario:"3",
        rolUsuario:"Asesor",
        documento: "1025887459",
        primerNombre: "Sara",
        segundoNombre: "Daniela",
        primerApellido: "Mendoza",
        segundoApellido: "Martinez",
        email: "sara@gmail.com",
        direccion: "carrera 55",
        telefono: "3115644111",
        credencial:"Sdaniela123"
    },
    {
        idUsuario:"4",
        rolUsuario:"Asesor",
        documento: "1025887459",
        primerNombre: "Katherine",
        segundoNombre: "aa",
        primerApellido: "Gonzales",
        segundoApellido: "Lopez",
        email: "K@gmail.com",
        direccion: "Calle 89",
        telefono: "3115644111",
        credencial:"Katherine123"
    },
    {
        idUsuario:"5",
        rolUsuario:"Cliente",
        documento: "1025887459",
        primerNombre: "Liliana",
        segundoNombre: "",
        primerApellido: "Martinez",
        segundoApellido: "",
        email: "lili@gmail.com",
        direccion: "Calle 74",
        telefono: "3115644111",
        credencial:"liliM123"
    }
];


const Usuario = () => {
    const { info, success, error } = useToast();
    const { user } = useAuth();
    const [lista, setLista] = useState([]);
    useEffect(() => {
        const cargar = async () => {
            try {
                const res = await fetch('/api/usuarios', {
                    headers: { 'Authorization': `Bearer ${user?.token ?? ''}` }
                });
                const data = await res.json();
                if (Array.isArray(data)) setLista(data);
            } catch (err) {
                error('No se pudo cargar usuarios');
            }
        };
        cargar();
    }, [user]);
    const [termino, setTermino] = useState("");
    const filtrados = useMemo(() => {
        const t = termino.trim().toLowerCase();
        if (!t) return lista;
        return lista.filter(u =>
            (u.documento || "").toLowerCase().includes(t) ||
            (u.primerNombre || "").toLowerCase().includes(t) ||
            (u.primerApellido || "").toLowerCase().includes(t)
        );
    }, [termino, lista]);
    return (
        <Container fluid style={{ padding: "20px 25px" }}>
            <Row className="mb-4">
                <Col>
                    <h2>Lista de Usuarios</h2>
                </Col>
                <Col className="text-end" >
                    <Button as={Link} to="/usuarios/AgregarUsuario" style={{ background: "#7856AE", border: "#7856AE" }}>
                        Agregar Usuario
                    </Button>
                </Col>
            </Row>
            <Form className="mb-3" onSubmit={(e) => { e.preventDefault(); info("Búsqueda ejecutada"); }}>
                <Row>
                    <Col md={8}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por documento de indentidad......"
                            value={termino}
                            onChange={(e) => setTermino(e.target.value)}
                        />
                    </Col>
                    <Col md={4} >
                        <Button type="submit" className="me-4" variant="outline-dark" >Buscar</Button>
                        <Button type="button" variant="outline-dark" onClick={() => { setTermino(""); info("Mostrando todos"); }}>Mostrar Todos</Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover >
                <thead className="table-secondary">
                    <tr >
                        <td scope="col">Rol</td>
                        <td scope="col">Documento</td>
                        <td scope="col">Primer Nombre</td>
                        <td scope="col">Segundo Nombre</td>
                        <td scope="col">Primer Apellido</td>
                        <td scope="col">Segundo Apellido</td>
                        <td scope="col">Email</td>
                        <td scope="col">Direccion</td>
                        <td scope="col">Telefono</td>
                        <td scope="col">Credencial</td>
                        <td scope="col">Acciones</td>
                    </tr>
                </thead>

                <tbody>
                    {filtrados.map((usuario) => (
                        <tr key={usuario.idUsuario}>
                            <td>{usuario.rolUsuario || 'Sin rol'}</td>
                            <td>{usuario.documento}</td>
                            <td>{usuario.primerNombre}</td>
                            <td>{usuario.segundoNombre}</td>
                            <td>{usuario.primerApellido}</td>
                            <td>{usuario.segundoApellido}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.direccion}</td>
                            <td>{usuario.telefono}</td>
                            <td>{usuario.credencial}</td>

                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                                        Acciones
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to={`/usuarios/EditarUsuario/${usuario.idUsuario}`}>
                                            Editar
                                        </Dropdown.Item>
                                        <Dropdown.Item as={Link} to={`/usuarios/detalles/${usuario.idUsuario}`}>
                                            Detalles
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={() => success("Usuario habilitado")}>Habilitar</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>


            </Table>

        </Container>
    );
}

export default Usuario;
