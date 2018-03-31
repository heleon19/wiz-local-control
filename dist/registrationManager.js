"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const types_1 = require("./constants/types");
const ipFunctions_1 = require("./ipFunctions");
const networkConstants = require("./constants/communication");
function registerPhoneWithLightIp(lightIp) {
    ipFunctions_1.getLocalIPAddress().then(ip => {
        const msg = new types_1.RegistrationMessage(ip, ipFunctions_1.getLocalMac());
        const socket = dgram.createSocket("udp4");
        socket.bind();
        // if there is no response in 1sec => safely close socket, packet is lost
        setTimeout(() => {
            try {
                socket.close();
            }
            catch (e) { }
        }, 1000);
        socket.once("listening", () => {
            const buf = Buffer.from(JSON.stringify(msg), "utf8");
            socket.send(buf, 0, buf.length, networkConstants.LIGHT_UDP_CONTROL_PORT, lightIp, err => {
                if (err)
                    throw err;
            });
        });
        socket.on("message", incomingMsg => {
            socket.close();
        });
    });
}
exports.registerPhoneWithLightIp = registerPhoneWithLightIp;
function registerAllLamps() {
    ipFunctions_1.getLocalIPAddress().then(ip => {
        const msg = new types_1.RegistrationMessage(ip, ipFunctions_1.getLocalMac());
        for (let i of Array(3).keys()) {
            sendRegistrationPacket(msg, ip);
        }
        setInterval(() => sendRegistrationPacket(msg, ip), 15000);
    });
}
exports.registerAllLamps = registerAllLamps;
function sendRegistrationPacket(msg, localIp) {
    const socket = dgram.createSocket("udp4");
    socket.bind();
    // if there is no response in 1sec => safely close socket, packet is lost
    setTimeout(() => {
        try {
            socket.close();
        }
        catch (e) { }
    }, 1000);
    socket.once("listening", () => {
        const buf = Buffer.from(JSON.stringify(msg), "utf8");
        socket.setBroadcast(true);
        socket.send(buf, 0, buf.length, networkConstants.LIGHT_UDP_CONTROL_PORT, "255.255.255.255", err => {
            if (err)
                throw err;
        });
    });
    socket.on("message", () => {
        socket.close();
    });
}
//# sourceMappingURL=registrationManager.js.map