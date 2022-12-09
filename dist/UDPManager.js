"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = require("pino");
const dgram = require("dgram");
const buffer = require("buffer");
const networkConstants = require("./constants");
const registrationManager_1 = require("./registrationManager");
const ipFunctions_1 = require("./ipFunctions");
const UDPCommunication_1 = require("./UDPCommunication");
const logger = (0, pino_1.default)({ enabled: !!process.env.PINO_LOG });
/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
class UDPManager {
    constructor(receivedMsgCallback, interfaceName, broadcastUDPPort = networkConstants.DEVICE_UDP_LISTEN_PORT, controlUDPPort = networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager = new registrationManager_1.default()) {
        this.createSocket()
            .then(() => { });
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
            }
            catch (e) {
                logger.warn(`Cannot process the received message because of ${e}`);
            }
        });
        this.registerLightsTimer = await this.registrationManager.registerAllLights(this.interfaceName, this.controlUDPPort);
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
            }
            catch (e) {
            }
            await this.createSocket();
        }
        return;
    }
    async sendUDPCommand(msg, ip) {
        const localIp = await (0, ipFunctions_1.getLocalIPAddress)(this.interfaceName);
        return await (0, UDPCommunication_1.default)(msg, ip, localIp);
    }
    /**
     * Processes incoming message from WiZ device
     * and either
     * 1. sends registration packet if incoming message is FirstBeat
     * 2. invokes callbacks if incoming message is SyncPilot
     * @param msg Incoming message from the WiZ device
     * @param sourceIp IP of the WiZ device
     */
    async processMessage(msg, sourceIp) {
        if (msg) {
            switch (msg.method) {
                case networkConstants.syncPilotMethod:
                    await this.sendSyncPilotAcknowledgement(msg, sourceIp);
                    msg.timestamp = new Date();
                    msg.ip = sourceIp;
                    break;
                case networkConstants.firstBeatMethod:
                    await this.registrationManager.registerDevice(sourceIp, this.interfaceName, this.controlUDPPort);
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
    async sendSyncPilotAcknowledgement(sourceMsg, sourceIp) {
        const msg = {
            method: networkConstants.syncPilotMethod,
            id: sourceMsg.id,
            env: sourceMsg.env,
            result: {
                mac: (0, ipFunctions_1.getLocalMac)(),
            },
        };
        (0, UDPCommunication_1.default)(msg, sourceIp, await (0, ipFunctions_1.getLocalIPAddress)(this.interfaceName), this.controlUDPPort)
            .then(() => {
        })
            .catch(() => {
        });
    }
}
exports.default = UDPManager;
//# sourceMappingURL=UDPManager.js.map