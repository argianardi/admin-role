const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// post category request
router.post(
  "/category",
  validateAuth.isAuthenticated,
  controllers.category.post
);

// get all categories request
router.get(
  "/categories",
  validateAuth.isAuthenticated,
  controllers.category.getAll
);

// get one category by id
router.get(
  "/category/:id",
  validateAuth.isAuthenticated,
  controllers.category.getOneCategory
);

// put one category by id request
router.put(
  "/category/:id",
  validateAuth.isAuthenticated,
  controllers.category.put
);

// delete category request
router.delete(
  "/category/:id",
  validateAuth.isAuthenticated,
  controllers.category.delete
);

module.exports = router;
