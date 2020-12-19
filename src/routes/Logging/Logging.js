const express = require("express");
const Logging = require("../../controller/Logging/Logging");
const ApiError = require("../../helpers/Errors/ApiError");

const loggingRouter = express.Router();

loggingRouter.get("/app", async (req, res) => {
    try {
        const appLog = await Logging.loadAppLog();
        res.send(appLog);
    } catch (error) {
        next(new ApiError(500, error));
    }
});

loggingRouter.get("/error", async (req, res, next) => {
    try {
        const errorLog = await Logging.loadErrorLog();
        res.send(errorLog);
    } catch (error) {
        next(new ApiError(500, error));
    }
});

module.exports = loggingRouter;
