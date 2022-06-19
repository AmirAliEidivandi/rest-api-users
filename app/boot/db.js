const mongoose = require("mongoose");
const { MONGO_DB, MONGO_HOST, MONGO_PORT } = process.env;

mongoose.connection.on("error", (error) => {
    console.log("mongodb connected failed!", error.message);
});

const connectionDB = () => {
    mongoose
        .connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("connected to db"))
        .catch((err) => console.log(err));
};

module.exports = connectionDB;
