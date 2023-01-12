const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/mitra", controllers.mitra.post);

// get all porter request
router.get("/mitras", controllers.mitra.getAll);

module.exports = router;
