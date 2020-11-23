"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var net_1 = __importDefault(require("net"));
var server = net_1.default.createServer(function (socket) {
    console.log("new connection!");
    socket.setEncoding("utf-8");
    socket.on("close", function (e) {
        console.log("connection closed!");
    });
    socket.on("data", function (data) {
        console.log("received data: " + data);
        socket.write("you said: " + data);
    });
});
server.on("error", function (e) {
    if (e.code === "EADDRINUSE") {
        console.log("Address in use, retrying...");
        console.log(e.address);
        server.close();
    }
});
server.on("close", function () {
    console.log("server closed!");
});
var adOptions = {};
// adOptions.host = "0.0.0.0";
// adOptions.port = 9009;
adOptions.path = "/tmp/echo.sock";
server.listen(adOptions, function () {
    console.log("server listening ...");
});
