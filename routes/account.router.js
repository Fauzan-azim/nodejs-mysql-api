const express = require("express");
const router = express.Router();

const accountController = require("../controller/account.controller");

router.post("/updateNIK", accountController.updateNIK);
router.post("/updateAccount", accountController.updateAccount);
router.get("/getAccount/:id", accountController.getAccount);

module.exports = router;
