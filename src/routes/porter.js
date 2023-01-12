const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/porter", controllers.porter.post);

// get all porter request
router.get("/porters", controllers.porter.getAll);

module.exports = router;
