var express = require("express");
const WebSocket = require("ws");
// const { emitter: tradfriEmitter } = require("../../controller/Tradfri/Tradfri");
const wsApp = express();

let wsServer;

const connect = () => {
    wsServer = new WebSocket.Server({ server: wsApp.listen(4000) });
    wsServer.on("connection", (socket) => {
        socket.on("message", (message) => {
            console.log(`received from a client: ${message}`);
        });
        socket.send("connected to ws server");

        /*tradfriEmitter.on("tradfri-device-update", () => {
            socket.send("tradfri-device-update");
        });
        tradfriEmitter.on("tradfri-group-update", () => {
            socket.send("tradfri-group-update");
        });*/
    });
    return wsServer;
};

const getInstance = () => {
    return wsServer;
};

module.exports = {
    connect: connect,
    getInstance: getInstance,
};
