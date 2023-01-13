const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// get all products request
router.get("/products", controllers.product.getAll);

// get one product by id request
router.get("/product/:id", controllers.product.getOneProduct);

// delete one product by id request
router.delete("/product/:id", controllers.product.delete);

module.exports = router;
