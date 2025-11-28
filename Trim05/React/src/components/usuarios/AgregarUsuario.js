import React, { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useToast, useAuth } from "../../App";
import { Link, useNavigate } from "react-router-dom";

const AgregarUsuario = () => {
    const [formData, setData] = useState({
        Rol: '',
        Documento :'',
        PrimerNombre:'',
        SegundoNombre:'',
        PrimerApellido:'',
        SegundoApellido:'',
        Direccion:'',
        Telefono:'',
        Correo:'',
        Credencial:'',
    });

    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const { info, success, error } = useToast();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [rolesDisponibles, setRolesDisponibles] = useState([]);
    const nombreDBPorKey = { cliente: 'cliente', admin: 'administrador', afiliado: 'afiliado', asesor: 'asesor' };
    const getIdByKey = (key) => {
        const n = nombreDBPorKey[key];
        const r = rolesDisponibles.find(x => String(x.nombre).toLowerCase() === n);
        return r?.id;
    };

    useEffect(() => {
        const cargarRoles = async () => {
            try {
                const res = await fetch('/api/roles', { headers: { 'Authorization': `Bearer ${user?.token ?? ''}` } });
                const data = await res.json();
                if (Array.isArray(data)) setRolesDisponibles(data);
            } catch (e) { /* noop */ }
        };
        cargarRoles();
    }, [user]);
    const handleChange = (e) =>{
        const { name, value, selectedOptions } = e.target;
        setData({ ...formData, [name]: value });
    }

    const onSelectRol = (key) => {
        setData({ ...formData, Rol: key });
    }



    const enviarDatos= async (e) => {
        e.preventDefault();
        try {
            const idRol = getIdByKey(formData.Rol);
            const rol_ids = Number.isFinite(idRol) ? [idRol] : [];
            const payload = {
                documento: Number(formData.Documento),
                primer_nombre: formData.PrimerNombre,
                primer_apellido: formData.PrimerApellido,
                correo: formData.Correo,
                credencial: formData.Credencial,
                rol_ids
            };
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(user?.token ? { 'Authorization': `Bearer ${user.token}` } : {})
                },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (res.status === 201) {
                setMostrarAlerta(true);
                success('Usuario guardado');
                navigate('/usuarios/Usuario');
            } else {
                error(data.message || 'Error al guardar usuario');
            }
        } catch (err) {
            error('Error de red');
        }
    }

    return(
      <Container className="mt-5" style={{maxWidth: "600px"}}>
        <Card>
               <Card.Header>
                 <h3 className="text-center">Agregar Nuevo Usuario</h3>
                 {mostrarAlerta &&(
                    <Alert variant="success" onClose={()=>setMostrarAlerta(false)}dismissible>
                        Datos enviados  correctamente!!!!......
                    </Alert>
                 )}
               </Card.Header>
               <Card.Body>
                <Form onSubmit={enviarDatos}>
                    
                    <Form.Group className="mb-3" controlId="Roles">
                        <Form.Label>ROLES</Form.Label>
                        {['cliente','admin','afiliado','asesor'].map((key) => (
                            <Form.Check
                                key={key}
                                type="radio"
                                name="rol-unico"
                                id={`rol-${key}`}
                                label={key}
                                checked={formData.Rol === key}
                                onChange={() => onSelectRol(key)}
                            />
                        ))}
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="Documento">
                        <Form.Label>DOCUMENTO</Form.Label>
                        <Form.Control
                            type="text"
                            name="Documento"
                            value={formData.Documento}
                            onChange={handleChange}
                            placeholder="digite el documento del Usuario "
                        />
                    </Form.Group>

                     <Form.Group className="mb-3" controlId="PrimerNombre">
                        <Form.Label>PRIMER NOMBRE</Form.Label>
                        <Form.Control
                            type="text"
                            name="PrimerNombre"
                            value={formData.PrimerNombre}
                            onChange={handleChange}
                            placeholder="digite el nombre del Usuario "
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="SegundoNombre">
                        <Form.Label>SEGUNDO NOMBRE</Form.Label>
                        <Form.Control
                            type="text"
                            name="SegundoNombre"
                            value={formData.SegundoNombre}
                            onChange={handleChange}
                            placeholder="digite el nombre del Usuario "
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="PrimerApellido">
                        <Form.Label>APELLIDO</Form.Label>
                        <Form.Control
                            type="text"
                            name="PrimerApellido"
                            value={formData.PrimerApellido}
                            onChange={handleChange}
                            placeholder="digite el apellido del Usuario "
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="SegundoApellido">
                        <Form.Label>APELLIDO</Form.Label>
                        <Form.Control
                            type="text"
                            name="SegundoApellido"
                            value={formData.SegundoApellido}
                            onChange={handleChange}
                            placeholder="digite el apellido Usuario "
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Direccion">
                        <Form.Label>DIRECCION</Form.Label>
                        <Form.Control
                            type="text"
                            name="Direccion"
                            value={formData.Direccion}
                            onChange={handleChange}
                            placeholder="digite la direccion del  Usuario"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Telefono">
                        <Form.Label>TELEFONO</Form.Label>
                        <Form.Control
                            type="text"
                            name="Telefono"
                            value={formData.Telefono}
                            onChange={handleChange}
                            placeholder="digite el telefono del Usuario "
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Correo">
                        <Form.Label>CORREO</Form.Label>
                        <Form.Control
                            type="text"
                            name="Correo"
                            value={formData.Correo}
                            onChange={handleChange}
                            placeholder="digite el Correo del Usuario "
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

                    

                    <Button style={{background:"#7856AE" ,border:"#7856AE"}}  type="submit">Guardar</Button>
                    <Button style={{background:"#7856AE" ,border:"#7856AE"}} className="mx-5" type="button" onClick={() => info("Operación cancelada")}>Cancelar</Button>

                </Form>
                </Card.Body>
        </Card>
      </Container>
    )

}

export default AgregarUsuario;
