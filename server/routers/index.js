const express = require("express");
const userDataController = require("../controller/datacontroller");
const router = express.Router();

router.get("/", userDataController.getAllData);

module.exports = router;
