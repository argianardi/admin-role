const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post category request
router.post("/product", controllers.product.post);

// get all products request
router.get("/products", controllers.product.getAll);

module.exports = router;
