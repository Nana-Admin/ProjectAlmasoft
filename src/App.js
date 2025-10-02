import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import IniciarSesion from './components/pages/IniciarSesion';
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
import { client } from './supabase/cliente';

// Crear contexto de autenticación
export const AuthContext = createContext();

// Componente para rutas protegidas
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirigir a login si no hay usuario autenticado
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Hook personalizado para usar el contexto de autenticación
const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Layout para páginas autenticadas
const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <SideBar />
      <div style={{ marginLeft: "200px", background:"#D8CFE8", height: "150vh" }}>
        <BarraCliente/>
        {children}
      </div>
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión activa
    const { data: { subscription } } = client.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    // Limpiar suscripción al desmontar
    return () => subscription.unsubscribe();
  }, []);

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<IniciarSesion />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/acerca-de-nosotros" element={<AcercaDeNosotros />} />
          
          {/* Rutas protegidas */}
          <Route path="/" element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Inicio />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Rutas de cliente */}
          <Route path='/clientes/Cliente' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Cliente />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/clientes/AgregarCliente' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AgregarCliente />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/clientes/editar/:id' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <EditarCliente />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/clientes/detalles/:id' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <DetallesCliente />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          {/* Rutas de usuario */}
          <Route path='/usuarios/Usuario' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Usuario />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/usuarios/AgregarUsuario' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <AgregarUsuario />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/usuarios/EditarUsuario/:id' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <EditarUsuario />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/usuarios/detalles/:id' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <DetallesUsuario />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />

          {/* Otras rutas protegidas */}
          <Route path='/inicio' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Inicio />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/planes' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Planes />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/compras' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Compras />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/categorias' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Categorias />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/bodega' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Bodega />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/productos-ataud' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ProductosAtaud />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/tramites' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Tramites />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          <Route path='/cronograma' element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Cronograma />
              </AuthenticatedLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirigir a login por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
