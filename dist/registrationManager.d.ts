/**
 * To let WiZ bulb know that there is a device nearby, that
 * wants to listen for the status update, we need to send so-called
 * registration packet
 * @param lightIp IP address of the WiZ Bulb
 */
export declare function registerDeviceWithLightIp(lightIp: string): void;
/**
 * Sends broadcast registration packet immediately 3 times and once every 15 secs.
 */
export declare function registerAllLights(): void;
