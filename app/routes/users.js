const express = require("express");
const router = express.Router();
const { usersList, addUser, updateUser } = require("../controllers/usersControllers");
const { check } = require("express-validator");

router.get("/", usersList);
router.post("/", [check("email", "invalid email").isEmail(), check("password", "invalid password").isLength({ min: 6 }).exists()], addUser);
router.put("/:id", updateUser);

module.exports = router;
