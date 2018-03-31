/// <reference types="node" />
import { WiZMessage, SyncPilotMessage } from "./constants/types";
import { Socket } from "dgram";
declare class UDPManager {
    socket: Socket;
    receivedMsgCallback: (msg: WiZMessage) => void;
    constructor(receivedMsgCallback: (msg: WiZMessage) => void);
    startListening(): void;
    stopListening(): void;
    processMessage(msg: WiZMessage, sourceIp: string): Promise<void>;
    static sendSyncPilotAcknowledgement(sourceMsg: SyncPilotMessage, sourceIp: string): void;
}
export default UDPManager;
