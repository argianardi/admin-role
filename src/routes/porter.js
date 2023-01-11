const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/porter", controllers.porter.post);

module.exports = router;
