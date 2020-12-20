const events = require("events");
const sensor = require("node-dht-sensor");
const logger = require("../../system/Logger/Logger");

var dhtSensorEmitter = new events.EventEmitter();
var dataInterval = null;

var sensorType = process.env.SENSOR_TYPE || 22;
var sensorPin = process.env.SENSOR_PIN || 22;
var sensorInterval = process.env.SENSOR_INTERVAL || 1000;

const readData = () => {
    try {
        var data = {
            temperature: -1,
            humidity: -1,
            valid: false,
        };
        if (process.env.NODE_ENV == "production") {
            const readout = sensor.read(sensorType, sensorPin);
            data = {
                temperature: readout.temperature.toFixed(2),
                humidity: readout.humidity.toFixed(2),
                valid: readout.isValid,
            };
        }
        dhtSensorEmitter.emit("dht-sensor-update", data);
        return data;
    } catch (err) {
        logger.log("error", "Sensor readout failed: " + err.message);
        throw err;
    }
};

const startReading = () => {
    stopReading();
    logger.log("info", "Start reading sensor data");
    dataInterval = setInterval(readData, sensorInterval);
};

const stopReading = () => {
    logger.log("info", "Stop reading sensor data");
    clearInterval(dataInterval);
    dataInterval = null;
};

const restartReading = () => {
    stopReading();
    startReading();
};

module.exports = {
    emitter: dhtSensorEmitter,
    startReading,
    stopReading,
    restartReading,
};
