import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { Modal, Button, Form } from "react-bootstrap";
import OpcionesCronograma from "./OpcionesCronograma";
import FiltrosCronograma from "./FiltrosCronograma";
import ExportarImportar from "./ExportarImportar";

export default function Cronograma() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({
    clienteId: "",
    title: "",
    tipo: "Misa",
    date: "",
    habilitado: true,
  });

  const [clientes] = useState([
    { id: "1", nombre: "Juan Pérez" },
    { id: "2", nombre: "María Gómez" },
    { id: "3", nombre: "Carlos Ramírez" },
  ]);

  const eventColors = {
    Misa: "blue",
    Velación: "gray",
    Sepelio: "red",
    Exhumación: "green",
  };

  const [filtro, setFiltro] = useState("Todos");

  const getClienteNombre = (id) => {
    const cliente = clientes.find((c) => c.id === id);
    return cliente ? cliente.nombre : "Cliente desconocido";
  };

  const handleDateClick = (info) => {
    setSelectedEvent(null);
    setNewEvent({
      clienteId: "",
      title: "",
      tipo: "Misa",
      date: info.dateStr,
      habilitado: true,
    });
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    const event = events.find((e) => e.id === info.event.id);
    setSelectedEvent(event);
    setNewEvent({ ...event });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!newEvent.clienteId) {
      alert("Debes ingresar un ID de cliente válido.");
      return;
    }

    if (selectedEvent) {
      setEvents(
        events.map((e) =>
          e.id === selectedEvent.id
            ? { ...newEvent, color: eventColors[newEvent.tipo] }
            : e
        )
      );
    } else {
      setEvents([
        ...events,
        {
          id: String(events.length + 1),
          ...newEvent,
          color: eventColors[newEvent.tipo],
        },
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setEvents(events.filter((e) => e.id !== selectedEvent.id));
    setShowModal(false);
  };

  const handleToggleHabilitado = () => {
    const updatedEvents = events.map((e) =>
      e.id === selectedEvent.id ? { ...e, habilitado: !e.habilitado } : e
    );
    setEvents(updatedEvents);
    const actualizado = updatedEvents.find((e) => e.id === selectedEvent.id);
    setSelectedEvent(actualizado);
  };

  const limpiar = () => setEvents([]);

  const eventosFiltrados = events.filter((e) =>
    filtro === "Todos" ? true : e.tipo === filtro
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
        <h2>Cronograma de Eventos</h2>
        <FiltrosCronograma setFiltro={setFiltro} />
        <ExportarImportar events={events} setEvents={setEvents} />
        <OpcionesCronograma setFiltro={setFiltro} limpiar={limpiar} />
      </div>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={esLocale}
        events={eventosFiltrados.map((e) => ({
          ...e,
          title: `${getClienteNombre(e.clienteId)} - ${e.title}`,
          display: e.habilitado ? "auto" : "background",
          color: e.habilitado ? eventColors[e.tipo] : "#d3d3d3",
        }))}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        height="80vh"
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent ? "Editar Evento" : "Nuevo Evento"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>ID del Cliente</Form.Label>
            <Form.Control
              type="text"
              value={newEvent.clienteId}
              onChange={(e) => setNewEvent({ ...newEvent, clienteId: e.target.value })}
              placeholder="Ejemplo: 1, 2, 3..."
            />
            {newEvent.clienteId && (
              <Form.Text className="text-muted">
                Cliente seleccionado: {getClienteNombre(newEvent.clienteId)}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Tipo de Evento</Form.Label>
            <Form.Select
              value={newEvent.tipo}
              onChange={(e) => setNewEvent({ ...newEvent, tipo: e.target.value })}
            >
              <option>Misa</option>
              <option>Velación</option>
              <option>Sepelio</option>
              <option>Exhumación</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {selectedEvent && (
            <>
              <Button
                variant={selectedEvent.habilitado ? "warning" : "success"}
                onClick={handleToggleHabilitado}
              >
                {selectedEvent.habilitado ? "Deshabilitar" : "Habilitar"}
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </>
          )}
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {selectedEvent ? "Guardar Cambios" : "Agregar"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  








