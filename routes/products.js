const router = require("express").Router();
const Category = require("../models/Category");
const Product = require("../models/Product");

router
  .get("/", async (req, res) => {
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
  })

  .get("/create", async (req, res) => {
    const categories = await Category.findAll();
    res.render("products/create", { categories });
  })

  .post("/create", async (req, res) => {
    const { name, categoryId, price, stock, description } = req.body;
    await Product.create({ name, categoryId, price, stock, description });
    res.redirect("/products");
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/show", { product });
  })

  .get("/:id/delete", async (req, res) => {
    const { id } = req.params;
    await Product.delete(id);
    res.redirect("/products");
  })

  // display form
  .get("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const categories = await Category.findAll();
    const product = await Product.findById(id);
    res.render("products/edit", { categories, product });
  })

  // handle form
  .post("/:id/edit", async (req, res) => {
    const { id } = req.params;
    const { name, categoryId, price, stock, description } = req.body;
    await Product.update(id, { name, categoryId, price, stock, description });
    res.redirect("/products");
  });

module.exports = router;
