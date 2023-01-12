const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post category request
router.post("/product", controllers.product.post);

// get all products request
router.get("/products", controllers.product.getAll);

// get one product by id request
router.get("/product/:id", controllers.product.getOneProduct);

//  put one product by id request
router.put("/product/:id", controllers.product.put);

module.exports = router;
