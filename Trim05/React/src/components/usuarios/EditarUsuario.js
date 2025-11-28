import React, { useEffect, useState } from "react";
import { Container, Button, Form, Card, Alert } from "react-bootstrap";
import { useToast, useAuth } from "../../App";
import { useParams, useNavigate } from "react-router-dom";

const EditarUsuario = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState({
        rolUsuario: '',
        documento: "",
        primerNombre: "",
        segundoNombre: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        direccion: "",
        telefono: "",
    });
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const { info, success, error } = useToast();
    const [rolesDisponibles, setRolesDisponibles] = useState([]);
    const nombreDBPorKey = { cliente: 'cliente', admin: 'administrador', afiliado: 'afiliado', asesor: 'asesor' };
    const getIdByKey = (key) => {
        const n = nombreDBPorKey[key];
        const r = rolesDisponibles.find(x => String(x.nombre).toLowerCase() === n);
        return r?.id;
    };

    useEffect(() => {
        const cargar = async () => {
            try {
                const [resUsuario, resRoles] = await Promise.all([
                    fetch('/api/usuarios', { headers: { 'Authorization': `Bearer ${user?.token ?? ''}` } }),
                    fetch('/api/roles', { headers: { 'Authorization': `Bearer ${user?.token ?? ''}` } })
                ]);
                const dataUsuarios = await resUsuario.json();
                const dataRoles = await resRoles.json();
                if (Array.isArray(dataRoles)) setRolesDisponibles(dataRoles);
                if (Array.isArray(dataUsuarios)) {
                    const encontrado = dataUsuarios.find(u => String(u.idUsuario) === String(id));
                    if (encontrado) {
                        const nombres = (encontrado.rolUsuario || '')
                            .split(',')
                            .map(r => r.trim().toLowerCase())
                            .filter(Boolean);
                        const keys = nombres.map(n => {
                            if (n.includes('admin')) return 'admin';
                            if (n.includes('cliente')) return 'cliente';
                            if (n.includes('afiliado')) return 'afiliado';
                            if (n.includes('asesor')) return 'asesor';
                            return null;
                        }).filter(Boolean);
                        setUsuario({ ...encontrado, rolUsuario: keys[0] || '' });
                    }
                }
            } catch (e) {
                error('No se pudo cargar el usuario');
            }
        };
        cargar();
    }, [id, user, error]);

    const handleChange = (e) => {
        const { name, value, selectedOptions } = e.target;
        if (name === "rolUsuario") {
            const roles = Array.from(selectedOptions).map((o) => o.value);
            setUsuario({ ...usuario, rolUsuario: roles });
        } else {
            setUsuario({ ...usuario, [name]: value });
        }
    };

    const onSelectRol = (key) => {
        setUsuario({ ...usuario, rolUsuario: key });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const idRol = getIdByKey(usuario.rolUsuario);
            const rol_ids = Number.isFinite(idRol) ? [idRol] : [];
            const res = await fetch(`/api/usuarios/${id}/roles`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token ?? ''}`
                },
                body: JSON.stringify({ rol_ids })
            });
            if (res.ok) {
                setMostrarAlerta(true);
                success('Usuario actualizado');
                navigate('/usuarios/Usuario');
            } else {
                const d = await res.json().catch(() => ({}));
                error(d.message || 'Error al actualizar roles');
            }
        } catch (er) {
            error('Error de red');
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: "600px" }}>
            <Card>
                <Card.Header>
                    <h3 className="text-center">Editar Usuario</h3>
                    {mostrarAlerta && (
                        <Alert variant="success" onClose={() => setMostrarAlerta(false)} dismissible>
                            Cambios guardados correctamente
                        </Alert>
                    )}
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group className="mb-3">
                            <Form.Label>Rol(es)</Form.Label>
                            {['cliente','admin','afiliado','asesor'].map((key) => (
                                <Form.Check
                                    key={key}
                                    type="radio"
                                    name="rol-unico"
                                    id={`rol-${key}`}
                                    label={key}
                                    checked={usuario.rolUsuario === key}
                                    onChange={() => onSelectRol(key)}
                                />
                            ))}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Documento</Form.Label>
                            <Form.Control
                                type="text"
                                name="documento"
                                value={usuario.documento}
                                onChange={handleChange}
                                placeholder="Digite el documento"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Primer Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="primerNombre"
                                value={usuario.primerNombre}
                                onChange={handleChange}
                                placeholder="Digite el primer nombre"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Segundo Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="segundoNombre"
                                value={usuario.segundoNombre}
                                onChange={handleChange}
                                placeholder="Digite el segundo nombre"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Primer Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="primerApellido"
                                value={usuario.primerApellido}
                                onChange={handleChange}
                                placeholder="Digite el primer apellido"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Segundo Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                name="segundoApellido"
                                value={usuario.segundoApellido}
                                onChange={handleChange}
                                placeholder="Digite el segundo apellido"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                name="telefono"
                                value={usuario.telefono}
                                onChange={handleChange}
                                placeholder="Digite el teléfono"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={usuario.direccion}
                                onChange={handleChange}
                                placeholder="Digite la dirección"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={usuario.email}
                                onChange={handleChange}
                                placeholder="Digite el correo"
                            />
                        </Form.Group>

                        <Button style={{ background: "#7856AE", border: "#7856AE" }} type="submit">
                            Guardar
                        </Button>
                        <Button style={{ background: "#7856AE", border: "#7856AE" }} className="mx-5" type="button" onClick={() => { info("Operación cancelada"); navigate('/usuarios/Usuario'); }}>
                            Cancelar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EditarUsuario;
