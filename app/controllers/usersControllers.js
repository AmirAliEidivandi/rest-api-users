const UserModle = require("../models/UsersModel");

const usersList = async (req, res, next) => {
    let projection = {};
    if (req.query.hasOwnProperty("fields")) {
        projection = req.query.fields.split(",").reduce((tt, cur) => {
            return {
                [cur]: 1,
                ...tt,
            };
        }, {});
    }

    try {
        const findUsers = await UserModle.find({}, projection);
        res.status(200).send(findUsers);
    } catch (error) {
        next(error);
    }
};

const addUser = async (req, res, next) => {
    try {
        const { firstName, lastName, mobile, email } = req.body;

        if (!firstName || !lastName) {
            res.status(422).send({
                error: true,
                message: "firstName and lastName not validation",
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
    } catch (error) {
        next(error);
    }
};

module.exports = {
    usersList,
    addUser,
};
