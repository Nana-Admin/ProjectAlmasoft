import React from "react";
import { useNavigate } from "react-router-dom";
import "./planes.css";

const Planes = () => {
  const navigate = useNavigate();

  const planes = [
    { id: 1, nombre: "Plan Básico", precio: "$50.000", beneficios: ["Atención básica", "Ceremonia sencilla", "Asesoría familiar"] },
    { id: 2, nombre: "Plan Familiar", precio: "$120.000", beneficios: ["Cobertura para 4 personas", "Ceremonia personalizada", "Atención psicológica"] },
    { id: 3, nombre: "Plan Premium", precio: "$250.000", beneficios: ["Cobertura total", "Ceremonia premium", "Asistencia legal y psicológica"] },
  ];

  const seleccionarPlan = (plan) => {
    alert(`✅ ${plan.nombre} seleccionado con éxito`);
    navigate("/compras"); // redirige a compras
  };

  return (
    <div className="planes-contenedor">
      <h2 className="planes-titulo">Planes de Fallecimiento</h2>
      <div className="planes-grid">
        {planes.map((plan) => (
          <div key={plan.id} className="plan-card">
            <h3>{plan.nombre}</h3>
            <p className="precio">{plan.precio}</p>
            <ul>
              {plan.beneficios.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
            <button className="btn-plan" onClick={() => seleccionarPlan(plan)}>
              Seleccionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planes;
