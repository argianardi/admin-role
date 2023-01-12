const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post admin request
router.post("/admin", controllers.admin.post);

// get one admin request
router.get("/admin/:id", controllers.admin.getOneAdmin);

// put admin request
router.put("/admin/:id", controllers.admin.put);

module.exports = router;
