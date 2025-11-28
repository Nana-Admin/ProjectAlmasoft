const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const categorias = await prisma.cATEGORIA.findMany({
    include: { subcategorias: { include: { productos: true } } }
  });
  res.json(categorias);
};