const events = require("events");
const { emitter: sensorEmitter } = require("./Sensor");
const db = require("../../system/Database/DBLite");
const logger = require("../../system/Logger/Logger");

const protocolEnabled = parseInt(process.env.SENSOR_PROTOCOL_ENABLED) == 1;
var lastValidData = null;

var protocolEmitter = new events.EventEmitter();

const _initDatabase = () => {
    db.query(
        "CREATE TABLE IF NOT EXISTS `sensor_protocol` (  `id` INTEGER PRIMARY KEY AUTOINCREMENT, `temperature` REAL, `humidity` REAL, `protocolTime` INTEGER);",
        (err, _) => {
            if (err) {
                logger.log(
                    "error",
                    "Error on creating sensor protocol table: " + err
                );
            }
        }
    );
};

const _formatData = (data, options) => {
    if (options.hr) {
        const dateObj = new Date(parseInt(data.protocolTime));
        data.protocolTime =
            dateObj.toLocaleDateString("de-DE") +
            " " +
            dateObj.toLocaleTimeString("de-DE");
    }
    return data;
};

const protocolSensorData = () => {
    if (protocolEnabled) {
        sensorEmitter.on("dht-sensor-update", (data) => {
            if (data && data.valid) {
                const currentData = {
                    temperature: data.temperature,
                    humidity: data.humidity,
                    protocolTime: new Date().getTime(),
                };
                db.query(
                    `INSERT INTO sensor_protocol  (temperature, humidity, protocolTime) VALUES (?, ?, ?);`,
                    [
                        currentData.temperature,
                        currentData.humidity,
                        currentData.protocolTime,
                    ],
                    (err) => {
                        if (err) {
                            logger.log(
                                "error",
                                "Error on inserting data: " + err
                            );
                        }
                    }
                );
                protocolEmitter.emit("dht-protocol-update", currentData);
                lastValidData = currentData;
            }
        });
    }
};

const getAll = (timestampLimit = null) => {
    timestampLimit = timestampLimit || 0;
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM sensor_protocol WHERE protocolTime >= (? * 1000);",
            [timestampLimit],
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            }
        );
    });
};

const getCurrent = (options = {}) => {
    return new Promise((resolve, reject) => {
        var data = null;
        if (protocolEnabled && lastValidData) {
            data = lastValidData;
        } else {
            db.query(
                `SELECT * FROM sensor_protocol ORDER BY protocolTime DESC LIMIT 1;`,
                (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    data = rows[0];
                }
            );
        }
        resolve(_formatData(data, options));
    });
};

_initDatabase();

module.exports = {
    emitter: protocolEmitter,
    protocolSensorData,
    getAll,
    getCurrent,
};
