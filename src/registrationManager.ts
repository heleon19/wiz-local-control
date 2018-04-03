import * as dgram from "dgram";
import { RegistrationMessage } from "./constants/types";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import * as networkConstants from "./constants/communication";
import sendCommand from "./UDPCommunication";
/**
 * To let WiZ bulb know that there is a device nearby, that
 * wants to listen for the status update, we need to send so-called
 * registration packet
 * @param lightIp IP address of the WiZ Bulb
 */
export async function registerDevice(
  lightIp: string,
  interfaceName: string,
  udpPort: number,
  broadcast: boolean = false,
  socket: dgram.Socket = dgram.createSocket("udp4"),
) {
  const ip = await getLocalIPAddress(interfaceName);
  const msg = new RegistrationMessage(ip, getLocalMac());

  return sendCommand(msg, lightIp, udpPort, broadcast, socket);
}

/**
 * Sends broadcast registration packet immediately 3 times and once every 15 secs.
 */
export async function registerAllLights(
  interfaceName: string,
  udpPort: number,
): Promise<NodeJS.Timer> {
  const ip = await getLocalIPAddress(interfaceName);
  const msg = new RegistrationMessage(ip, getLocalMac());
  for (const i of Array(3).keys()) {
    await registerDevice("255.255.255.255", interfaceName, udpPort, true);
  }
  return setInterval(
    () => registerDevice("255.255.255.255", interfaceName, udpPort, true),
    15000,
  );
}
