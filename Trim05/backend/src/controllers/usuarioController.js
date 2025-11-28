const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const usuarios = await prisma.uSUARIO.findMany({
    include: { roles: { include: { rol: true } }, telefonos: true }
  });
  res.json(usuarios);
};

exports.create = async (req, res) => {
  // Ya está en auth.register
  res.json({ message: 'Usa /auth/register' });
};

exports.updateRoles = async (req, res) => {
  const id = parseInt(req.params.id);
  const { rol_ids } = req.body;
  if (!Array.isArray(rol_ids)) return res.status(400).json({ message: 'rol_ids debe ser un arreglo' });
  try {
    await prisma.rOL_USUARIO.deleteMany({ where: { usuario_id: id } });
    if (rol_ids.length) {
      await prisma.rOL_USUARIO.createMany({ data: rol_ids.map(rid => ({ rol_id: rid, usuario_id: id, estado_cred: true })) });
    }
    const usuario = await prisma.uSUARIO.findUnique({
      where: { usuario_id: id },
      include: { roles: { include: { rol: true } } }
    });
    res.json({
      idUsuario: usuario.usuario_id,
      rolUsuario: (usuario.roles || []).map(r => r.rol.rol_nombre).join(', ')
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
