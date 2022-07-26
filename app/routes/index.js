const usersRouter = require("./users");
const authRouter = require("./auth.routes");

module.exports = (app) => {
    app.use("/api/v1/users", usersRouter);
    app.use("/api/v1/auth", authRouter);
};
