import React from "react"; 
import "./Bodega.css";
import { Table, Button } from "react-bootstrap";

const Bodega = () => {
  // Datos de ejemplo de la bodega
  const productos = [
    { id: 1, nombre: "Máquina de embalsamiento", cantidad: 2, estado: "Disponible" },
    { id: 2, nombre: "Instrumental", cantidad: 15, estado: "Disponible" },
    { id: 3, nombre: "EPP (Equipo de protección personal)", cantidad: 8, estado: "Bajo Stock" },
    { id: 4, nombre: "Equipo de higiene y limpieza", cantidad: 20, estado: "Disponible" },
    { id: 5, nombre: "Materiales de cierre y relleno", cantidad: 5, estado: "Bajo Stock" },
    { id: 6, nombre: "Ceras de modelado", cantidad: 0, estado: "Agotado" },
    { id: 7, nombre: "Maquillaje y cosméticos", cantidad: 12, estado: "Disponible" },
    { id: 8, nombre: "Urnas Clásicas", cantidad: 30, estado: "Disponible" },
    { id: 9, nombre: "Flores Blancas", cantidad: 5, estado: "Bajo Stock" },
    { id: 10, nombre: "Velas", cantidad: 0, estado: "Agotado" },
  ];

  return (
    <div className="bodega-container">
      <h2 className="mb-4">Gestión de Bodega</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.nombre}</td>
              <td>{prod.cantidad}</td>
              <td
                className={
                  prod.estado === "Agotado"
                    ? "estado-agotado"
                    : prod.estado === "Bajo Stock"
                    ? "estado-bajo"
                    : "estado-disponible"
                }
              >
                {prod.estado}
              </td>
              <td>
                <Button variant="primary" size="sm" className="me-2">
                  Editar
                </Button>
                <Button variant="danger" size="sm">
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Bodega;
