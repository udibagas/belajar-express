const router = require("express").Router();
const Category = require("../models/Category");
const Product = require("../models/Product");

router.get("/products", async (req, res) => {
  let { keyword, order, sort, page = 1 } = req.query;

  const { data, skip, total, totalPage } = await Product.paginate({
    keyword,
    order,
    sort,
    page,
  });

  res.render("products", {
    title: "Produk",
    products: data,
    skip,
    page: +page,
    total,
    totalPage,
  });
});

router.get("/products/create", async (req, res) => {
  const categories = await Category.findAll();
  // const result = await pool.query('SELECT * FROM categories ORDER BY name');
  // const categories = result.rows
  res.render("products/create", { categories });
});

module.exports = router;
