const express = require("express");
const router = express.Router();
const { usersList, addUser } = require("../controllers/usersControllers");

router.get("/", usersList);
router.post("/", addUser);

module.exports = router;
