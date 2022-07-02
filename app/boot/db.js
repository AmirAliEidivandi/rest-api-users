const mongoose = require("mongoose");
const logger = require("../middlewares/error.winston");

const connectionDB = async (url) => {
    await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => logger.info("connected to db"))
        .catch((err) => logger.error(err));
};

module.exports = connectionDB;
