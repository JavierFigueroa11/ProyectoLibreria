USE biblioteca_jf;
create table libros(
    id_libro    VARCHAR(10)     not NULL,
    titulo      VARCHAR(255)    not NULL,
    cantidad    INTEGER         not NULL,
    CONSTRAINT PK__libros__END 
        PRIMARY KEY (id_libro),
    CONSTRAINT CK__libros__cantidad__END 
        CHECK(cantidad>0)
);


create table usuarios(
    id          VARCHAR(10)         not NULL,
    nombre      VARCHAR(100)        not NULL,
    username    VARCHAR(100)        not NULL,
    pass        VARCHAR(100)        not NULL,
    rol         CHAR(1)             not NULL,
    CONSTRAINT PK__usuarios__END
        PRIMARY KEY (id),
    CONSTRAINT CK__usuarios__END
        CHECK(rol='s' or rol='b' or rol='S' or rol='B')
);
INSERT INTO usuarios (id, nombre, username, pass, rol)
VALUES ("e39aab2la", "bibliotecario", "admin", "bibliotecario", "B");
create table prestamos(
    id_prestamo VARCHAR(10)         not NULL,
    id_libro    VARCHAR(10)         not NULL,
    id_socio    VARCHAR(10)         not NULL,
    fecha_vto   BIGINT              not NULL,
    CONSTRAINT  PK__prestamos__END
        PRIMARY KEY (id_prestamo),
    CONSTRAINT  FK__prestamos__libros__END
        FOREIGN KEY (id_libro) REFERENCES libros(id_libro),
    CONSTRAINT  FK__prestamos__usuarios__END
        FOREIGN KEY (id_socio) REFERENCES usuarios(id)
);
