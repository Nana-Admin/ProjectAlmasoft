const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  const contratos = await prisma.cONTRATO.findMany({
    include: { cliente: { include: { usuario: true } }, plan: { include: { plan: true } }, pagos: true }
  });
  res.json(contratos);
};

exports.getById = async (req, res) => {
  const contrato = await prisma.cONTRATO.findUnique({
    where: { contrato_id: parseInt(req.params.id) },
    include: {
      cliente: { include: { usuario: true } },
      plan: { include: { plan: { include: { servicios: { include: { servicio: true } } } } } },
      pagos: true,
      productos: { include: { producto: true } },
      afiliados: { include: { usuario: true } }
    }
  });
  if (!contrato) return res.status(404).json({ message: 'Contrato no encontrado' });
  res.json(contrato);
};

exports.create = async (req, res) => {
  const { cliente_id, plan_id, valor, productos = [] } = req.body;
  try {
    const contrato = await prisma.cONTRATO.create({
      data: {
        contrato_estado: true,
        contrato_valor: valor,
        cliente_id,
        plan: plan_id ? { create: [{ plan_id }] } : undefined,
        productos: productos.length ? { create: productos.map(p => ({ producto_id: p })) } : undefined
      },
      include: { cliente: true, plan: true }
    });
    res.status(201).json(contrato);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { estado, valor, plan_id, productos } = req.body;
  try {
    const existe = await prisma.cONTRATO.findUnique({ where: { contrato_id: id } });
    if (!existe) return res.status(404).json({ message: 'Contrato no encontrado' });

    const data = {};
    if (typeof estado === 'boolean') data.contrato_estado = estado;
    if (typeof valor === 'number') data.contrato_valor = valor;

    await prisma.cONTRATO.update({ where: { contrato_id: id }, data });

    if (plan_id) {
      await prisma.cONTRATO_PLAN.deleteMany({ where: { contrato_id: id } });
      await prisma.cONTRATO_PLAN.create({ data: { contrato_id: id, plan_id } });
    }

    if (Array.isArray(productos)) {
      await prisma.cONTRATO_PRODUCTO.deleteMany({ where: { contrato_id: id } });
      if (productos.length) {
        await prisma.cONTRATO_PRODUCTO.createMany({ data: productos.map(p => ({ contrato_id: id, producto_id: p })) });
      }
    }

    const result = await prisma.cONTRATO.findUnique({
      where: { contrato_id: id },
      include: {
        cliente: { include: { usuario: true } },
        plan: { include: { plan: true } },
        productos: { include: { producto: true } },
        afiliados: { include: { usuario: true } }
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addAfiliado = async (req, res) => {
  const id = parseInt(req.params.id);
  const { usuario_id, usuario } = req.body;
  try {
    let uid = usuario_id;
    if (!uid && usuario) {
      const nuevo = await prisma.uSUARIO.create({
        data: {
          usuario_documento: usuario.documento ?? 0,
          usuario_primer_nombre: usuario.primer_nombre ?? '',
          usuario_segundo_nombre: usuario.segundo_nombre ?? '',
          usuario_primer_apellido: usuario.primer_apellido ?? '',
          usuario_segundo_apellido: usuario.segundo_apellido ?? '',
          usuario_correo: usuario.correo ?? '',
          usuario_direccion: usuario.direccion ?? '',
          usuario_credencial: ''
        }
      });
      uid = nuevo.usuario_id;
    }
    if (!uid) return res.status(400).json({ message: 'Falta usuario_id o usuario' });

    const af = await prisma.aFILIADO.create({ data: { afiliado_id: uid, contrato_id: id } });
    res.status(201).json(af);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeAfiliado = async (req, res) => {
  const id = parseInt(req.params.id);
  const uid = parseInt(req.params.usuario_id);
  try {
    await prisma.aFILIADO.delete({ where: { afiliado_id_contrato_id: { afiliado_id: uid, contrato_id: id } } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  const { producto_id } = req.body;
  try {
    const cp = await prisma.cONTRATO_PRODUCTO.create({ data: { contrato_id: id, producto_id } });
    res.status(201).json(cp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProducto = async (req, res) => {
  const id = parseInt(req.params.id);
  const pid = parseInt(req.params.producto_id);
  try {
    await prisma.cONTRATO_PRODUCTO.delete({ where: { contrato_id_producto_id: { contrato_id: id, producto_id: pid } } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
