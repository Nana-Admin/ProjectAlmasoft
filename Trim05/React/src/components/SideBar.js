import React from "react";
import { Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaUsers,
  FaTags,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaWarehouse,
  FaFolderOpen,
  FaCalendarAlt,

} from "react-icons/fa";

const SideBar = () => {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#211730",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        //Bordes de sidebar
        borderRight: "5px solid #4a3a5a",
        borderLeft: "5px solid #4a3a5a",
        borderTop: "5px solid #4a3a5a",
        borderBottom: "5px solid #4a3a5a",
        boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
      }}
    >
      {/* Logo */}
      <img
        src={require("../img/almasoft.jpg")}
        alt="Almasoft"
        style={{
          width: "120px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
        onError={(e) => {
          e.target.src = require("../img/logoAS.png"); // Imagen de respaldo
          e.target.alt = "Logo Almasoft";
        }}
      />

      <Nav className="flex-column w-100 px-2">
        <Button as={Link} to="/inicio" className="m-1" variant="light">
          <FaHome /> Inicio
        </Button>

        <Button as={Link} to="/clientes/Cliente" className="m-1" variant="light">
          <FaUser /> Clientes
        </Button>

        <Button as={Link} to="/usuarios/Usuario" className="m-1" variant="light">
          <FaUsers /> Usuarios
        </Button>

        <Button as={Link} to="/categorias" className="m-1" variant="light">
          <FaTags /> Categorías
        </Button>

        <Button as={Link} to="/productos-ataud" className="m-1" variant="light">
          <FaBox /> Productos
        </Button>

        <Button as={Link} to="/compras" className="m-1" variant="light">
          <FaShoppingCart /> Compras
        </Button>

        <Button as={Link} to="/planes" className="m-1" variant="light">
          <FaClipboardList /> Planes
        </Button>

        <Button as={Link} to="/bodega" className="m-1" variant="light">
          <FaWarehouse /> Bodega
        </Button>

        <Button as={Link} to="/tramites" className="m-1" variant="light">
          <FaFolderOpen /> Trámites
        </Button>

        <Button as={Link} to="/cronograma" className="m-1" variant="light">
          <FaCalendarAlt /> Cronograma
        </Button>

        <hr style={{ borderColor: "rgba(255,255,255,0.2)", width: "90%" }} />

        <Button as={Link} to="/inicio" className="m-1" variant="warning">
          <FaUser /> Admin
        </Button>
      </Nav>
    </div>
  );
};

export default SideBar;
