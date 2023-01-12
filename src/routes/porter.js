const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/porter", controllers.porter.post);

// get all porter request
router.get("/porters", controllers.porter.getAll);

// get one porter by id request
router.get("/porter/:id", controllers.porter.getOnePorter);

module.exports = router;
