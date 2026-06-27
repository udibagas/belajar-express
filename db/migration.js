const pool = require("./pool");
const fs = require("fs");

const query = fs.readFileSync("./db/schema.sql", "utf-8");

pool
  .query(query)
  .then((r) => {
    console.log(`Migration success`);
  })
  .catch((e) => {
    console.log(`Error running migration:`, e.message);
  });
