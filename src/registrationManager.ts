import * as dgram from "dgram";
import { RegistrationMessage } from "./constants/types";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import sendCommand from "./UDPCommunication";

export default class RegistrationManager {
  /**
   * To let WiZ bulb know that there is a device nearby, that
   * wants to listen for the status update, we need to send so-called
   * registration packet
   * @param lightIp IP address of the WiZ Bulb
   */
  async registerDevice(
    lightIp: string,
    interfaceName: string,
    udpPort: number,
    broadcast: boolean = false,
  ) {
    const ip = await getLocalIPAddress(interfaceName);
    const msg = new RegistrationMessage(ip, getLocalMac());
    const socket = dgram.createSocket("udp4");

    return await sendCommand(msg, lightIp, ip, udpPort, broadcast, socket);
  }

  /**
   * Sends broadcast registration packet immediately 3 times and once every 15 secs.
   */
  async registerAllLights(
    interfaceName: string,
    udpPort: number,
  ): Promise<NodeJS.Timer> {
    for (const i of Array(3).keys()) {
      await this.registerDevice(
        "255.255.255.255",
        interfaceName,
        udpPort,
        true,
      );
    }
    return setInterval(
      () =>
        this.registerDevice("255.255.255.255", interfaceName, udpPort, true),
      15000,
    );
  }
}
