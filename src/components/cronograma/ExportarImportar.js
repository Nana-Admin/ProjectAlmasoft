import React from "react";
import { Button } from "react-bootstrap";

export default function ExportarImportar({ events, setEvents }) {
  const exportar = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events));
    const link = document.createElement("a");
    link.href = dataStr;
    link.download = "eventos.json";
    link.click();
  };

  const importar = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        setEvents(data);
      } catch (err) {
        alert("Archivo no válido");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="d-flex gap-2">
      <Button variant="success" onClick={exportar}>
        Exportar
      </Button>
      <Button variant="info" as="label">
        Importar
        <input
          type="file"
          accept=".json"
          style={{ display: "none" }}
          onChange={importar}
        />
      </Button>
    </div>
  );
}
