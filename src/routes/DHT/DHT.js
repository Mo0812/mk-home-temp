const express = require("express");
const protocol = require("../../controller/DHT/Protocol");
const ApiError = require("../../helpers/Errors/ApiError");

const dhtRouter = express.Router();

dhtRouter.get("/current", async (req, res) => {
    try {
        const data = await protocol.getCurrent();
        res.send(data);
    } catch (error) {
        next(new ApiError(500, error));
    }
});

dhtRouter.get("/all", async (req, res, next) => {
    try {
        const data = await protocol.getAll();
        res.send(data);
    } catch (error) {
        next(new ApiError(500, error));
    }
});

dhtRouter.get("/", async (req, res, next) => {
    const data = await protocol.getCurrent({ hr: true });
    res.render("dht", {
        data,
    });
});

module.exports = dhtRouter;
