/**
 * Obtains local ip address for the interface.
 * If failed (no interface or it's down) - will get default local ip.
 * Useful when user wants to listen for the bulbs not on the default interface,
 * for example when this package is installed on access point
 * @param interfaceName Interface name, defaults to 'wlan0'
 */
export declare function getLocalIPAddress(interfaceName: string): Promise<string>;
export declare function getLocalMac(): string;
