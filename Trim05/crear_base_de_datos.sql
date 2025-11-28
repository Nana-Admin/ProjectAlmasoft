-- =====================================================================
-- BORRAR Y CREAR BASE DE DATOS
-- =====================================================================
DROP DATABASE IF EXISTS BBDD_FUNERARIA_ALMASOFT;
CREATE DATABASE BBDD_FUNERARIA_ALMASOFT DEFAULT CHARACTER SET utf8;
USE BBDD_FUNERARIA_ALMASOFT;

-- =====================================================================
-- TABLA ROL
-- =====================================================================
CREATE TABLE ROL (
    rol_id INT NOT NULL AUTO_INCREMENT,
    rol_nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (rol_id)
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA USUARIO
-- =====================================================================
CREATE TABLE USUARIO (
    usuario_id INT NOT NULL AUTO_INCREMENT,
    usuario_primer_nombre VARCHAR(45) NOT NULL,
    usuario_segundo_nombre VARCHAR(45) NOT NULL,
    usuario_primer_apellido VARCHAR(45) NOT NULL,
    usuario_segundo_apellido VARCHAR(45) NOT NULL,
    usuario_documento INT NOT NULL,
    usuario_correo VARCHAR(45) NOT NULL UNIQUE,
    usuario_direccion VARCHAR(45) NOT NULL,
    usuario_credencial VARCHAR(100) NOT NULL,
    PRIMARY KEY (usuario_id)
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA ROL_USUARIO
-- =====================================================================
CREATE TABLE ROL_USUARIO (
    cred_id INT NOT NULL AUTO_INCREMENT,
    rol_id INT NOT NULL,
    usuario_id INT NOT NULL,
    estado_cred BOOLEAN NOT NULL,
    PRIMARY KEY (cred_id),

    FOREIGN KEY (rol_id) REFERENCES ROL(rol_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA TELEFONO
-- =====================================================================
CREATE TABLE TELEFONO (
    telefono BIGINT NOT NULL,
    usuario_id INT NOT NULL,
    PRIMARY KEY (telefono, usuario_id),

    FOREIGN KEY (usuario_id) REFERENCES USUARIO(usuario_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA CLIENTE
-- =====================================================================
CREATE TABLE CLIENTE (
    cliente_id INT NOT NULL,
    cliente_fecha_nacimiento DATE NOT NULL,
    cliente_edad INT NOT NULL,
    PRIMARY KEY (cliente_id),

    FOREIGN KEY (cliente_id) REFERENCES USUARIO(usuario_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA CONTRATO
-- =====================================================================
CREATE TABLE CONTRATO (
    contrato_id INT NOT NULL AUTO_INCREMENT,
    contrato_estado BOOLEAN NOT NULL,
    contrato_valor DOUBLE NOT NULL,
    cliente_id INT NOT NULL,
    PRIMARY KEY (contrato_id),

    FOREIGN KEY (cliente_id) REFERENCES CLIENTE(cliente_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA AFILIADO
-- =====================================================================
CREATE TABLE AFILIADO (
    afiliado_id INT NOT NULL,
    contrato_id INT NOT NULL,
    PRIMARY KEY (afiliado_id, contrato_id),

    FOREIGN KEY (afiliado_id) REFERENCES USUARIO(usuario_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(contrato_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA CATEGORIA
-- =====================================================================
CREATE TABLE CATEGORIA (
    categoria_id INT NOT NULL AUTO_INCREMENT,
    categoria_nombre VARCHAR(45) NOT NULL,
    PRIMARY KEY (categoria_id)
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA SUBCATEGORIA
-- =====================================================================
CREATE TABLE SUBCATEGORIA (
    subcategoria_id INT NOT NULL AUTO_INCREMENT,
    subcategoria_nombre VARCHAR(45) NOT NULL,
    categoria_id INT NOT NULL,
    PRIMARY KEY (subcategoria_id),

    FOREIGN KEY (categoria_id) REFERENCES CATEGORIA(categoria_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA PRODUCTO
-- =====================================================================
CREATE TABLE PRODUCTO (
    producto_id INT NOT NULL AUTO_INCREMENT,
    producto_nombre VARCHAR(45) NOT NULL,
    producto_descripcion VARCHAR(50) NOT NULL,
    producto_precio DOUBLE NOT NULL,
    producto_stock INT NOT NULL,
    producto_estado BOOLEAN NOT NULL,
    subcategoria_id INT NOT NULL,
    PRIMARY KEY (producto_id),

    FOREIGN KEY (subcategoria_id) REFERENCES SUBCATEGORIA(subcategoria_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA CONTRATO_PRODUCTO
-- =====================================================================
CREATE TABLE CONTRATO_PRODUCTO (
    contrato_id INT NOT NULL,
    producto_id INT NOT NULL,
    PRIMARY KEY (contrato_id, producto_id),

    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(contrato_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (producto_id) REFERENCES PRODUCTO(producto_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA SERVICIO
-- =====================================================================
CREATE TABLE SERVICIO (
    servicio_id INT NOT NULL AUTO_INCREMENT,
    servicio_nombre VARCHAR(45),
    servicio_descripcion VARCHAR(45),
    servicio_precio DOUBLE NOT NULL,
    PRIMARY KEY (servicio_id)
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA PLAN_FUNEBRE
-- =====================================================================
CREATE TABLE PLAN_FUNEBRE (
    plan_id INT NOT NULL AUTO_INCREMENT,
    plan_nombre VARCHAR(45) NOT NULL,
    plan_precio DOUBLE NOT NULL,
    plan_estado BOOLEAN NOT NULL,
    PRIMARY KEY (plan_id)
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA SERVICIO_PLAN
-- =====================================================================
CREATE TABLE SERVICIO_PLAN (
    servicio_id INT NOT NULL,
    plan_id INT NOT NULL,
    PRIMARY KEY (servicio_id, plan_id),

    FOREIGN KEY (servicio_id) REFERENCES SERVICIO(servicio_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (plan_id) REFERENCES PLAN_FUNEBRE(plan_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA CONTRATO_PLAN
-- =====================================================================
CREATE TABLE CONTRATO_PLAN (
    contrato_id INT NOT NULL,
    plan_id INT NOT NULL,
    PRIMARY KEY (contrato_id, plan_id),

    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(contrato_id)
        ON DELETE CASCADE ON UPDATE CASCADE,

    FOREIGN KEY (plan_id) REFERENCES PLAN_FUNEBRE(plan_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- TABLA PAGO
-- =====================================================================
CREATE TABLE PAGO (
    pago_id INT NOT NULL AUTO_INCREMENT,
    pago_metodo VARCHAR(45) NOT NULL,
    pago_fecha DATE NOT NULL,
    contrato_id INT NOT NULL,
    PRIMARY KEY (pago_id),

    FOREIGN KEY (contrato_id) REFERENCES CONTRATO(contrato_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- =====================================================================
-- DATOS INICIALES
-- =====================================================================

INSERT IGNORE INTO ROL (rol_nombre) VALUES ('ADMIN'), ('VENDEDOR'), ('CAJERO');

INSERT INTO USUARIO (
    usuario_primer_nombre,
    usuario_segundo_nombre,
    usuario_primer_apellido,
    usuario_segundo_apellido,
    usuario_documento,
    usuario_correo,
    usuario_direccion,
    usuario_credencial
) VALUES (
    'Admin',
    'Master',
    'AlmaSoft',
    'System',
    12345678,
    'admin@almasoft.com',
    'Oficina Central',
    '$2a$10$wHnP2nLz0fXk6ZjA0f44tO2CXZ4B5a09uFgpS7T7LJp6M/djFsZ2W'
);

INSERT INTO ROL_USUARIO (usuario_id, rol_id, estado_cred)
VALUES (LAST_INSERT_ID(), 1, TRUE);
