/// <reference types="node" />
import { WiZMessage, SyncPilotMessage } from "./constants/types";
import { Socket } from "dgram";
/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
declare class UDPManager {
    socket: Socket;
    receivedMsgCallback: (msg: WiZMessage) => void;
    constructor(receivedMsgCallback: (msg: WiZMessage) => void);
    /**
     * Creates socket and starts listening on UDP port LIGHT_UDP_BROADCAST_PORT
     */
    startListening(): void;
    /**
     * Stops listening
     */
    stopListening(): void;
    /**
     * Processes incoming message from WiZ device
     * and either
     * 1. sends registration packet if incoming message is FirstBeat
     * 2. invokes callbacks if incoming message is SyncPilot
     * @param msg Incoming message from the WiZ device
     * @param sourceIp IP of the WiZ device
     */
    processMessage(msg: WiZMessage, sourceIp: string): Promise<void>;
    /**
     * Sends acknowledgement about receiving WiZ Message
     * We need to send acknowledgement on receiving every message, this way
     * we let WiZ Device know that we're still interested in receiving status updates
     * @param sourceMsg Source message we need to send acknowledgement for
     * @param sourceIp WiZ device IP
     */
    sendSyncPilotAcknowledgement(sourceMsg: SyncPilotMessage, sourceIp: string): void;
}
export default UDPManager;
