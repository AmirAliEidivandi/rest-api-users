const router = require("express").Router();
const { usersList, addUser, getUser, removeUser, updateUserPatch, updateUserPut, getUserStats } = require("../controllers/usersControllers");
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("../services/token.service");

router.get("/", usersList);
router.get("/stats", verifyTokenAndAdmin, getUserStats);
router.post("/", verifyTokenAndAdmin, addUser);
router.get("/:id", verifyTokenAndAdmin, getUser);
router.put("/:id", verifyTokenAndAuthorization, updateUserPut);
router.patch("/:id", verifyTokenAndAuthorization, updateUserPatch);
router.delete("/:id", verifyTokenAndAuthorization, removeUser);

module.exports = router;
