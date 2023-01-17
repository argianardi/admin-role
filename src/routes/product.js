const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// get all products request
router.get(
  "/products",
  validateAuth.isAuthenticated,
  controllers.product.getAll
);

// get one product by id request
router.get(
  "/product/:id",
  validateAuth.isAuthenticated,
  controllers.product.getOneProduct
);

// delete one product by id request
router.delete(
  "/product/:id",
  validateAuth.isAuthenticated,
  controllers.product.delete
);

module.exports = router;
