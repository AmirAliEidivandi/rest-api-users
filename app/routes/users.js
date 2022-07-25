const router = require("express").Router();
const { usersList, addUser, getUser, removeUser, updateUserPatch, updateUserPut } = require("../controllers/usersControllers");

router.route("/").get(usersList).post(addUser);
router.route("/:id").get(getUser).delete(removeUser).put(updateUserPut).patch(updateUserPatch);

module.exports = router;
