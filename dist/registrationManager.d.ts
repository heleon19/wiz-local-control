/// <reference types="node" />
export default class RegistrationManager {
    /**
     * To let WiZ bulb know that there is a device nearby, that
     * wants to listen for the status update, we need to send so-called
     * registration packet
     * @param lightIp IP address of the WiZ Bulb
     * @param interfaceName interface name
     * @param udpPort udp port for ssending message
     * @param broadcast true/false broadcasting
     */
    registerDevice(lightIp: string, interfaceName: string, udpPort: number, broadcast?: boolean): Promise<import("./classes/types").Result<import("./classes/types").WiZMessageResponse>>;
    /**
     * Sends broadcast registration packet immediately 3 times and once every 15 secs.
     */
    registerAllLights(interfaceName: string, udpPort: number): Promise<NodeJS.Timer>;
}
