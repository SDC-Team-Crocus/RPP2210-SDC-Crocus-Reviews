DROP DATABASE IF EXISTS sdc_reviews;
CREATE DATABASE sdc_reviews;

\c sdc_reviews;

CREATE TABLE reviews (
  id serial UNIQUE PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(255),
  reviewer_email VARCHAR(255),
  response TEXT,
  helpfulness INTEGER DEFAULT 0
);

CREATE TABLE reviews_photos (
  id serial UNIQUE PRIMARY KEY,
  review_id INTEGER NOT NULL REFERENCES reviews (id),
  photo_url TEXT
);


CREATE TABLE characteristics (
  id serial UNIQUE PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE characteristic_reviews (
  id serial UNIQUE PRIMARY KEY,
  characteristic_id INTEGER NOT NULL REFERENCES characteristics (id),
  review_id INTEGER NOT NULL REFERENCES reviews (id),
  value INTEGER NOT NULL
);
