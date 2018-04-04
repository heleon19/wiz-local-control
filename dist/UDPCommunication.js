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
const logger = pino();
/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 */
function sendCommand(msg, ip, udpPort, broadcast = false, socket = dgram.createSocket("udp4")) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            logger.info(`sending ${JSON.stringify(msg)} to ip ${ip}`);
            try {
                yield socket.bind();
            }
            catch (e) {
                resolve({
                    type: "error",
                    message: `Error when binding socket - ${e}`,
                });
            }
            // if there is no response in 1sec => safely close socket, packet is lost
            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield socket.close();
                    resolve({
                        type: "error",
                        message: "Timeout",
                    });
                }
                catch (e) { }
            }), 1000);
            socket.once("listening", () => {
                const buf = Buffer.from(JSON.stringify(msg), "utf8");
                socket.setBroadcast(broadcast);
                socket.send(buf, 0, buf.length, udpPort, ip, err => {
                    if (err)
                        resolve({
                            type: "error",
                            message: JSON.stringify(err),
                        });
                });
            });
            socket.on("error", err => resolve({
                type: "error",
                message: JSON.stringify(err),
            }));
            socket.on("message", (incomingMsg) => __awaiter(this, void 0, void 0, function* () {
                const str = String.fromCharCode.apply(undefined, new Uint8Array(incomingMsg));
                logger.info(`result of sending ${str}`);
                try {
                    const msgObj = JSON.parse(str);
                    if (msgObj.result && msgObj.result.success === true) {
                        resolve({
                            type: "success",
                        });
                    }
                    else if (msgObj.error) {
                        resolve({
                            type: "error",
                            message: JSON.stringify(msgObj.error),
                        });
                    }
                    else {
                        resolve({
                            type: "error",
                            message: "Malformed response",
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
                yield socket.close();
            }));
        }));
    });
}
exports.default = sendCommand;
//# sourceMappingURL=UDPCommunication.js.map