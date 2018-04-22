DROP DATABASE IF EXISTS devportal;

CREATE DATABASE devportal;

\connect devportal;

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  author VARCHAR(255),
  source VARCHAR(255),
  url VARCHAR(500),
  urlToImage VARCHAR(1000),
  description VARCHAR(1000),
  publishedAt VARCHAR(100)
);

CREATE TABLE meetups (
  meetup_id SERIAL PRIMARY KEY,
  id VARCHAR(100) UNIQUE,
  name VARCHAR(255),
  groupname VARCHAR(255),
  link VARCHAR(500),
  local_date VARCHAR(100)
);