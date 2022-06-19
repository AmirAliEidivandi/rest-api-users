require("dotenv").config();
const bootApplication = require("./app/index");

bootApplication(process.env.APP_PORT);
