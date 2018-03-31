// @flow

import * as dgram from "dgram";
import { RegistrationMessage } from "./constants/types";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import * as networkConstants from "./constants/communication";


export function registerPhoneWithLightIp(lightIp: string) {
  getLocalIPAddress().then(ip => {
    const msg = new RegistrationMessage(ip, getLocalMac());
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

export function registerAllLamps() {
  getLocalIPAddress().then(ip => {
    const msg = new RegistrationMessage(ip, getLocalMac());
    for (let i of Array(3).keys()) {
      sendRegistrationPacket(msg, ip);
    }
    setInterval(() => sendRegistrationPacket(msg, ip), 15000);
  });
}

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
