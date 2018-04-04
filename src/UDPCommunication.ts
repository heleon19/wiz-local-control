import * as pino from "pino";
import * as dgram from "dgram";
import * as networkConstants from "./constants/communication";
import { WiZControlMessage, Result } from "./constants/types";

const logger = pino();

/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 */
export default async function sendCommand(
  msg: WiZControlMessage,
  ip: string,
  udpPort: number,
  broadcast: boolean = false,
  socket: dgram.Socket = dgram.createSocket("udp4"),
): Promise<Result> {
  return new Promise(async (resolve: (value: Result) => void) => {
    logger.info(`sending ${JSON.stringify(msg)} to ip ${ip}`);
    try {
      await socket.bind();
    } catch (e) {
      resolve({
        type: "error",
        message: `Error when binding socket - ${e}`,
      });
    }
    // if there is no response in 1sec => safely close socket, packet is lost
    setTimeout(async () => {
      try {
        await socket.close();
        resolve({
          type: "error",
          message: "Timeout",
        });
      } catch (e) {}
    }, 1000);
    socket.once("listening", () => {
      const buf = Buffer.from(JSON.stringify(msg), "utf8");
      socket.setBroadcast(broadcast);
      socket.send(buf, 0, buf.length, udpPort, ip, err => {
        if (err)
          resolve({
            type: "error",
            message: JSON.stringify(err),
          });
      });
    });
    socket.on("error", err =>
      resolve({
        type: "error",
        message: JSON.stringify(err),
      }),
    );
    socket.on("message", async incomingMsg => {
      const str = String.fromCharCode.apply(
        undefined,
        new Uint8Array(incomingMsg),
      );
      logger.info(`result of sending ${str}`);
      try {
        const msgObj = JSON.parse(str);
        if (msgObj.result && msgObj.result.success === true) {
          resolve({
            type: "success",
          });
        } else if (msgObj.error) {
          resolve({
            type: "error",
            message: JSON.stringify(msgObj.error),
          });
        } else {
          resolve({
            type: "error",
            message: "Malformed response",
          });
        }
      } catch (e) {
        logger.warn(`Failed to parse message ${str}`);
        resolve({
          type: "error",
          message: `Failed to parse message ${str}`,
        });
      }
      await socket.close();
    });
  });
}
