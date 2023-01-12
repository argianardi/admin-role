const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post category request
router.post("/product", controllers.product.post);

module.exports = router;
