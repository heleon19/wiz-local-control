import * as pino from 'pino';
import * as dgram from "dgram";
import * as networkConstants from "./constants/communication";
import {
  WiZControlMessage,
  Result
} from "./constants/types";

const logger = pino();
export default async function sendCommand(
  msg: WiZControlMessage,
  ip: string
): Promise<Result> {
  return new Promise((resolve: (value: Result) => void) => {
    logger.info(`sending ${JSON.stringify(msg)} to ip ${ip}`);
    const socket = dgram.createSocket("udp4");
    socket.bind();
    // if there is no response in 1sec => safely close socket, packet is lost
    setTimeout(() => {
      try {
        socket.close();
        resolve({
          type: "error",
          message: "Timeout"
        });
      } catch (e) { }
    }, 1000);
    socket.once("listening", () => {
      const buf = Buffer.from(JSON.stringify(msg), "utf8");
      socket.send(
        buf,
        0,
        buf.length,
        networkConstants.LIGHT_UDP_CONTROL_PORT,
        ip,
        err => {
          if (err)
            resolve({
              type: "error",
              message: JSON.stringify(err)
            });
        }
      );
    });
    socket.on("error", err =>
      resolve({
        type: "error",
        message: JSON.stringify(err)
      })
    );
    socket.on("message", incomingMsg => {
      const str = String.fromCharCode.apply(null, new Uint8Array(incomingMsg));
      logger.info(`result of sending ${str}`);
      try {
        const msgObj = JSON.parse(str);
        if (msgObj.result && msgObj.result.success === true) {
          resolve({
            type: "success"
          });
        } else if (msgObj.error) {
          resolve({
            type: "error",
            message: JSON.stringify(msgObj.error)
          });
        }
      } catch (e) {
        logger.warn(`Failed to parse message ${str}`);
        resolve({
          type: "error",
          message: `Failed to parse message ${str}`,
        })
      }
      socket.close();
    });
  });
}