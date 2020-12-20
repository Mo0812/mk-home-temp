const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const ErrorHandler = require("../helpers/ErrorHandler/ErrorHandler");

const expressPort = process.env.PORT || 8000;
const showMonitorUI = process.env.SHOW_MONITOR_UI || true;

var app = express(),
    port = expressPort;

const monitoringRouter = require("../routes/Monitoring/Monitoring");
const loggingRouter = require("../routes/Logging/Logging");
const dhtRouter = require("../routes/DHT/DHT");

app.use(cors());
app.use(bodyParser.json());

if (showMonitorUI) app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));
app.get("/", (req, res, next) => {
    res.redirect(301, "/dht/monitor");
});

app.use("/monitoring", monitoringRouter);
app.use("/logging", loggingRouter);
app.use("/dht", dhtRouter);

app.use((error, req, res, next) => {
    ErrorHandler.handleError(error, res);
});

app.listen(port);
