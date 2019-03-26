
Create DB:
-----
```
CREATE DATABASE planning;
```
Create trips table:
```
CREATE TABLE trips (id SERIAL PRIMARY KEY, name VARCHAR(60), description VARCHAR, organiser INTEGER);
```
Create stages and user tables:
```
CREATE TABLE stages (id SERIAL PRIMARY KEY, name VARCHAR, content VARCHAR, due_date DATE, event_id INTEGER);
```
Create users table:
```
CREATE TABLE users (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, email VARCHAR, phone_number VARCHAR, password VARCHAR);
```
Create polls table:
```
CREATE TABLE polls (id SERIAL PRIMARY KEY, type VARCHAR, options VARCHAR, deadline DATE, trip_id INTEGER REFERENCES trips (id));
```

Create trips_users table:

```
create table trips_users (id SERIAL PRIMARY KEY, trip_id INTEGER REFERENCES trips (id), user_id INTEGER REFERENCES users (id));
```

Create stages_users table:

```
CREATE TABLE stages_users (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (id), stage_id INTEGER REFERENCES stages (id));
```
Create votes table:

```
CREATE TABLE votes (id SERIAL PRIMARY KEY, trip_id INTEGER REFERENCES trips (id), poll_id INTEGER REFERENCES polls (id), user_id INTEGER REFERENCES users (id), option_id VARCHAR);
```

Create votes table:

```
CREATE TABLE comments (id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users (id), comment VARCHAR);
```
