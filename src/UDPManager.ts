import * as dgram from "dgram";
import * as buffer from "buffer";
import * as pino from "pino";
import * as networkConstants from "./constants/communication";
import {
  WiZMessage,
  SyncPilotMessage,
  SyncPilotAckMessage,
} from "./constants/types";
import {
  registerDeviceWithLightIp,
  registerAllLamps,
} from "./registrationManager";
import { getLocalMac } from "./ipFunctions";
import sendCommand from "./UDPCommunication";
import { Socket } from "dgram";

const logger = pino();

/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
class UDPManager {
  socket: Socket;
  receivedMsgCallback: (msg: WiZMessage) => void;
  constructor(receivedMsgCallback: (msg: WiZMessage) => void) {
    global.Buffer = global.Buffer || buffer.Buffer;
    this.receivedMsgCallback = receivedMsgCallback;
  }

  /**
   * Creates socket, starts listening on UDP port LIGHT_UDP_BROADCAST_PORT
   * and initiates WiZ device registration procedure
   */
  startListening() {
    const socket = dgram.createSocket("udp4");
    socket.bind(networkConstants.LIGHT_UDP_BROADCAST_PORT);
    socket.on("message", async (msg, rinfo) => {
      const str = String.fromCharCode.apply(null, new Uint8Array(msg));
      const obj = JSON.parse(str);
      logger.info(
        `message received - ${str} with info - ${JSON.stringify(rinfo)}`,
      );

      await this.processMessage(obj, rinfo.address);
    });
    this.socket = socket;
    registerAllLamps();
  }

  /**
   * Stops listening
   */
  stopListening() {
    this.socket.close();
  }

  /**
   * Processes incoming message from WiZ device
   * and either
   * 1. sends registration packet if incoming message is FirstBeat
   * 2. invokes callbacks if incoming message is SyncPilot
   * @param msg Incoming message from the WiZ device
   * @param sourceIp IP of the WiZ device
   */
  async processMessage(msg: WiZMessage, sourceIp: string) {
    if (msg) {
      switch (msg.method) {
        case networkConstants.syncPilotMethod:
          this.sendSyncPilotAcknowledgement(msg, sourceIp);
          msg.timestamp = new Date();
          msg.ip = sourceIp;
          // if lamp is first noticed – need to query API about manufacturing data
          this.receivedMsgCallback(msg);
          break;
        case networkConstants.firstBeatMethod:
          registerDeviceWithLightIp(sourceIp);
          break;
        default:
          break;
      }
    }
  }

  /**
   * Sends acknowledgement about receiving WiZ Message
   * We need to send acknowledgement on receiving every message, this way
   * we let WiZ Device know that we're still interested in receiving status updates
   * @param sourceMsg Source message we need to send acknowledgement for
   * @param sourceIp WiZ device IP
   */
  sendSyncPilotAcknowledgement(sourceMsg: SyncPilotMessage, sourceIp: string) {
    const msg: SyncPilotAckMessage = {
      method: networkConstants.syncPilotMethod,
      id: sourceMsg.id,
      env: sourceMsg.env,
      result: {
        mac: getLocalMac(),
      },
    };
    sendCommand(msg, sourceIp)
      .then(() => {})
      .catch(() => {});
  }
}

export default UDPManager;
