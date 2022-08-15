require("dotenv").config();
const bootApplication = require("./app/index");

const PORT = process.env.PORT || 8080;
bootApplication(PORT);
