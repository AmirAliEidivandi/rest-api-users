const express = require("express");
const app = express();

require("./boot");
require("./middlewares")(app);
require("./routes")(app);
require("./middlewares/error")(app);
require("./middlewares/expection")(app);

const logger = require("./middlewares/error.winston");
const asyncWrapper = require("./middlewares/async");

module.exports = asyncWrapper((port) => {
    app.listen(port, () => {
        logger.info(`server running on port ${port}`);
    });
});
