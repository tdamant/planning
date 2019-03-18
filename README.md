
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
Create trips table:
```
planning=# CREATE TABLE trips (id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR, attendee1 VARCHAR, startdate TIMESTAMP, enddate TIMESTAMP);
CREATE TABLE

planning=# \dt
         List of relations
 Schema |   Name   | Type  | Owner  
--------+----------+-------+--------
 public | examples | table | szilvi
 public | trips    | table | szilvi
(2 rows)

planning=#
```
