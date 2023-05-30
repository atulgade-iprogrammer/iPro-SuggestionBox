const express = require("express");
const app = express();
const router = require("../router/router");
const path = require("path");
const cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// listening on Port 8000
app.listen(8000);
app.use(router);
const htmlPath = path.join(__dirname, "../public");
console.log(htmlPath);
app.use(express.static(htmlPath));
app.get("/", (req, res) => {
  res.sendFile(htmlPath + "/index.html");
});
