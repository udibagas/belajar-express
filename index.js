const express = require("express");
const app = express(); // create instance
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
