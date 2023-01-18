const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// get all mitras request
router.get("/mitras", validateAuth.isAuthenticated, controllers.mitra.getAll);

// get one mitra by id request
router.get(
  "/mitra/:id",
  validateAuth.isAuthenticated,
  controllers.mitra.getOneMitra
);

// delete one mitra by id request
router.delete(
  "/mitra/:id/",
  validateAuth.isAuthenticated,
  controllers.mitra.delete
);

module.exports = router;
