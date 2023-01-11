const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post category request
router.post("/category", controllers.category.post);

// get all categories request
router.get("/categories", controllers.category.getAll);

module.exports = router;
