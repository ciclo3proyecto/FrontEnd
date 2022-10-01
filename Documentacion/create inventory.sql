
CREATE TABLE menus 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     menu VARCHAR (100) , 
     descripcion VARCHAR (255) , 
     ruta VARCHAR (500) , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 


CREATE TABLE movimientos 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     productos_id INTEGER NOT NULL , 
     tiposmovimientos_id INTEGER NOT NULL , 
     fecha DATE , 
     cantidad NUMERIC (19,2) , 
     precio NUMERIC (19,2) , 
     estado VARCHAR (13) , 
     creadopor INTEGER NOT NULL , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 


CREATE TABLE perfiles 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     descripcion VARCHAR (200) , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 


CREATE TABLE permisos 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     menus_id INTEGER NOT NULL , 
     perfil_id INTEGER NOT NULL , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 


CREATE TABLE productos 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     unidades_id INTEGER NOT NULL , 
     codigo VARCHAR (10) , 
     nombre VARCHAR (50) , 
     descripcion VARCHAR (250) , 
     precio NUMERIC (19,2) , 
     existencia NUMERIC (19,2) , 
     estado VARCHAR (13) , 
     creadopor INTEGER NOT NULL , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 


CREATE TABLE tiposdocumentos 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     descripcion VARCHAR (500) , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );


 


CREATE TABLE tiposmovimientos 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     descripcion VARCHAR (200) , 
     afectacion CHAR (1) , 
     estado VARCHAR (13) , 
     creadopor INTEGER NOT NULL , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );




CREATE TABLE unidades 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     descripcion VARCHAR (100) , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );



CREATE TABLE usuarios 
    (
     id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY, 
     perfiles_id INTEGER NOT NULL , 
     tiposdocumentos_id INTEGER NOT NULL , 
     login VARCHAR (50) , 
     password VARCHAR (50) , 
     identificacion NUMERIC (28) , 
     nombres VARCHAR (250) , 
     primerapellido VARCHAR (100) , 
     segundoapellido VARCHAR (100) , 
     estado VARCHAR (13) , 
     creadopor INTEGER , 
     creado DATE , 
     actualizadopor INTEGER , 
     actualizado DATE , 
     eliminadopor INTEGER , 
     eliminado DATE 
    );

 

ALTER TABLE movimientos 
    ADD CONSTRAINT movimientos_productos_fk FOREIGN KEY 
    ( 
     productos_id
    ) 
    REFERENCES productos 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE movimientos 
    ADD CONSTRAINT movimientos_tiposmovimientos_fk FOREIGN KEY 
    ( 
     tiposmovimientos_id
    ) 
    REFERENCES tiposmovimientos 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE movimientos 
    ADD CONSTRAINT movimientos_usuarios_fk FOREIGN KEY 
    ( 
     creadopor
    ) 
    REFERENCES usuarios 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE permisos 
    ADD CONSTRAINT permisos_menus_fk FOREIGN KEY 
    ( 
     menus_id
    ) 
    REFERENCES menus 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE permisos 
    ADD CONSTRAINT permisos_perfil_fk FOREIGN KEY 
    ( 
     perfil_id
    ) 
    REFERENCES perfiles 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE productos 
    ADD CONSTRAINT productos_unidades_fk FOREIGN KEY 
    ( 
     unidades_id
    ) 
    REFERENCES unidades 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE productos 
    ADD CONSTRAINT productos_usuarios_fk FOREIGN KEY 
    ( 
     creadopor
    ) 
    REFERENCES usuarios 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE tiposmovimientos 
    ADD CONSTRAINT tiposmovimientos_usuarios_fk FOREIGN KEY 
    ( 
     creadopor
    ) 
    REFERENCES usuarios 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE usuarios 
    ADD CONSTRAINT usuarios_perfiles_fk FOREIGN KEY 
    ( 
     perfiles_id
    ) 
    REFERENCES perfiles 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

ALTER TABLE usuarios 
    ADD CONSTRAINT usuarios_tiposdocumentos_fk FOREIGN KEY 
    ( 
     tiposdocumentos_id
    ) 
    REFERENCES tiposdocumentos 
    ( 
     id 
    ) 
    ON DELETE NO ACTION 
    ON UPDATE NO ACTION; 
 

