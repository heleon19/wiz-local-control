"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipFunctions_1 = require("./ipFunctions");
const UDPCommunication_1 = require("./UDPCommunication");
const Control_1 = require("./classes/Control");
class RegistrationManager {
    /**
     * To let WiZ bulb know that there is a device nearby, that
     * wants to listen for the status update, we need to send so-called
     * registration packet
     * @param lightIp IP address of the WiZ Bulb
     * @param interfaceName interface name
     * @param udpPort udp port for ssending message
     * @param broadcast true/false broadcasting
     */
    async registerDevice(lightIp, interfaceName, udpPort, broadcast = false) {
        const ip = await (0, ipFunctions_1.getLocalIPAddress)(interfaceName);
        const msg = new Control_1.RegistrationMessage(ip, (0, ipFunctions_1.getLocalMac)());
        return await (0, UDPCommunication_1.default)(msg, lightIp, ip, udpPort, broadcast);
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