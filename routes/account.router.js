const express = require("express");
const router = express.Router();

const accountController = require("../controller/account.controller");

router.post("/updateNIK", accountController.updateNIK);

module.exports = router;
