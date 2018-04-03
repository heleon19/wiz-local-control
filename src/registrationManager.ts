import * as dgram from "dgram";
import { RegistrationMessage } from "./constants/types";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import * as networkConstants from "./constants/communication";

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
  callback: (err: Error | null) => void = err => {
    if (err) {
      throw err;
    }
  },
  socket: dgram.Socket = dgram.createSocket("udp4"),
) {
  const ip = await getLocalIPAddress(interfaceName);
  const msg = new RegistrationMessage(ip, getLocalMac());
  await socket.bind();
  // if there is no response in 1sec => safely close socket, packet is lost,
  // UDP delivery is not guaranteed
  setTimeout(async () => {
    try {
      await socket.close();
    } catch (e) {}
  }, 1000);
  socket.once("listening", () => {
    const buf = Buffer.from(JSON.stringify(msg), "utf8");
    socket.setBroadcast(broadcast);
    socket.send(buf, 0, buf.length, udpPort, lightIp, callback);
  });
  socket.on("message", incomingMsg => {
    socket.close();
  });
}

/**
 * Sends broadcast registration packet immediately 3 times and once every 15 secs.
 */
export async function registerAllLights(
  interfaceName: string,
  udpPort: number,
  callback?: (err: Error | null) => void,
): Promise<NodeJS.Timer> {
  const ip = await getLocalIPAddress(interfaceName);
  const msg = new RegistrationMessage(ip, getLocalMac());
  for (const i of Array(3).keys()) {
    await registerDevice(
      "255.255.255.255",
      interfaceName,
      udpPort,
      true,
      callback,
    );
  }
  return setInterval(
    () =>
      registerDevice("255.255.255.255", interfaceName, udpPort, true, callback),
    15000,
  );
}
