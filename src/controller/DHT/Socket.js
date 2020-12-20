var express = require("express");
const WebSocket = require("ws");
const { emitter: sensorEmitter } = require("./Sensor");
const wsApp = express();

let wsServer;

const connectSocket = () => {
    wsServer = new WebSocket.Server({ server: wsApp.listen(4000) });
    wsServer.on("connection", (socket) => {
        socket.on("message", (message) => {
            console.log(`received from a client: ${message}`);
        });
        socket.send("connected to ws server");

        sensorEmitter.on("dht-protocol-update", () => {
            socket.send("dht-protocol-update");
        });
    });
    return wsServer;
};

const getInstance = () => {
    return wsServer;
};

module.exports = {
    connectSocket,
    getInstance: getInstance,
};
