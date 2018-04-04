"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram = require("dgram");
const buffer = require("buffer");
const pino = require("pino");
const networkConstants = require("./constants/communication");
const registrationManager_1 = require("./registrationManager");
const ipFunctions_1 = require("./ipFunctions");
const UDPCommunication_1 = require("./UDPCommunication");
const logger = pino();
/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
class UDPManager {
    constructor(receivedMsgCallback, interfaceName, broadcastUDPPort = networkConstants.DEVICE_UDP_LISTEN_PORT, controlUDPPort = networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager = new registrationManager_1.default()) {
        this.interfaceName = interfaceName;
        global.Buffer = global.Buffer || buffer.Buffer;
        this.receivedMsgCallback = receivedMsgCallback;
        this.broadcastUDPPort = broadcastUDPPort;
        this.controlUDPPort = controlUDPPort;
        this.createSocket();
        this.registrationManager = registrationManager;
    }
    createSocket() {
        return __awaiter(this, void 0, void 0, function* () {
            this.socket = yield dgram.createSocket("udp4");
        });
    }
    /**
     * Creates socket, starts listening on UDP port DEVICE_UDP_LISTEN_PORT
     * and initiates WiZ device registration procedure
     */
    startListening() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stopListening();
            yield this.socket.bind(this.broadcastUDPPort);
            this.socket.on("message", (msg, rinfo) => __awaiter(this, void 0, void 0, function* () {
                const str = String.fromCharCode.apply(null, new Uint8Array(msg));
                const obj = JSON.parse(str);
                logger.info(`message received - ${str} with info - ${JSON.stringify(rinfo)}`);
                yield this.processMessage(obj, rinfo.address);
            }));
            this.registerLightsTimer = yield this.registrationManager.registerAllLights(this.interfaceName, this.controlUDPPort);
        });
    }
    /**
     * Stops listening
     */
    stopListening() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.registerLightsTimer != undefined) {
                clearInterval(this.registerLightsTimer);
                this.registerLightsTimer = undefined;
            }
            if (this.socket != undefined) {
                try {
                    yield this.socket.close();
                }
                catch (e) { }
                this.createSocket();
            }
            return;
        });
    }
    /**
     * Processes incoming message from WiZ device
     * and either
     * 1. sends registration packet if incoming message is FirstBeat
     * 2. invokes callbacks if incoming message is SyncPilot
     * @param msg Incoming message from the WiZ device
     * @param sourceIp IP of the WiZ device
     */
    processMessage(msg, sourceIp) {
        return __awaiter(this, void 0, void 0, function* () {
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
                        this.registrationManager.registerDevice(sourceIp, this.interfaceName, this.controlUDPPort);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    /**
     * Sends acknowledgement about receiving WiZ Message
     * We need to send acknowledgement on receiving every message, this way
     * we let WiZ Device know that we're still interested in receiving status updates
     * @param sourceMsg Source message we need to send acknowledgement for
     * @param sourceIp WiZ device IP
     */
    sendSyncPilotAcknowledgement(sourceMsg, sourceIp) {
        const msg = {
            method: networkConstants.syncPilotMethod,
            id: sourceMsg.id,
            env: sourceMsg.env,
            result: {
                mac: ipFunctions_1.getLocalMac(),
            },
        };
        UDPCommunication_1.default(msg, sourceIp, this.controlUDPPort)
            .then(() => { })
            .catch(() => { });
    }
}
exports.default = UDPManager;
//# sourceMappingURL=UDPManager.js.map