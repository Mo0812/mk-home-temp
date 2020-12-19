const winston = require("winston");
const loggerConfig = require("./LoggerConfig");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

if (loggerConfig.logConsole) {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
            level: "error",
        })
    );
}
if (true || process.env.NODE_ENV == "production") {
    logger.add(
        new winston.transports.File({
            filename: loggerConfig.errorLogPath,
            level: "error",
        })
    );
    logger.add(
        new winston.transports.File({
            filename: loggerConfig.appLogPath,
        })
    );
}

module.exports = logger;
