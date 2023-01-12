const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post category request
router.post("/admin", controllers.admin.post);

module.exports = router;
