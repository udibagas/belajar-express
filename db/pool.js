const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "tokoku",
  user: "postgres",
  password: "postgres",
});

module.exports = pool;
