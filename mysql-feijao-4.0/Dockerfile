FROM mysql:latest
COPY feijao_db.sql /docker-entrypoint-initdb.d
ENV MYSQL_ROOT_PASSWORD root
EXPOSE  3306