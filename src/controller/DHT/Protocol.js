const events = require("events");
const { emitter: sensorEmitter } = require("./Sensor");
const db = require("../../system/Database/DBLite");
const logger = require("../../system/Logger/Logger");

const protocolEnabled = process.env.SENSOR_PROTOCOL_ENABLED || true;

var protocolEmitter = new events.EventEmitter();

const _initDatabase = () => {
    db.query(
        "CREATE TABLE IF NOT EXISTS `sensor_protocol` (  `id` INTEGER PRIMARY KEY AUTOINCREMENT, `temperature` REAL, `humidity` REAL, `protocolTime` INTEGER);",
        (err, _) => {
            if (err) {
                logger.log("error", err);
            }
        }
    );
};

const protocolSensorData = () => {
    if (protocolEnabled) {
        sensorEmitter.on("dht-sensor-update", (data) => {
            console.log(data);
            if (data.valid) {
                db.query(
                    `INSERT INTO sensor_protocol  (temperature, humidity, protocolTime) VALUES (?, ?, ?);`,
                    [data.temperature, data.humidity, new Date().getTime()],
                    (err) => {
                        logger.log("error", err);
                    }
                );
                protocolEmitter.emit("dht-protocol-update", data);
            }
        });
    }
};

const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM sensor_protocol;", (err, rows) => {
            if (err) {
                reject(err);
            }
            console.log(rows);
            resolve(rows);
        });
    });
};

const getCurrent = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM sensor_protocol ORDER BY protocolTime DESC LIMIT 1;`,
            (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows[0]);
            }
        );
    });
};

_initDatabase();

module.exports = {
    emitter: protocolEmitter,
    protocolSensorData,
    getAll,
    getCurrent,
};
