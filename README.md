
Create initial test DB:
-----
```
CREATE DATABASE planning;

\c planning;

CREATE TABLE examples (id SERIAL PRIMARY KEY, content VARCHAR);


```
Create trips table:
```
\c planning;

CREATE TABLE trips (id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR);

```
Create stages and user tables:
```
\c planning;

CREATE TABLE stages (id SERIAL, name VARCHAR, content VARCHAR, due_date DATE, event_id INTEGER);

CREATE TABLE users (id SERIAL, name VARCHAR, email VARCHAR, phone_number VARCHAR);
```
