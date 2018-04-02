"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino = require("pino");
const dgram = require("dgram");
const networkConstants = require("./constants/communication");
const logger = pino();
/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 */
function sendCommand(msg, ip) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            logger.info(`sending ${JSON.stringify(msg)} to ip ${ip}`);
            const socket = dgram.createSocket("udp4");
            socket.bind();
            // if there is no response in 1sec => safely close socket, packet is lost
            setTimeout(() => {
                try {
                    socket.close();
                    resolve({
                        type: "error",
                        message: "Timeout"
                    });
                }
                catch (e) { }
            }, 1000);
            socket.once("listening", () => {
                const buf = Buffer.from(JSON.stringify(msg), "utf8");
                socket.send(buf, 0, buf.length, networkConstants.LIGHT_UDP_CONTROL_PORT, ip, err => {
                    if (err)
                        resolve({
                            type: "error",
                            message: JSON.stringify(err)
                        });
                });
            });
            socket.on("error", err => resolve({
                type: "error",
                message: JSON.stringify(err)
            }));
            socket.on("message", incomingMsg => {
                const str = String.fromCharCode.apply(null, new Uint8Array(incomingMsg));
                logger.info(`result of sending ${str}`);
                try {
                    const msgObj = JSON.parse(str);
                    if (msgObj.result && msgObj.result.success === true) {
                        resolve({
                            type: "success"
                        });
                    }
                    else if (msgObj.error) {
                        resolve({
                            type: "error",
                            message: JSON.stringify(msgObj.error)
                        });
                    }
                }
                catch (e) {
                    logger.warn(`Failed to parse message ${str}`);
                    resolve({
                        type: "error",
                        message: `Failed to parse message ${str}`,
                    });
                }
                socket.close();
            });
        });
    });
}
exports.default = sendCommand;
//# sourceMappingURL=UDPCommunication.js.map