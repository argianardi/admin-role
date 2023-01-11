const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

//post request
router.post("/", controllers.category.post);

module.exports = router;
