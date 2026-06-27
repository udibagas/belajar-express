const pool = require("../pool");
const fs = require("fs");

const products = fs.readFileSync("./db/data/products.json", "utf-8");
const productsData = JSON.parse(products).map((i) => {
  return `('${i.name}', '${i.description}', '${i.price}', '${i.stock}', '${i.categoryId}')`;
});

console.log(productsData);

const queryCategory = `
  INSERT INTO "products"
    (name, description, price, stock, "categoryId")
  VALUES
    ${productsData}
`;

pool
  .query(queryCategory)
  .then((r) => {
    console.log(`Seeding success`);
  })
  .catch((e) => {
    console.log(`Error running seeding:`, e.message);
  });
