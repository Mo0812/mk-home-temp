const events = require("events");
const { emitter: sensorEmitter } = require("./Sensor");
const db = require("../../system/Database/SqliteDatabase");
const logger = require("../../system/Logger/Logger");

const protocolEnabled = process.env.SENSOR_PROTOCOL_ENABLED || true;

var protocolEmitter = new events.EventEmitter();

const _initDatabase = () => {
    db.run(
        "CREATE TABLE IF NOT EXISTS `sensor_protocol` (  `id` INTEGER PRIMARY KEY AUTOINCREMENT, `temperature` REAL, `humidity` REAL, `protocolTime` INTEGER);"
    );
};

const protocolSensorData = () => {
    if (protocolEnabled) {
        sensorEmitter.on("dht-sensor-update", (data) => {
            if (data.valid) {
                db.run(
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
        db.all("SELECT * FROM sensor_protocol;", (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
};

const getCurrent = () => {
    return new Promise((resolve, reject) => {
        db.get(
            `SELECT * FROM sensor_protocol ORDER BY protocolTime DESC LIMIT 1;`,
            (err, row) => {
                if (err) {
                    reject(err);
                }
                resolve(row);
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
