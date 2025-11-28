const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const correo = process.env.SEED_ADMIN_EMAIL || 'admin@almosoft.com';
  const password = process.env.SEED_ADMIN_PASSWORD || '123456';

  const hashed = await bcrypt.hash(password, 10);

  const usuario = await prisma.uSUARIO.upsert({
    where: { usuario_correo: correo },
    update: { usuario_credencial: hashed },
    create: {
      usuario_primer_nombre: 'Admin',
      usuario_segundo_nombre: '',
      usuario_primer_apellido: 'System',
      usuario_segundo_apellido: '',
      usuario_documento: 12345678,
      usuario_correo: correo,
      usuario_direccion: '',
      usuario_credencial: hashed
    }
  });

  console.log('Usuario seed creado/actualizado:', usuario.usuario_correo);

  const correoCliente = process.env.SEED_CLIENT_EMAIL || 'cliente1@gmail.com';
  const passwordCliente = process.env.SEED_CLIENT_PASSWORD || '123456789';
  const hashedCliente = await bcrypt.hash(passwordCliente, 10);
  const cliente = await prisma.uSUARIO.upsert({
    where: { usuario_correo: correoCliente },
    update: { usuario_credencial: hashedCliente },
    create: {
      usuario_primer_nombre: 'Cliente',
      usuario_segundo_nombre: 'Uno',
      usuario_primer_apellido: 'AlmaSoft',
      usuario_segundo_apellido: '',
      usuario_documento: 987654321,
      usuario_correo: correoCliente,
      usuario_direccion: '',
      usuario_credencial: hashedCliente
    }
  });
  console.log('Usuario cliente seed creado/actualizado:', cliente.usuario_correo);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
