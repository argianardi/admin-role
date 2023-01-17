const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// get all porter request
router.get("/mitras", validateAuth.isAuthenticated, controllers.mitra.getAll);

// put status_kemitraan request
router.put(
  "/kemitraan/:id",
  validateAuth.isAuthenticated,
  controllers.mitra.put
);

module.exports = router;
