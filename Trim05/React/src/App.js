import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import IniciarSesion from './components/pages/IniciarSesion';
import PaginaInicio from './components/pages/PaginaInicio';
import Inicio from './components/Inicio/inicio.jsx';
import Planes from './components/planes/planes';
import Compras from './components/compras/compras';
import Categorias from './components/categorias/categorias';
import Bodega from './components/bodega/bodega';
import Tramites from './components/tramites/tramites';
import Cronograma from './components/cronograma/cronograma';
import Registrarse from './components/pages/Registrarse';
import ProductosAtaud from './components/pages/ProductosAtaud';
import AcercaDeNosotros from './components/pages/AcercaDeNosotros';
import SideBar from './components/SideBar';
import BarraCliente from './components/clientes/BarraCliente';
import Cliente from './components/clientes/Cliente';
import AgregarCliente from './components/clientes/AgregarCliente';
import EditarCliente from './components/clientes/EditarCliente';
import DetallesCliente from './components/clientes/DetallesCliente';
import Usuario from './components/usuarios/Usuario';
import EditarUsuario from './components/usuarios/EditarUsuario';
import DetallesUsuario from './components/usuarios/DetallesUsuario';
import AgregarUsuario from './components/usuarios/AgregarUsuario';
import Ecommerce from './components/ecommerce/ecommerce';
import Carrito from './components/ecommerce/Carrito';

// === NUEVO CONTEXTO PARA TU BACKEND ===
export const AuthContext = createContext();
export const ToastContext = createContext();

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe estar dentro de AuthProvider');
  return context;
};

const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast debe estar dentro de ToastProvider');
  return context;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const AuthenticatedLayout = ({ children }) => (
  <>
    <SideBar />
    <div style={{ marginLeft: "220px", background: "#D8CFE8", minHeight: "100vh" }}>
      <BarraCliente />
      {children}
    </div>
  </>
);

// === PROVEEDOR DE AUTENTICACIÓN CON TU API ===
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Opcional: validar token con tu backend
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const login = async (correo, credencial) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, credencial })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data);
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = (message, variant = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const value = {
    show,
    success: (m) => show(m, 'success'),
    error: (m) => show(m, 'danger'),
    info: (m) => show(m, 'info'),
    warning: (m) => show(m, 'warning'),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer position="bottom-end" className="p-3">
        {toasts.map((t) => (
          <Toast key={t.id} bg={t.variant} autohide delay={3000} onClose={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>
            <Toast.Body className="text-white">{t.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router>
          <Routes>
          {/* Públicas */}
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />

          {/* Protegidas */}
          <Route path="/inicio" element={<ProtectedRoute><AuthenticatedLayout><Inicio /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/planes" element={<ProtectedRoute><AuthenticatedLayout><Planes /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/compras" element={<ProtectedRoute><AuthenticatedLayout><Compras /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/categorias" element={<ProtectedRoute><AuthenticatedLayout><Categorias /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/bodega" element={<ProtectedRoute><AuthenticatedLayout><Bodega /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/productos-ataud" element={<ProtectedRoute><AuthenticatedLayout><ProductosAtaud /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/tramites" element={<ProtectedRoute><AuthenticatedLayout><Tramites /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/cronograma" element={<ProtectedRoute><AuthenticatedLayout><Cronograma /></AuthenticatedLayout></ProtectedRoute>} />

          {/* Clientes */}
          <Route path="/clientes/Cliente" element={<ProtectedRoute><AuthenticatedLayout><Cliente /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/clientes/AgregarCliente" element={<ProtectedRoute><AuthenticatedLayout><AgregarCliente /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/clientes/editar/:id" element={<ProtectedRoute><AuthenticatedLayout><EditarCliente /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/clientes/detalles/:id" element={<ProtectedRoute><AuthenticatedLayout><DetallesCliente /></AuthenticatedLayout></ProtectedRoute>} />

          {/* Usuarios */}
          <Route path="/usuarios/Usuario" element={<ProtectedRoute><AuthenticatedLayout><Usuario /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/usuarios/AgregarUsuario" element={<ProtectedRoute><AuthenticatedLayout><AgregarUsuario /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/usuarios/EditarUsuario/:id" element={<ProtectedRoute><AuthenticatedLayout><EditarUsuario /></AuthenticatedLayout></ProtectedRoute>} />
          <Route path="/usuarios/detalles/:id" element={<ProtectedRoute><AuthenticatedLayout><DetallesUsuario /></AuthenticatedLayout></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
}
export { useAuth, useToast };

export default App;
