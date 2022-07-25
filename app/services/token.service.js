const jwt = require("jsonwebtoken");

const sign = (data) => {
    return jwt.sign(data, process.env.APP_SECRET);
};

const verify = (token) => {
    try {
        const payload = jwt.verify(token, process.env.APP_SECRET);
        return payload;
    } catch (error) {
        return false;
    }
};

const decode = (token) => {
    return jwt.decode(token, process.env.APP_SECRET);
};

module.exports = {
    sign,
    verify,
    decode,
};
