/// <reference types="node" />
import { WiZMessage, Result, LightMode } from "./constants/types";
import UDPManager from "./UDPManager";
import { SetPilotMessage } from "./constants/types";
import * as dgram from "dgram";
export default class WiZLocalControl {
    udpManager: UDPManager;
    sendCommandImpl: (msg: SetPilotMessage, ip: string, udpPort?: number, broadcast?: boolean, socket?: dgram.Socket) => Promise<Result>;
    constructor(incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void, udpManager?: UDPManager | undefined, interfaceName?: string, sendCommandImpl?: (msg: SetPilotMessage, ip: string, udpPort?: number, broadcast?: boolean, socket?: dgram.Socket) => Promise<Result>);
    /**
     * Starts listening to status updates of WiZ lights
     */
    startListening(): Promise<void>;
    /**
     * Stops listening to status updates of WiZ lights
     */
    stopListening(): Promise<void>;
    /**
     * Changes brightness of WiZ Light
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    changeBrightness(brightness: number, lightIp: string): Promise<Result>;
    /**
     * Changes light mode of WiZ Light
     * @param lightMode Light mode, check LightMode type for details
     * @param lightIp Light IP address
     */
    changeLightMode(lightMode: LightMode, lightIp: string): Promise<Result>;
    /**
     * Changes playing speed of Dynamic Scene of WiZ Light
     * @param speed Playing speed, 20-200
     * @param lightIp
     */
    changeSpeed(speed: number, lightIp: string): Promise<Result>;
    /**
     * Changes status of WiZ Light
     * @param status Desired status, true - ON, false - OFF
     * @param lightIp
     */
    changeStatus(status: boolean, lightIp: string): Promise<Result>;
}
