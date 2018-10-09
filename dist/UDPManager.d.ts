/// <reference types="node" />
import { WiZMessage, SyncPilotMessage, UDPCommandMessage, Result } from "./constants/types";
import RegistrationManager from "./registrationManager";
import { Socket } from "dgram";
/**
 * Class that manages UDP sockets, listens to the incoming messages
 * from WiZ devices and sends control commands
 */
declare class UDPManager {
    socket: Socket;
    interfaceName: string;
    registerLightsTimer: NodeJS.Timer | undefined;
    broadcastUDPPort: number;
    controlUDPPort: number;
    registrationManager: RegistrationManager;
    receivedMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
    constructor(receivedMsgCallback: (msg: WiZMessage, sourceIp: string) => void, interfaceName: string, broadcastUDPPort?: number, controlUDPPort?: number, registrationManager?: RegistrationManager);
    createSocket(): Promise<void>;
    /**
     * Creates socket, starts listening on UDP port DEVICE_UDP_LISTEN_PORT
     * and initiates WiZ device registration procedure
     */
    startListening(): Promise<void>;
    /**
     * Stops listening
     */
    stopListening(): Promise<void>;
    sendUDPCommand(msg: UDPCommandMessage, ip: string): Promise<Result>;
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
    sendSyncPilotAcknowledgement(sourceMsg: SyncPilotMessage, sourceIp: string): Promise<void>;
}
export default UDPManager;
