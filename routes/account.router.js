const express = require("express");
const router = express.Router();

const accountController = require("../controller/account.controller");

router.post("/updateNIK", accountController.updateNIK);
router.post("/updateAccount", accountController.updateAccount);

module.exports = router;
