import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../App"; // ← esta línea es clave

function IniciarSesion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth(); // ← traemos la función login del contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Por favor ingresa correo y contraseña");
    }

    setError("");
    setLoading(true);

    const resultado = await login(email, password); // ← ahora llama a tu API

    if (resultado.success) {
      if (email === 'cliente1@gmail.com' && password === '123456789') {
        navigate('/ecommerce');
      } else {
        navigate("/inicio");
      }
    } else {
      setError(resultado.message || "Credenciales incorrectas");
    }

    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #7A5AF8 0%, #C2185B 100%)" }}>
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <Card style={{ borderRadius: 18, boxShadow: "0 10px 28px rgba(0,0,0,0.35)" }}>
          <Card.Body>
            <h2 className="text-center mb-2" style={{ color: "#5B42C7" }}>Bienvenido</h2>
            <p className="text-center text-muted mb-4">Accede a tu cuenta</p>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Correo</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@almosoft.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="123456"
                />
              </Form.Group>

              <Button disabled={loading} className="w-100" type="submit" style={{ background: "#7A5AF8", border: "#7A5AF8" }}>
                {loading ? "Cargando..." : "Iniciar Sesión"}
              </Button>
              <Button className="w-100 mt-2" type="button" style={{ background: "#C2185B", border: "#C2185B" }} onClick={() => navigate('/ecommerce')}>
                Atrás
              </Button>
            </Form>
          </Card.Body>
        </Card>

        <div className="w-100 text-center mt-3" style={{ color: "#fff" }}>
          ¿No tienes cuenta? <a href="/registrarse" style={{ color: "#FFD7E0", fontWeight: 600 }}>Regístrate</a>
        </div>
      </div>
    </div>
  );
}
export default IniciarSesion;
