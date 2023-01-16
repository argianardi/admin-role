const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/admin/login", controllers.authAdmin.login);
// router.post("/register", controllers.auth.register);

module.exports = router;
