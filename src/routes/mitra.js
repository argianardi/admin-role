const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

// post request
router.post("/mitra", controllers.mitra.post);

// get all porter request
router.get("/mitras", controllers.mitra.getAll);

// put status_kemitraan request
router.put("/kemitraan/:id", controllers.mitra.put);

module.exports = router;
