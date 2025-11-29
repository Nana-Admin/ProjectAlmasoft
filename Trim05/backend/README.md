# Backend — Guía de inicio

## Requisitos
- Docker y Docker Compose
- Node.js 18+

## Base de datos (MySQL)
1. Desde `backend/`, levanta la BD:
   - `docker compose up -d`
2. Verifica estado:
   - `docker compose ps`
   - `docker compose logs mysql`

Nota: El servicio `db-init` espera el `healthcheck` de MySQL y luego ejecuta `crear_base_de_datos.sql` automáticamente.

## Configuración de entorno
Crea o ajusta `.env` en `backend/`:
```
JWT_SECRET=tuSecretoSeguro
DATABASE_URL="mysql://root:@localhost:3307/BBDD_FUNERARIA_ALMASOFT"
```

## Instalación y ejecución
1. Instala dependencias:
   - `npm install`
2. Genera el cliente Prisma (opcional si ya existe):
   - `npx prisma generate`
3. Ejecuta en desarrollo:
   - `npm run dev`
4. Ejecuta en producción:
   - `npm start`

API disponible en `http://localhost:5001/`.

## Seed opcional
Puedes crear usuarios de prueba:
- `node scripts/seed-admin.js`

Variables opcionales:
```
SEED_ADMIN_EMAIL=admin@almosoft.com
SEED_ADMIN_PASSWORD=123456
SEED_CLIENT_EMAIL=cliente1@gmail.com
SEED_CLIENT_PASSWORD=123456789
```
