const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");
const validateAuth = require("../middlewares/validateAuth");

// post request
router.post("/porter", validateAuth.isAuthenticated, controllers.porter.post);

// get all porter request
router.get("/porters", validateAuth.isAuthenticated, controllers.porter.getAll);

// get one porter by id request
router.get(
  "/porter/:id",
  validateAuth.isAuthenticated,
  controllers.porter.getOnePorter
);

// put porter request
router.put("/porter/:id", validateAuth.isAuthenticated, controllers.porter.put);

// delete porter request
router.delete(
  "/porter/:id",
  validateAuth.isAuthenticated,
  controllers.porter.delete
);

module.exports = router;
