const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAll = async (req, res) => {
  try {
    const clientes = await prisma.cLIENTE.findMany({
      include: { usuario: true, contratos: true }
    });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const cliente = await prisma.cLIENTE.findUnique({
      where: { cliente_id: parseInt(req.params.id) },
      include: {
        usuario: true,
        contratos: { include: { plan: { include: { plan: true } }, pagos: true, afiliados: { include: { usuario: true } } } }
      }
    });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  const { documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, direccion, fecha_nacimiento, edad, telefonos } = req.body;
  try {
    const cliente = await prisma.cLIENTE.create({
      data: {
        cliente_fecha_nacimiento: new Date(fecha_nacimiento),
        cliente_edad: edad,
        usuario: {
          create: {
            usuario_documento: documento,
            usuario_primer_nombre: primer_nombre,
            usuario_segundo_nombre: segundo_nombre || "",
            usuario_primer_apellido: primer_apellido,
            usuario_segundo_apellido: segundo_apellido || "",
            usuario_correo: correo,
            usuario_direccion: direccion || "",
            usuario_credencial: "", // se crea sin contraseña si es cliente externo
            telefonos: { create: telefonos?.map(t => ({ telefono: BigInt(t) })) || [] }
          }
        }
      },
      include: { usuario: true }
    });
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { documento, primer_nombre, segundo_nombre, primer_apellido, segundo_apellido, correo, direccion, fecha_nacimiento, edad, telefonos } = req.body;
  try {
    const actualizado = await prisma.cLIENTE.update({
      where: { cliente_id: id },
      data: {
        cliente_fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : undefined,
        cliente_edad: typeof edad === 'number' ? edad : undefined,
        usuario: {
          update: {
            usuario_documento: documento ?? undefined,
            usuario_primer_nombre: primer_nombre ?? undefined,
            usuario_segundo_nombre: (segundo_nombre ?? ""),
            usuario_primer_apellido: primer_apellido ?? undefined,
            usuario_segundo_apellido: (segundo_apellido ?? ""),
            usuario_correo: correo ?? undefined,
            usuario_direccion: direccion ?? undefined,
            telefonos: telefonos ? {
              deleteMany: { usuario_id: id },
              create: telefonos.map(t => ({ telefono: BigInt(t) }))
            } : undefined
          }
        }
      },
      include: { usuario: true }
    });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
