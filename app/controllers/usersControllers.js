const UserModle = require("../models/UsersModel");
const asyncWrapper = require("../middlewares/async");

// get users
const usersList = asyncWrapper(async (req, res) => {
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
const getUser = asyncWrapper(async (req, res) => {
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

// get user stats
const getUserStats = asyncWrapper(async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await UserModle.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 },
            },
        },
    ]);

    res.status(200).json(data);
});

// add users
const addUser = asyncWrapper(async (req, res) => {
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

// delete user
const removeUser = asyncWrapper(async (req, res) => {
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

// update user with put method
const updateUserPut = asyncWrapper(async (req, res) => {
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

// update user with patch method
const updateUserPatch = asyncWrapper(async (req, res) => {
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
    getUserStats
};
