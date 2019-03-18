
Create initial test DB: 
-----
```
isabel=# CREATE DATABASE planning;
CREATE DATABASE
isabel=# \c planning;
You are now connected to database "planning" as user "Isabel".
planning=# CREATE TABLE examples (id SERIAL PRIMARY KEY, content VARCHAR);
CREATE TABLE
planning=# \dt
         List of relations
 Schema |   Name   | Type  | Owner
--------+----------+-------+--------
 public | examples | table | Isabel
(1 row)

planning=# select * from examples;
 id | content
----+---------
(0 rows)

planning=# \q
```