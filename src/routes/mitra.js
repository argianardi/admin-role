const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/mitra", controllers.mitra.post);

module.exports = router;
