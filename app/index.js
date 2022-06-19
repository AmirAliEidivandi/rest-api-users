const express = require("express");
const app = express();

require("./boot");
require("./middlewares")(app);
require("./routes")(app);
require("./middlewares/error")(app);
require("./middlewares/expection")(app);

module.exports = (port) => {
    app.listen(port, () => {
        console.log(`server running on port ${port}`);
    });
};
