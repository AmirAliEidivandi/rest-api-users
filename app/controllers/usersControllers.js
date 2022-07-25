const UserModle = require("../models/UsersModel");
const asyncWrapper = require("../middlewares/async");

// get users
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

// get user
const getUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({
            error: true,
            message: "user not found...",
        });
    }

    const user = await UserModle.findOne({
        _id: id,
    });
    if (!user) {
        return res.status(404).send({
            error: true,
            message: "user not found...",
        });
    }

    res.status(200).send({
        success: true,
        data: {
            user,
        },
    });
});

// add users
const addUser = asyncWrapper(async (req, res, next) => {
    const { firstName, lastName, mobile, email } = req.body;

    if (!firstName && !lastName) {
        res.status(422).send({
            error: true,
            message: "bad request",
        });
    }

    const newUser = new UserModle({
        firstName,
        lastName,
        mobile,
        email,
    });
    await newUser.save();

    res.status(201).send({
        success: true,
        message: "create successfully!",
        newUser,
    });
});

const removeUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({
            error: true,
            message: "user not found...",
        });
    }

    await UserModle.findOneAndDelete(id);
    res.status(200).send({
        success: true,
        message: "user has been deleted...",
    });
});

const updateUserPut = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({
            error: true,
            message: "user not found...",
        });
    }

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
    res.status(200).send({
        success: true,
        message: "user updated...",
        data: {
            user,
        },
    });
});

const updateUserPatch = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(404).send({
            error: true,
            message: "user not found...",
        });
    }

    const { n, nModified } = await UserModle.updateOne(
        {
            _id: id,
        },
        {
            ...req.body,
        }
    );

    if (n === 0 || nModified === 0) {
        throw new Error("The update operation encountered an error");
    }

    res.status(200).send({
        success: true,
        message: "user has been updated...",
    });
});

module.exports = {
    usersList,
    addUser,
    getUser,
    removeUser,
    updateUserPut,
    updateUserPatch,
};
