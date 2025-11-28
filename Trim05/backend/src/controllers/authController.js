const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const generateToken = require('../utils/generateToken');

exports.login = async (req, res) => {
  const { correo, email, usuario_correo, password, credencial, usuario_credencial } = req.body;

  const correoFinal = correo || email || usuario_correo;
  const passwordFinal = password || credencial || usuario_credencial;

  // 🆕 DEBUG LOGS
  console.log('📧 Campos recibidos:', req.body);
  console.log('🔍 Correo final:', correoFinal);
  console.log('🔑 Password final:', passwordFinal ? '***' : 'VACÍO');

  if (!correoFinal || !passwordFinal) {
    console.log('❌ Faltan datos');
    return res.status(400).json({ message: 'Faltan correo o contraseña' });
  }

  try {
    const usuario = await prisma.uSUARIO.findUnique({
      where: { usuario_correo: correoFinal }
    });

    console.log('👤 Usuario encontrado:', !!usuario);
    if (usuario) {
      console.log('✅ Usuario activo:', usuario.usuario_primer_nombre);
    }
    
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const passwordValida = await bcrypt.compare(passwordFinal, usuario.usuario_credencial);

    if (!passwordValida) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    let roles = [];
    try {
      const relaciones = await prisma.rOL_USUARIO.findMany({
        where: { usuario_id: usuario.usuario_id },
        include: { rol: true }
      });
      roles = relaciones.map(r => r.rol.rol_nombre);
    } catch (_) {
      roles = [];
    }

    res.json({
      success: true,
      id: usuario.usuario_id,
      nombre: `${usuario.usuario_primer_nombre} ${usuario.usuario_primer_apellido}`,
      correo: usuario.usuario_correo,
      roles,
      token: generateToken(usuario.usuario_id)
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Perfil del usuario autenticado
exports.me = async (req, res) => {
  try {
    const usuario = await prisma.uSUARIO.findUnique({
      where: { usuario_id: req.user.usuario_id }
    });

    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

    let roles = [];
    try {
      const relaciones = await prisma.rOL_USUARIO.findMany({
        where: { usuario_id: usuario.usuario_id },
        include: { rol: true }
      });
      roles = relaciones.map(r => r.rol.rol_nombre);
    } catch (_) {}

    res.json({
      id: usuario.usuario_id,
      nombre: `${usuario.usuario_primer_nombre} ${usuario.usuario_primer_apellido}`,
      correo: usuario.usuario_correo,
      roles
    });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// ================================
// REGISTER
// ================================
exports.register = async (req, res) => {
  const { primer_nombre, primer_apellido, documento, correo, credencial, password, rol_id = 2, rol_ids } = req.body;

  const pass = credencial || password;
  if (!pass) return res.status(400).json({ message: "Falta la contraseña" });

  try {
    const hashed = await bcrypt.hash(pass, 10);

    const nuevo = await prisma.uSUARIO.create({
      data: {
        usuario_primer_nombre: primer_nombre,
        usuario_segundo_nombre: "",
        usuario_primer_apellido: primer_apellido,
        usuario_segundo_apellido: "",
        usuario_documento: documento,
        usuario_correo: correo,
        usuario_direccion: "",
        usuario_credencial: hashed
      }
    });

    try {
      const ids = Array.isArray(rol_ids) && rol_ids.length ? rol_ids : (rol_id ? [rol_id] : []);
      if (ids.length) {
        await prisma.rOL_USUARIO.createMany({
          data: ids.map(idr => ({ rol_id: idr, usuario_id: nuevo.usuario_id, estado_cred: true }))
        });
      }
    } catch (_) {}

    res.status(201).json({ message: "Usuario creado", id: nuevo.usuario_id });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Listado de usuarios
exports.list = async (req, res) => {
  try {
    const usuarios = await prisma.uSUARIO.findMany({
      include: { roles: { include: { rol: true } }, telefonos: true }
    });

    const datos = usuarios.map(u => ({
      idUsuario: u.usuario_id,
      documento: String(u.usuario_documento),
      primerNombre: u.usuario_primer_nombre,
      segundoNombre: u.usuario_segundo_nombre,
      primerApellido: u.usuario_primer_apellido,
      segundoApellido: u.usuario_segundo_apellido,
      email: u.usuario_correo,
      direccion: u.usuario_direccion,
      telefono: u.telefonos?.[0]?.telefono ? String(u.telefonos[0].telefono) : "",
      rolUsuario: (u.roles || []).map(r => r.rol.rol_nombre).join(', ')
    }));

    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
