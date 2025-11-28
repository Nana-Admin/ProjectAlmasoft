const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth.middleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Controllers
const auth = require('../controllers/authController');
const cliente = require('../controllers/clienteController');
const contrato = require('../controllers/contratoController');
const plan = require('../controllers/planController');
const producto = require('../controllers/productoController');
const categoria = require('../controllers/categoriaController');
const pago = require('../controllers/pagoController');
const usuario = require('../controllers/usuarioController');

// Auth
router.post('/auth/login', auth.login);
router.get('/auth/me', protect, auth.me);
router.get('/usuarios', protect, auth.list);
// Permite bootstrap (crear primer usuario) si no hay usuarios; luego requiere admin
router.post('/auth/register', async (req, res) => {
  const count = await prisma.uSUARIO.count();
  if (count === 0) {
    return auth.register(req, res);
  }
  const rolId = typeof req.body.rol_id === 'number' ? req.body.rol_id : 2;
  if (rolId === 2) {
    return auth.register(req, res);
  }
  return protect(req, res, () => admin(req, res, () => auth.register(req, res)));
});

// Usuarios (solo admin)
router.get('/usuarios', protect, admin, usuario.getAll);
router.post('/usuarios', protect, admin, usuario.create);
router.put('/usuarios/:id/roles', protect, usuario.updateRoles);
// Roles (listado)
router.get('/roles', protect, async (req, res) => {
  try {
    let roles = await prisma.rOL.findMany();
    const requeridos = ['Administrador', 'Cliente', 'Afiliado', 'Asesor'];
    const existentesLower = new Set(roles.map(r => r.rol_nombre.toLowerCase()));
    const faltantes = requeridos.filter(n => !existentesLower.has(n.toLowerCase()));
    if (faltantes.length) {
      await prisma.rOL.createMany({ data: faltantes.map(n => ({ rol_nombre: n })) });
      roles = await prisma.rOL.findMany();
    }
    res.json(roles.map(r => ({ id: r.rol_id, nombre: r.rol_nombre })));
  } catch (e) {
    res.status(500).json({ message: 'Error listando roles' });
  }
});

// Clientes
router.get('/clientes', protect, cliente.getAll);
router.get('/clientes/:id', protect, cliente.getById);
router.post('/clientes', protect, cliente.create);
router.put('/clientes/:id', protect, cliente.update);

// Contratos
router.get('/contratos', protect, contrato.getAll);
router.get('/contratos/:id', protect, contrato.getById);
router.post('/contratos', protect, contrato.create);
router.put('/contratos/:id', protect, contrato.update);
router.post('/contratos/:id/afiliados', protect, contrato.addAfiliado);
router.delete('/contratos/:id/afiliados/:usuario_id', protect, contrato.removeAfiliado);
router.post('/contratos/:id/productos', protect, contrato.addProducto);
router.delete('/contratos/:id/productos/:producto_id', protect, contrato.removeProducto);

// Planes fúnebres
router.get('/planes', protect, plan.getAll);
router.get('/planes/:id', protect, plan.getById);

// Productos y categorías
router.get('/categorias', protect, categoria.getAll);
router.get('/productos', protect, producto.getAll);

// Pagos
router.post('/pagos', protect, pago.create);

module.exports = router;
