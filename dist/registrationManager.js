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
const dgram = require("dgram");
const types_1 = require("./constants/types");
const ipFunctions_1 = require("./ipFunctions");
const UDPCommunication_1 = require("./UDPCommunication");
class RegistrationManager {
    /**
     * To let WiZ bulb know that there is a device nearby, that
     * wants to listen for the status update, we need to send so-called
     * registration packet
     * @param lightIp IP address of the WiZ Bulb
     */
    registerDevice(lightIp, interfaceName, udpPort, broadcast = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const ip = yield ipFunctions_1.getLocalIPAddress(interfaceName);
            const msg = new types_1.RegistrationMessage(ip, ipFunctions_1.getLocalMac());
            const socket = dgram.createSocket("udp4");
            return yield UDPCommunication_1.default(msg, lightIp, udpPort, broadcast, socket);
        });
    }
    /**
     * Sends broadcast registration packet immediately 3 times and once every 15 secs.
     */
    registerAllLights(interfaceName, udpPort) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const i of Array(3).keys()) {
                yield this.registerDevice("255.255.255.255", interfaceName, udpPort, true);
            }
            return setInterval(() => this.registerDevice("255.255.255.255", interfaceName, udpPort, true), 15000);
        });
    }
}
exports.default = RegistrationManager;
//# sourceMappingURL=registrationManager.js.map