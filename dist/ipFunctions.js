"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
const ip = require("ip");
function getLocalIPAddress(interfaceName = "wlan0") {
    return new Promise(resolve => {
        let ipaddr;
        try {
            ipaddr = ip.address(interfaceName);
        }
        catch (e) {
            ipaddr = ip.address();
        }
        resolve(ipaddr);
    });
}
exports.getLocalIPAddress = getLocalIPAddress;
const newMac = "XXXXXXXXXXXX".replace(/X/g, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16)));
function getLocalMac() {
    return newMac;
}
exports.getLocalMac = getLocalMac;
//# sourceMappingURL=ipFunctions.js.map