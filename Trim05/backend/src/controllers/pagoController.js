const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.create = async (req, res) => {
  const { contrato_id, metodo, fecha = new Date() } = req.body;
  const pago = await prisma.pAGO.create({
    data: {
      pago_metodo: metodo,
      pago_fecha: new Date(fecha),
      contrato_id
    }
  });
  res.status(201).json(pago);
};