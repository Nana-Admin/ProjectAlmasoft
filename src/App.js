import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
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

function App() {
  return (
  <>
   <Router>
    
    <SideBar />
    
    <div style={{ marginLeft: "200px", background:"#D8CFE8",  height: "150vh" }}>
      <BarraCliente/>
      
        <Routes>
          {/* Rutas de cliente */}
          <Route path='/clientes/Cliente' element={<Cliente/>} />
          <Route path='/clientes/AgregarCliente' element={<AgregarCliente/>} />
          <Route path='/clientes/editar/:id' element={<EditarCliente/>} />
          <Route path='/clientes/detalles/:id' element={<DetallesCliente/>} />

          {/* Rutas de usuario */}
          <Route path='/usuarios/Usuario' element={<Usuario/>} />
          <Route path='/usuarios/AgregarUsuario' element={<AgregarUsuario/>} />
          <Route path='/usuarios/EditarUsuario/:id' element={<EditarUsuario/>} />
          <Route path='/usuarios/detalles/:id' element={<DetallesUsuario/>} />

          {/* Rutas de páginas generales */}
          <Route path='/' element={<Inicio/>} />
            <Route path='/inicio' element={<Inicio/>} />
            <Route path='/planes' element={<Planes/>} />
            <Route path='/compras' element={<Compras/>} />
            <Route path='/categorias' element={<Categorias/>} />
            <Route path='/bodega' element={<Bodega/>} />
            <Route path='/iniciar-sesion' element={<IniciarSesion/>} />
            <Route path='/registrarse' element={<Registrarse/>} />
            <Route path='/productos-ataud' element={<ProductosAtaud/>} />
            <Route path='/acerca-de-nosotros' element={<AcercaDeNosotros/>} />
            <Route path='/tramites' element={<Tramites/>} />
            <Route path='/cronograma' element={<Cronograma/>} />

        </Routes>
      </div>
   </Router>
   </>
  );
}

export default App;
