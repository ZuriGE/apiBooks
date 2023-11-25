const { Router } = require("express");
const router = Router();
const userCtrl = require("../controller/user.controller");

router.post("/register", userCtrl.postUser);
router.post("/login", userCtrl.postLogin);
router.put("/user", userCtrl.putUser);

module.exports = router;
