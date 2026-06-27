const router = require("express").Router();
const Category = require("../models/Category");

router
  .get("/", async (req, res) => {
    const categories = await Category.findAll();
    res.render("categories", { categories });
  })

  .get("/create", (req, res) => {
    res.render("categories/create");
  })

  .post("/create", async (req, res) => {
    const { name } = req.body;
    await Category.create({ name: name });
    res.redirect("/categories");
  })

  .get("/:id", async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json(category);
  });

module.exports = router;
