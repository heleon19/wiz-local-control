"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ip = require("ip");
/**
 * Obtains local ip address for the interface.
 * If failed (no interface or it's down) - will get default local ip.
 * Useful when user wants to listen for the bulbs not on the default interface,
 * for example when this package is installed on access point
 * @param interfaceName Interface name, defaults to 'wlan0'
 */
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
/**
 * WiZ Bulbs use MAC Address-like string to store information
 * about registered devices.
 */
const newMac = "XXXXXXXXXXXX".replace(/X/g, () => "0123456789abcdef".charAt(Math.floor(Math.random() * 16)));
function getLocalMac() {
    return newMac;
}
exports.getLocalMac = getLocalMac;
//# sourceMappingURL=ipFunctions.js.map