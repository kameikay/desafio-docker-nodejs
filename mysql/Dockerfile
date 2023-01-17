FROM mysql:5.7

ENV MYSQL_DATABASE nodedb
ENV MYSQL_ROOT_PASSWORD root

COPY create_people_table.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]