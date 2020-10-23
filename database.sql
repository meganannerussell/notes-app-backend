CREATE DATABASE notesapp;

CREATE TABLE notes(
    id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(300),
    color VARCHAR(100)
);
