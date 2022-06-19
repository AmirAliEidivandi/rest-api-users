const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        required: true,
        maxlength: 12
    },
    email: String,
    wallet: { type: Number, default: 0 },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

const UserModle = mongoose.model("User", userSchema);

module.exports = UserModle;
