const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

router.post("/admin/login", controllers.adminAuth.login);
router.post("/admin/register", controllers.adminAuth.register);

module.exports = router;
