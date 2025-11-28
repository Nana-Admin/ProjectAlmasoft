const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const planes = await prisma.pLAN_FUNEBRE.findMany({
    where: { plan_estado: true },
    include: { servicios: { include: { servicio: true } } }
  });
  res.json(planes);
};

exports.getById = async (req, res) => {
  const plan = await prisma.pLAN_FUNEBRE.findUnique({
    where: { plan_id: parseInt(req.params.id) },
    include: { servicios: { include: { servicio: true } } }
  });
  if (!plan) return res.status(404).json({ message: 'Plan no encontrado' });
  res.json(plan);
};