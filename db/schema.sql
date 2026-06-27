DROP TABLE IF EXISTS "products", "categories";

CREATE TABLE "categories" (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);

CREATE TABLE "products" (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    description VARCHAR NULL,
    price INT NOT NULL,
    stock INT NOT NULL,
    "categoryId" INT NOT NULL REFERENCES "categories" ("id")
);