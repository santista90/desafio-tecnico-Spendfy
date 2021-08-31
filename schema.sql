CREATE DATABASE spendfy_documents;

CREATE TABLE IF NOT EXISTS documents (
	id SERIAL PRIMARY KEY,
    kbSize INT NOT NULL,
  	name VARCHAR(100) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    createdAt DATE,
    deletedAt DATE
);