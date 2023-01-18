const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// get shipping cost
router.get("/cost", controllers.shippingCost.getCost);

module.exports = router;
