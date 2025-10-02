import React, { useState } from "react";
import "./Compras.css";

const Compras = () => {
  const [compras, setCompras] = useState([
    {
      id: 1,
      fecha: "29.06.2022",
      nombre: "Juan Pérez",
      formaPago: "Efectivo",
      estado: "Pendiente",
    },
  ]);

  const [nuevaCompra, setNuevaCompra] = useState({
    fecha: "",
    nombre: "",
    formaPago: "",
    estado: "Pendiente",
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevaCompra({ ...nuevaCompra, [name]: value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    const nueva = {
      ...nuevaCompra,
      id: compras.length + 1,
    };
    setCompras([...compras, nueva]);
    setNuevaCompra({
      fecha: "",
      nombre: "",
      formaPago: "",
      estado: "Pendiente",
    });
  };

  return (
    <div className="compras">
      <div className="compras-encabezado">
        <h2>Gestión de Compras</h2>
        <div className="acciones">
          <button className="btn">PDF ⬇</button>
        </div>
      </div>

      {/* Formulario */}
      <form className="form-compras" onSubmit={manejarEnvio}>
        <input
          type="date"
          name="fecha"
          value={nuevaCompra.fecha}
          onChange={manejarCambio}
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre y Apellido"
          value={nuevaCompra.nombre}
          onChange={manejarCambio}
          required
        />
        <select
          name="formaPago"
          value={nuevaCompra.formaPago}
          onChange={manejarCambio}
          required
        >
          <option value="">Seleccione forma de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Transferencia">Transferencia</option>
        </select>
        <select
          name="estado"
          value={nuevaCompra.estado}
          onChange={manejarCambio}
          required
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Completado">Completado</option>
        </select>
        <button type="submit" className="btn">
          Agregar Registro
        </button>
      </form>

      {/* Tabla */}
      <table className="tabla-compras">
        <thead>
          <tr>
            <th>Registro</th>
            <th>Fecha</th>
            <th>Nombre y Apellido</th>
            <th>Forma de Pago</th>
            <th>Estado</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.fecha}</td>
              <td>{c.nombre}</td>
              <td>{c.formaPago}</td>
              <td className={c.estado === "Pendiente" ? "rojo" : "verde"}>
                {c.estado}
              </td>
              <td>
                <span className="opcion azul" onClick={() => alert(`Editar ${c.id}`)}>
                  Editar
                </span>{" "}
                <span className="opcion amarillo" onClick={() => alert(`Deshabilitar ${c.id}`)}>
                  Deshabilitar
                </span>{" "}
                <span className="opcion verde" onClick={() => alert(`Consultar ${c.id}`)}>
                  Consultar
                </span>{" "}
                <span className="opcion rojo" onClick={() => alert(`Eliminar ${c.id}`)}>
                  Eliminar
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Compras;
