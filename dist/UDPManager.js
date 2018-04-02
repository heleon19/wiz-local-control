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
class UDPManager {
    constructor(receivedMsgCallback) {
        global.Buffer = global.Buffer || buffer.Buffer;
        this.receivedMsgCallback = receivedMsgCallback;
    }
    startListening() {
        const socket = dgram.createSocket("udp4");
        socket.bind(networkConstants.LIGHT_UDP_BROADCAST_PORT);
        socket.on("message", (msg, rinfo) => __awaiter(this, void 0, void 0, function* () {
            const str = String.fromCharCode.apply(null, new Uint8Array(msg));
            const obj = JSON.parse(str);
            logger.info(`message received - ${str} with info - ${JSON.stringify(rinfo)}`);
            yield this.processMessage(obj, rinfo.address);
        }));
        this.socket = socket;
        registrationManager_1.registerAllLamps();
    }
    stopListening() {
        this.socket.close();
    }
    processMessage(msg, sourceIp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (msg) {
                switch (msg.method) {
                    case networkConstants.syncPilotMethod:
                        UDPManager.sendSyncPilotAcknowledgement(msg, sourceIp);
                        msg.timestamp = new Date();
                        msg.ip = sourceIp;
                        // if lamp is first noticed – need to query API about manufacturing data
                        this.receivedMsgCallback(msg);
                        break;
                    case networkConstants.firstBeatMethod:
                        registrationManager_1.registerDeviceWithLightIp(sourceIp);
                        break;
                    default:
                        break;
                }
            }
        });
    }
    static sendSyncPilotAcknowledgement(sourceMsg, sourceIp) {
        const msg = {
            method: networkConstants.syncPilotMethod,
            id: sourceMsg.id,
            env: sourceMsg.env,
            result: {
                mac: ipFunctions_1.getLocalMac()
            }
        };
        UDPCommunication_1.default(msg, sourceIp).then(() => { }).catch(() => { });
    }
}
exports.default = UDPManager;
//# sourceMappingURL=UDPManager.js.map