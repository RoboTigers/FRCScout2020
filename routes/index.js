var express = require("express");
const path = require('path');

const app = express();

//app.use('/api');
app.use(express.static(path.join(__dirname, 'api')));

/* GET home page. */
app.get("/", function(req, res, next) {
  console.log("root get !!!!!!");
  res.render("index", { title: "Express" });
});

module.exports = app;
