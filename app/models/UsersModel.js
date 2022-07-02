const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        password: { type: String, required: true },
        mobile: {
            type: String,
            required: true,
            maxlength: 12,
        },
        email: { type: String, required: true },
        wallet: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const UserModle = mongoose.model("User", userSchema);

module.exports = UserModle;
