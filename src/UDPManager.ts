import * as dgram from "dgram";
import * as buffer from "buffer";
import * as pino from "pino";
import * as networkConstants from "./constants/communication";
import {
  WiZMessage,
  SyncPilotMessage,
  SyncPilotAckMessage
} from "./constants/types";
import {
  registerPhoneWithLightIp,
  registerAllLamps
} from "./registrationManager";
import {
  getLocalMac
} from "./ipFunctions";
import sendCommand from "./UDPCommunication";
import { Socket } from "dgram";

const logger = pino();

class UDPManager {
  socket: Socket;
  receivedMsgCallback: (msg: WiZMessage) => void
  constructor(receivedMsgCallback: (msg: WiZMessage) => void) {
    global.Buffer = global.Buffer || buffer.Buffer;
    this.receivedMsgCallback = receivedMsgCallback;
  }

  startListening() {
    const socket = dgram.createSocket("udp4");
    socket.bind(networkConstants.LIGHT_UDP_BROADCAST_PORT);
    socket.on("message", async (msg, rinfo) => {
      const str = String.fromCharCode.apply(null, new Uint8Array(msg));
      const obj = JSON.parse(str);
      logger.info(
        `message received - ${str} with info - ${JSON.stringify(rinfo)}`
      );

      await this.processMessage(obj, rinfo.address);
    });
    this.socket = socket;
    registerAllLamps();
  }

  stopListening() {
    this.socket.close();
  }

  async processMessage(msg: WiZMessage, sourceIp: string) {
    if (msg) {
      switch (msg.method) {
        case networkConstants.syncPilotMethod:
          UDPManager.sendSyncPilotAcknowledgement(msg, sourceIp);
          msg.timestamp = new Date();
          msg.ip = sourceIp;
          // if lamp is first noticed – need to query API about manufacturing data
          this.receivedMsgCallback(msg)
          break;
        case networkConstants.firstBeatMethod:
          registerPhoneWithLightIp(sourceIp);
          break;
        default:
          break;
      }
    }
  }

  static sendSyncPilotAcknowledgement(
    sourceMsg: SyncPilotMessage,
    sourceIp: string
  ) {
    const msg: SyncPilotAckMessage = {
      method: networkConstants.syncPilotMethod,
      id: sourceMsg.id,
      env: sourceMsg.env,
      result: {
        mac: getLocalMac()
      }
    };
    sendCommand(msg, sourceIp).then(() => { }).catch(() => { });
  }
}

export default UDPManager;