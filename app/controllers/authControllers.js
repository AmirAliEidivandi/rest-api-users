const bcrypt = require("bcrypt");
const asyncWrapper = require("../middlewares/async");
const User = require("../models/AuthModel");
const { validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const userRegiser = asyncWrapper(async (req, res) => {
    const { email, userName, password } = req.body;

    // validation user
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }

    const oldUser = await User.findOne({
        email,
    });
    if (oldUser) {
        return res.status(400).json({
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        userName,
        email,
        password: hashedPassword,
    });

    const result = await newUser.save();
    res.status(201).send({
        success: true,
        data: {
            result,
        },
    });
});

const loginUser = asyncWrapper(async (req, res) => {
    const user = await User.findOne({ userName: req.body.userName });

    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password && res.status(401).json("Wrong credentials!");

    const accessToken = JWT.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
});

module.exports = {
    userRegiser,
    loginUser,
};
