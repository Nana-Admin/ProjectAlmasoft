const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const productos = await prisma.pRODUCTO.findMany({
    where: { producto_estado: true },
    include: { subcategoria: { include: { categoria: true } } }
  });
  res.json(productos);
};