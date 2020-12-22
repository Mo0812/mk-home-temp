var express = require("express");
const WebSocket = require("ws");
const { emitter: protocolEmitter } = require("./Protocol");
const wsApp = express();

let wsServer;
const wsPort = process.env.WS_PORT || 4000;

const connectSocket = () => {
    wsServer = new WebSocket.Server({ server: wsApp.listen(wsPort) });
    wsServer.on("connection", (socket) => {
        socket.on("message", (message) => {
            console.log(`received from a client: ${message}`);
        });
        socket.send("MKHT: Connected to MKHT WS server");

        protocolEmitter.on("dht-protocol-update", () => {
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
