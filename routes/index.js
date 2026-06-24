const router = require("express").Router();

router.get("/", (req, res) => {
  res.redirect("/products");
});

router.use(require("./products"));
router.use(require("./categories"));

module.exports = router;
