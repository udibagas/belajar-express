const pool = require("../pool");
const fs = require("fs");

const categories = fs.readFileSync("./db/data/categories.json", "utf-8");
const categoriesData = JSON.parse(categories).map((i) => {
  return `('${i.name}')`;
});

console.log(categoriesData);

const queryCategory = `
  INSERT INTO "categories"
    (name)
  VALUES
    ${categoriesData}
`;

pool
  .query(queryCategory)
  .then((r) => {
    console.log(`Seeding success`);
  })
  .catch((e) => {
    console.log(`Error running seeding:`, e.message);
  });
