import React, { useState } from "react";
import { Table, Button, Modal, Form, ProgressBar } from "react-bootstrap";

export default function Tramites() {
  const [tramites, setTramites] = useState([]);
  const [nuevo, setNuevo] = useState({
    id: "",
    documento: "",
    tipoDoc: "",
    remitente: "",
    areaOrigen: "",
    estado: "Pendiente",
    habilitado: true,
  });

  const [showForm, setShowForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSeguimiento, setShowSeguimiento] = useState(false);
  const [editTramite, setEditTramite] = useState(null);

  const handleChange = (e) => {
    setNuevo({ ...nuevo, [e.target.name]: e.target.value });
  };

  const agregarTramite = () => {
    if (!nuevo.documento || !nuevo.tipoDoc || !nuevo.remitente || !nuevo.areaOrigen) {
      alert("Faltan datos");
      return;
    }
    const numSeguimiento = Math.floor(Math.random() * 1000000);
    const nuevoTramite = { ...nuevo, id: numSeguimiento.toString() };
    setTramites([...tramites, nuevoTramite]);
    setNuevo({
      id: "",
      documento: "",
      tipoDoc: "",
      remitente: "",
      areaOrigen: "",
      estado: "Pendiente",
      habilitado: true,
    });
    setShowForm(false);
  };

  const eliminarTramite = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este trámite?")) {
      setTramites(tramites.filter((t) => t.id !== id));
    }
  };

  const abrirMasDatos = (tramite) => {
    setEditTramite(tramite);
    setShowModal(true);
  };

  const guardarCambios = () => {
    setTramites(
      tramites.map((t) =>
        t.id === editTramite.id ? editTramite : t
      )
    );
    setShowModal(false);
  };

  const abrirSeguimiento = (tramite) => {
    setEditTramite(tramite);
    setShowSeguimiento(true);
  };

  // Función para calcular progreso
  const getProgreso = (estado) => {
    switch (estado) {
      case "Pendiente":
        return 0;
      case "En Proceso":
        return 50;
      case "Terminado":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Trámites</h2>

      <Button className="mb-3" onClick={() => setShowForm(true)}>
        Agregar Trámite
      </Button>

      <Table striped bordered>
        <thead>
          <tr>
            <th>ID Seguimiento</th>
            <th>Documento</th>
            <th>Tipo Doc</th>
            <th>Remitente</th>
            <th>Área Origen</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tramites.map((t) => (
            <tr
              key={t.id}
              style={{
                backgroundColor: !t.habilitado ? "#e0e0e0" : "transparent",
              }}
            >
              <td>{t.id}</td>
              <td>{t.documento}</td>
              <td>{t.tipoDoc}</td>
              <td>{t.remitente}</td>
              <td>{t.areaOrigen}</td>
              <td>{t.estado}</td>
              <td>
                {t.habilitado ? (
                  <>
                    <Button
                      size="sm"
                      variant="info"
                      onClick={() => abrirMasDatos(t)}
                      className="me-2"
                    >
                      Más Datos
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => abrirSeguimiento(t)}
                      className="me-2"
                    >
                      Seguimiento
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => eliminarTramite(t.id)}
                    >
                      Eliminar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() =>
                        setTramites(
                          tramites.map((x) =>
                            x.id === t.id ? { ...x, habilitado: true } : x
                          )
                        )
                      }
                      className="me-2"
                    >
                      Habilitar
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => eliminarTramite(t.id)}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para agregar trámite */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Trámite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-2"
              placeholder="Número de Documento"
              name="documento"
              value={nuevo.documento}
              onChange={handleChange}
            />
            <Form.Select
              className="mb-2"
              name="tipoDoc"
              value={nuevo.tipoDoc}
              onChange={handleChange}
            >
              <option value="">Tipo de Documento</option>
              <option value="CC">Cédula</option>
              <option value="TI">Tarjeta Identidad</option>
              <option value="CE">Cédula Extranjera</option>
            </Form.Select>
            <Form.Control
              className="mb-2"
              placeholder="Remitente"
              name="remitente"
              value={nuevo.remitente}
              onChange={handleChange}
            />
            <Form.Control
              className="mb-2"
              placeholder="Área de Origen"
              name="areaOrigen"
              value={nuevo.areaOrigen}
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowForm(false)}>
            Cancelar
          </Button>
          <Button onClick={agregarTramite}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Más Datos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Más Datos del Trámite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTramite && (
            <>
              <Form.Control
                className="mb-2"
                value={editTramite.remitente}
                onChange={(e) =>
                  setEditTramite({ ...editTramite, remitente: e.target.value })
                }
              />
              <Form.Select
                className="mb-2"
                value={editTramite.estado}
                onChange={(e) =>
                  setEditTramite({ ...editTramite, estado: e.target.value })
                }
              >
                <option>Pendiente</option>
                <option>En Proceso</option>
                <option>Terminado</option>
              </Form.Select>
              <Button
                variant={editTramite.habilitado ? "warning" : "success"}
                onClick={() =>
                  setEditTramite({
                    ...editTramite,
                    habilitado: !editTramite.habilitado,
                  })
                }
              >
                {editTramite.habilitado ? "Deshabilitar" : "Habilitar"}
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={guardarCambios}>Guardar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Seguimiento */}
      <Modal show={showSeguimiento} onHide={() => setShowSeguimiento(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Seguimiento del Trámite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTramite && (
            <>
              <p><b>ID:</b> {editTramite.id}</p>
              <p><b>Estado:</b> {editTramite.estado}</p>
              <ProgressBar
                now={getProgreso(editTramite.estado)}
                label={`${getProgreso(editTramite.estado)}%`}
              />
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}





