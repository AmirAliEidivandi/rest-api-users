const router = require("express").Router();
const { userRegiser, loginUser } = require("../controllers/authControllers");
const { check } = require("express-validator");

// register user
router.post(
    "/register",
    [
        check("email", "email is not vaid").isEmail(),
        check("password", "password is not valid")
            .isLength({
                min: 6,
            })
            .exists(),
    ],
    userRegiser
);

// login user
router.post(
    "/login",
    [
        check("email", "email is not vaid").isEmail(),
        check("password", "password is not valid")
            .isLength({
                min: 6,
            })
            .exists(),
    ],
    loginUser
);

module.exports = router;
