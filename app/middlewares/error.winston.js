const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true })),
        }),
        new winston.transports.File({ filename: "app/error/error.log", level: "error" }),
    ],
    exceptionHandlers: [new winston.transports.File({ filename: "app/error/exceptions.log" })],
});

module.exports = logger;
