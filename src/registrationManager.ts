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
export function registerDeviceWithLightIp(lightIp: string) {
  getLocalIPAddress().then(ip => {
    const msg = new RegistrationMessage(ip, getLocalMac());
    const socket = dgram.createSocket("udp4");
    socket.bind();
    // if there is no response in 1sec => safely close socket, packet is lost,
    // UDP delivery is not guaranteed
    setTimeout(() => {
      try {
        socket.close();
      } catch (e) { }
    }, 1000);
    socket.once("listening", () => {
      const buf = Buffer.from(JSON.stringify(msg), "utf8");
      socket.send(
        buf,
        0,
        buf.length,
        networkConstants.LIGHT_UDP_CONTROL_PORT,
        lightIp,
        err => {
          if (err) throw err;
        }
      );
    });
    socket.on("message", incomingMsg => {
      socket.close();
    });
  });
}

/**
 * Sends broadcast registration packet immediately 3 times and once every 15 secs. 
 */
export function registerAllLamps() {
  getLocalIPAddress().then(ip => {
    const msg = new RegistrationMessage(ip, getLocalMac());
    for (let i of Array(3).keys()) {
      sendRegistrationPacket(msg, ip);
    }
    setInterval(() => sendRegistrationPacket(msg, ip), 15000);
  });
}

/**
 * Sends registration packet to the WiZ Bulb
 * @param msg Registration message
 * @param localIp Device local IP address
 */
function sendRegistrationPacket(msg: RegistrationMessage, localIp: string) {
  const socket = dgram.createSocket("udp4");
  socket.bind();
  // if there is no response in 1sec => safely close socket, packet is lost
  setTimeout(() => {
    try {
      socket.close();
    } catch (e) { }
  }, 1000);

  socket.once("listening", () => {
    const buf = Buffer.from(JSON.stringify(msg), "utf8");
    socket.setBroadcast(true);
    socket.send(
      buf,
      0,
      buf.length,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      "255.255.255.255",
      err => {
        if (err) throw err;
      }
    );
  });
  socket.on("message", () => {
    socket.close();
  });
}
