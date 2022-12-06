const express = require("express");
const userDataController = require("../controller/datacontroller");
const router = express.Router();

router.get("/", userDataController.getAllData);
router.post("/user", userDataController.insertData);
router.put("/user/:id", userDataController.updateDataUser);

module.exports = router;
