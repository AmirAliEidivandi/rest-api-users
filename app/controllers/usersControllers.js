const UserModle = require("../models/UsersModel");
const asyncWrapper = require("../middlewares/async");
const JWT = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const usersList = asyncWrapper(async (req, res, next) => {
    let projection = {};
    if (req.query.hasOwnProperty("fields")) {
        projection = req.query.fields.split(",").reduce((tt, cur) => {
            return {
                [cur]: 1,
                ...tt,
            };
        }, {});
    }

    const findUsers = await UserModle.find({}, projection);
    res.status(200).send(findUsers);
});

const addUser = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, mobile, email, password } = req.body;

    const oldUser = await UserModle.findOne({ email });
    oldUser && res.status(422).json({ message: "already user exists" });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    if (!firstName || !lastName) {
        res.status(422).send({
            error: true,
            message: "firstName and lastName not validation",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModle({
        firstName,
        lastName,
        mobile,
        email,
        password: hashedPassword,
    });
    await newUser.save();

    const token = JWT.sign({ email: newUser.email }, process.env.SECRET_TOKEN_SIGN, { expiresIn: "5d" });

    res.status(201).send({
        success: true,
        message: "create successfully!",
        newUser,
        token,
    });
});

const updateUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    // const { email } = req.body;

    const user = await UserModle.findByIdAndUpdate(
        id,
        {
            $set: req.body,
        },
        {
            new: true,
            runValidators: true,
        }
    );

    const token = JWT.sign({ email: user.email }, process.env.SECRET_TOKEN_REFRESH, { expiresIn: "5d" });

    res.status(200).json({ user, token });
});

module.exports = {
    usersList,
    addUser,
    updateUser
};
