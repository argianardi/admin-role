const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// post admin request
router.post("/admin", validateAuth.isAuthenticated, controllers.admin.post);

// get one admin request
router.get(
  "/admin/:id",
  validateAuth.isAuthenticated,
  controllers.admin.getOneAdmin
);

// put admin request
router.put("/admin/:id", validateAuth.isAuthenticated, controllers.admin.put);

module.exports = router;
