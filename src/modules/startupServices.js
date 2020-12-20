const dhtSensor = require("../controller/DHT/Sensor");
const dhtProtocol = require("../controller/DHT/Protocol");
const dhtSocket = require("../controller/DHT/Socket");

dhtSensor.startReading();
dhtProtocol.protocolSensorData();
dhtSocket.connectSocket();
