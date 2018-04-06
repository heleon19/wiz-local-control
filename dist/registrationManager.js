"use strict";
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
    async registerDevice(lightIp, interfaceName, udpPort, broadcast = false) {
        const ip = await ipFunctions_1.getLocalIPAddress(interfaceName);
        const msg = new types_1.RegistrationMessage(ip, ipFunctions_1.getLocalMac());
        const socket = dgram.createSocket("udp4");
        return await UDPCommunication_1.default(msg, lightIp, ip, udpPort, broadcast, socket);
    }
    /**
     * Sends broadcast registration packet immediately 3 times and once every 15 secs.
     */
    async registerAllLights(interfaceName, udpPort) {
        for (const i of Array(3).keys()) {
            await this.registerDevice("255.255.255.255", interfaceName, udpPort, true);
        }
        return setInterval(() => this.registerDevice("255.255.255.255", interfaceName, udpPort, true), 15000);
    }
}
exports.default = RegistrationManager;
//# sourceMappingURL=registrationManager.js.map