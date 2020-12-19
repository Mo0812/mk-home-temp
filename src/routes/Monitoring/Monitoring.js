const express = require("express");
const axios = require("axios");

const monitoringRouter = express.Router();

monitoringRouter.get("/history/cpu", async (req, res) => {
    try {
        let response = await axios({
            method: "GET",
            method: "GET",
            url: "http://" + process.env.MONITORING_URL + ":19999/api/v1/data",
            params: {
                chart: "system.cpu",
                after: "-60",
                format: "json",
                options: "jsonwrap",
            },
        });
        if (response.status == 200) {
            res.send(response.data);
        }
    } catch (e) {}
});

module.exports = monitoringRouter;
