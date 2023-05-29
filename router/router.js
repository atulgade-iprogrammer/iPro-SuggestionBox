const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const middleware = require("../middleware/middleware");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const insertData = require("../controller/insertingInSheet");

router.post("/insertIntoGoogleSheet", middleware, insertData);
module.exports = router;
