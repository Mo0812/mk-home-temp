const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const ErrorHandler = require("../helpers/ErrorHandler/ErrorHandler");

var app = express(),
    port = process.env.PORT || 8000;

const monitoringRouter = require("../routes/Monitoring/Monitoring");
const loggingRouter = require("../routes/Logging/Logging");
const dhtRouter = require("../routes/DHT/DHT");

app.use(cors());
app.use(bodyParser.json());
app.use("/monitoring", monitoringRouter);
app.use("/logging", loggingRouter);
app.use("/dht", dhtRouter);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "../views"));

app.use((error, req, res, next) => {
    ErrorHandler.handleError(error, res);
});

app.listen(port);
