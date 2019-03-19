
Create initial test DB:
-----
```
admin=# CREATE DATABASE planning;
CREATE DATABASE
admin=# \c planning;

planning=# CREATE TABLE examples (id SERIAL PRIMARY KEY, content VARCHAR);


```
Create trips table:
```
admin=# \c planning;
planning=# CREATE TABLE trips (id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR);
CREATE TABLE

```
