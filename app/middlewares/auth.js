const { sign, verify, decode } = require("../services/token.service");

module.exports = (req, res, next) => {
    if (!("authorization" in req.headers)) {
        return res.status(401).send({
            stauts: "error",
            code: 401,
            message: "you are not authorized",
        });
    }

    const token = verify(req.headers.authorization);
    if (!token) {
        return res.status(401).send({
            stauts: "error",
            code: 401,
            message: "your token is not valid!",
        });
    }
    next();
};
