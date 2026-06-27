const router = require("express").Router();

router
  .get("/", (req, res) => {
    res.redirect("/products");
  })
  .use("/products", require("./products"))
  .use("/categories", require("./categories"));

module.exports = router;
