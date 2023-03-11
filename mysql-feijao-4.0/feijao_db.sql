CREATE DATABASE feijao_db;
USE feijao_db;

CREATE TABLE lista (
  id varchar(255),
  nome varchar(255),
  baiana boolean,
  PRIMARY KEY (id)
);

-- INSERT INTO lista (id, nome, baiana) VALUES ();

CREATE TABLE quantidades (
  tipo varchar(255),
  inteiras int,
  meias int,
  PRIMARY KEY (tipo)
);

INSERT INTO quantidades (tipo, inteiras, meias) VALUES ("baiana", 0, 0);
INSERT INTO quantidades (tipo, inteiras, meias) VALUES ("carioca", 0, 0);

-- UPDATE quantidades SET inteiras = % WHERE tipo = %;