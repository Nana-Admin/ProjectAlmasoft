const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const usuario = await prisma.uSUARIO.findUnique({
        where: { usuario_id: decoded.id }
      });

      if (!usuario) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      // Cargar roles de forma defensiva
      let roles = [];
      try {
        const relaciones = await prisma.rOL_USUARIO.findMany({
          where: { usuario_id: decoded.id },
          include: { rol: true }
        });
        roles = relaciones;
      } catch (_) {
        roles = [];
      }

      req.user = { ...usuario, roles };
      next();

    } catch (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  } else {
    return res.status(401).json({ message: "No autorizado: falta token" });
  }
};

const admin = (req, res, next) => {
  const esAdmin = Array.isArray(req.user?.roles) && req.user.roles.some(
    (r) => r.rol?.rol_nombre?.toLowerCase() === "admin"
  );

  if (!esAdmin) {
    return res.status(403).json({ message: "Acceso denegado: solo admin" });
  }

  next();
};

module.exports = { protect, admin };
