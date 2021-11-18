import pino from "pino";
import * as dgram from "dgram";
import * as buffer from "buffer";
import * as networkConstants from "./constants";
import RegistrationManager from "./registrationManager";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import sendCommand from "./UDPCommunication";
import { Result, WiZControlMessage, WiZMessage, WiZMessageResponse } from "./classes/types";
import { SyncPilotAckMessage, SyncPilotMessage } from "./classes/Pilot";


const logger = pino();

/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
class UDPManager {
  socket: dgram.Socket;
  interfaceName: string;
  registerLightsTimer: NodeJS.Timer | undefined;
  broadcastUDPPort: number;
  controlUDPPort: number;
  registrationManager: RegistrationManager;
  receivedMsgCallback: (msg: WiZMessage, sourceIp: string) => void;

  constructor(
    receivedMsgCallback: (msg: WiZMessage, sourceIp: string) => void,
    interfaceName: string,
    broadcastUDPPort: number = networkConstants.DEVICE_UDP_LISTEN_PORT,
    controlUDPPort: number = networkConstants.LIGHT_UDP_CONTROL_PORT,
    registrationManager: RegistrationManager = new RegistrationManager(),
  ) {
    this.createSocket()
      .then(() => {});
    this.interfaceName = interfaceName;
    global.Buffer = global.Buffer || buffer.Buffer;
    this.receivedMsgCallback = receivedMsgCallback;
    this.broadcastUDPPort = broadcastUDPPort;
    this.controlUDPPort = controlUDPPort;
    this.registrationManager = registrationManager;
  }

  async createSocket() {
    this.socket = await dgram.createSocket("udp4");
  }

  /**
   * Creates socket, starts listening on UDP port DEVICE_UDP_LISTEN_PORT
   * and initiates WiZ device registration procedure
   */
  async startListening() {
    await this.stopListening();
    await this.socket.bind(this.broadcastUDPPort);
    this.socket.on("message", async (msg, rinfo) => {
      try {
        const str = String.fromCharCode.apply(null, new Uint8Array(msg));
        const obj = JSON.parse(str);
        logger.info(`message received - ${str} with info - ${JSON.stringify(rinfo)}`);
        await this.processMessage(obj, rinfo.address);
      } catch (e) {
        logger.warn(`Cannot process the received message because of ${e}`);
      }
    });
    this.registerLightsTimer = await this.registrationManager.registerAllLights(
      this.interfaceName,
      this.controlUDPPort,
    );
  }

  /**
   * Stops listening
   */
  async stopListening() {
    if (this.registerLightsTimer != undefined) {
      clearInterval(this.registerLightsTimer);
      this.registerLightsTimer = undefined;
    }
    if (this.socket != undefined) {
      try {
        await this.socket.close();
      } catch (e) {
      }
      await this.createSocket();
    }
    return;
  }

  async sendUDPCommand<T extends WiZMessageResponse>(
    msg: WiZControlMessage,
    ip: string,
  ): Promise<Result<T>> {
    const localIp = await getLocalIPAddress(this.interfaceName);
    return await sendCommand<T>(msg, ip, localIp);
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
          await this.sendSyncPilotAcknowledgement(msg, sourceIp);
          msg.timestamp = new Date();
          msg.ip = sourceIp;
          break;
        case networkConstants.firstBeatMethod:
          await this.registrationManager.registerDevice(
            sourceIp,
            this.interfaceName,
            this.controlUDPPort,
          );
          break;
        default:
          break;
      }
      this.receivedMsgCallback(msg, sourceIp);
    }
  }

  /**
   * Sends acknowledgement about receiving WiZ Message
   * We need to send acknowledgement on receiving every message, this way
   * we let WiZ Device know that we're still interested in receiving status updates
   * @param sourceMsg Source message we need to send acknowledgement for
   * @param sourceIp WiZ device IP
   */
  async sendSyncPilotAcknowledgement(
    sourceMsg: SyncPilotMessage,
    sourceIp: string,
  ) {
    const msg: SyncPilotAckMessage = {
      method: networkConstants.syncPilotMethod,
      id: sourceMsg.id,
      env: sourceMsg.env,
      result: {
        mac: getLocalMac(),
      },
    };
    sendCommand(
      msg,
      sourceIp,
      await getLocalIPAddress(this.interfaceName),
      this.controlUDPPort,
    )
      .then(() => {
      })
      .catch(() => {
      });
  }
}

export default UDPManager;
