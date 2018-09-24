FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD 1234  
ENV MYSQL_DATABASE test
ENV MYSQL_USER test
ENV MYSQL_PASSWORD 1234

ADD setup.sql /docker-entrypoint-initdb.d
