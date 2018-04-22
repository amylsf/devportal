DROP DATABASE IF EXISTS devportal;

CREATE DATABASE devPortal;

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  author VARCHAR(255),
  "source.name" VARCHAR(255),
  urlToImage VARCHAR(255),
  description VARCHAR(1000),
  publishedAt VARCHAR(100)
)

CREATE TABLE meetups (
  meetup_id SERIAL PRIMARY KEY,
  id VARCHAR(100) UNIQUE,
  name VARCHAR(255),
  "group.name" VARCHAR(255),
  link VARCHAR(500),
  local_date VARCHAR(100)
)