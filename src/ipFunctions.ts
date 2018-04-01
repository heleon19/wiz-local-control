import * as ip from "ip";

export function getLocalIPAddress(interfaceName: string = "wlan0"): Promise<string> {
  return new Promise(resolve => {
    let ipaddr;
    try {
      ipaddr = ip.address(interfaceName);
    } catch (e) {
      ipaddr = ip.address();
    }
    resolve(ipaddr);
  });
}
const newMac = "XXXXXXXXXXXX".replace(/X/g, () =>
  "0123456789abcdef".charAt(Math.floor(Math.random() * 16))
);

export function getLocalMac(): string {
  return newMac;
}
