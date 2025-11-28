-- CreateTable
CREATE TABLE `ROL` (
    `rol_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol_nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`rol_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `USUARIO` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_primer_nombre` VARCHAR(45) NOT NULL,
    `usuario_segundo_nombre` VARCHAR(45) NOT NULL,
    `usuario_primer_apellido` VARCHAR(45) NOT NULL,
    `usuario_segundo_apellido` VARCHAR(45) NOT NULL,
    `usuario_documento` INTEGER NOT NULL,
    `usuario_correo` VARCHAR(45) NOT NULL,
    `usuario_direccion` VARCHAR(45) NOT NULL,
    `usuario_credencial` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `USUARIO_usuario_correo_key`(`usuario_correo`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ROL_USUARIO` (
    `cred_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rol_id` INTEGER NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `estado_cred` BOOLEAN NOT NULL,

    PRIMARY KEY (`cred_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TELEFONO` (
    `telefono` BIGINT NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`telefono`, `usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CLIENTE` (
    `cliente_id` INTEGER NOT NULL,
    `cliente_fecha_nacimiento` DATE NOT NULL,
    `cliente_edad` INTEGER NOT NULL,

    PRIMARY KEY (`cliente_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CONTRATO` (
    `contrato_id` INTEGER NOT NULL AUTO_INCREMENT,
    `contrato_estado` BOOLEAN NOT NULL,
    `contrato_valor` DOUBLE NOT NULL,
    `cliente_id` INTEGER NOT NULL,

    PRIMARY KEY (`contrato_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AFILIADO` (
    `afiliado_id` INTEGER NOT NULL,
    `contrato_id` INTEGER NOT NULL,

    PRIMARY KEY (`afiliado_id`, `contrato_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CATEGORIA` (
    `categoria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_nombre` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`categoria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SUBCATEGORIA` (
    `subcategoria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subcategoria_nombre` VARCHAR(45) NOT NULL,
    `categoria_id` INTEGER NOT NULL,

    PRIMARY KEY (`subcategoria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PRODUCTO` (
    `producto_id` INTEGER NOT NULL AUTO_INCREMENT,
    `producto_nombre` VARCHAR(45) NOT NULL,
    `producto_descripcion` VARCHAR(50) NOT NULL,
    `producto_precio` DOUBLE NOT NULL,
    `producto_stock` INTEGER NOT NULL,
    `producto_estado` BOOLEAN NOT NULL,
    `subcategoria_id` INTEGER NOT NULL,

    PRIMARY KEY (`producto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CONTRATO_PRODUCTO` (
    `contrato_id` INTEGER NOT NULL,
    `producto_id` INTEGER NOT NULL,

    PRIMARY KEY (`contrato_id`, `producto_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SERVICIO` (
    `servicio_id` INTEGER NOT NULL AUTO_INCREMENT,
    `servicio_nombre` VARCHAR(45) NULL,
    `servicio_descripcion` VARCHAR(45) NULL,
    `servicio_precio` DOUBLE NOT NULL,

    PRIMARY KEY (`servicio_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PLAN_FUNEBRE` (
    `plan_id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_nombre` VARCHAR(45) NOT NULL,
    `plan_precio` DOUBLE NOT NULL,
    `plan_estado` BOOLEAN NOT NULL,

    PRIMARY KEY (`plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SERVICIO_PLAN` (
    `servicio_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,

    PRIMARY KEY (`servicio_id`, `plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CONTRATO_PLAN` (
    `contrato_id` INTEGER NOT NULL,
    `plan_id` INTEGER NOT NULL,

    UNIQUE INDEX `CONTRATO_PLAN_contrato_id_key`(`contrato_id`),
    PRIMARY KEY (`contrato_id`, `plan_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PAGO` (
    `pago_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pago_metodo` VARCHAR(45) NOT NULL,
    `pago_fecha` DATE NOT NULL,
    `contrato_id` INTEGER NOT NULL,

    PRIMARY KEY (`pago_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ROL_USUARIO` ADD CONSTRAINT `ROL_USUARIO_rol_id_fkey` FOREIGN KEY (`rol_id`) REFERENCES `ROL`(`rol_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ROL_USUARIO` ADD CONSTRAINT `ROL_USUARIO_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `USUARIO`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TELEFONO` ADD CONSTRAINT `TELEFONO_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `USUARIO`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CLIENTE` ADD CONSTRAINT `CLIENTE_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `USUARIO`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CONTRATO` ADD CONSTRAINT `CONTRATO_cliente_id_fkey` FOREIGN KEY (`cliente_id`) REFERENCES `CLIENTE`(`cliente_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AFILIADO` ADD CONSTRAINT `AFILIADO_contrato_id_fkey` FOREIGN KEY (`contrato_id`) REFERENCES `CONTRATO`(`contrato_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AFILIADO` ADD CONSTRAINT `AFILIADO_afiliado_id_fkey` FOREIGN KEY (`afiliado_id`) REFERENCES `USUARIO`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SUBCATEGORIA` ADD CONSTRAINT `SUBCATEGORIA_categoria_id_fkey` FOREIGN KEY (`categoria_id`) REFERENCES `CATEGORIA`(`categoria_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PRODUCTO` ADD CONSTRAINT `PRODUCTO_subcategoria_id_fkey` FOREIGN KEY (`subcategoria_id`) REFERENCES `SUBCATEGORIA`(`subcategoria_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CONTRATO_PRODUCTO` ADD CONSTRAINT `CONTRATO_PRODUCTO_contrato_id_fkey` FOREIGN KEY (`contrato_id`) REFERENCES `CONTRATO`(`contrato_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CONTRATO_PRODUCTO` ADD CONSTRAINT `CONTRATO_PRODUCTO_producto_id_fkey` FOREIGN KEY (`producto_id`) REFERENCES `PRODUCTO`(`producto_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SERVICIO_PLAN` ADD CONSTRAINT `SERVICIO_PLAN_servicio_id_fkey` FOREIGN KEY (`servicio_id`) REFERENCES `SERVICIO`(`servicio_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SERVICIO_PLAN` ADD CONSTRAINT `SERVICIO_PLAN_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `PLAN_FUNEBRE`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CONTRATO_PLAN` ADD CONSTRAINT `CONTRATO_PLAN_contrato_id_fkey` FOREIGN KEY (`contrato_id`) REFERENCES `CONTRATO`(`contrato_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CONTRATO_PLAN` ADD CONSTRAINT `CONTRATO_PLAN_plan_id_fkey` FOREIGN KEY (`plan_id`) REFERENCES `PLAN_FUNEBRE`(`plan_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PAGO` ADD CONSTRAINT `PAGO_contrato_id_fkey` FOREIGN KEY (`contrato_id`) REFERENCES `CONTRATO`(`contrato_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
