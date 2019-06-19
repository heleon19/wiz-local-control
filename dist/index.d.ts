import { WiZMessage, Result, LightMode, GetSystemConfigResponse } from "./constants/types";
import UDPManager from "./UDPManager";
import { SetPilotMessage } from "./constants/types";
export declare type WiZLocalControlConfig = {
    incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
    interfaceName?: string;
};
export default class WiZLocalControl {
    udpManager: UDPManager;
    constructor(options: WiZLocalControlConfig);
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
    changeBrightness(brightness: number, lightIp: string): Promise<Result<any>>;
    /**
     * Requests firmware update of WiZ Light
     * @param lightIp Light IP address
     */
    updateFirmware(lightIp: string): Promise<Result<any>>;
    /**
     * Reset WiZ Light
     * @param lightIp Light IP address
     */
    reset(lightIp: string): Promise<Result<any>>;
    /**
     * Reboot WiZ Light
     * @param lightIp Light IP address
     */
    reboot(lightIp: string): Promise<Result<any>>;
    /**
     * Sets environment of WiZ Light
     * @param environment system environment
     * @param lightIp Light IP address
     */
    setEnvironment(environment: string, lightIp: string): Promise<Result<any>>;
    /**
     * Changes module name for WiZ Light
     * @param moduleName module name
     * @param lightIp Light IP address
     */
    setModuleName(moduleName: string, lightIp: string): Promise<Result<any>>;
    /**
     * Changes light mode of WiZ Light
     * @param lightMode Light mode, check LightMode type for details
     * @param lightIp Light IP address
     */
    changeLightMode(lightMode: LightMode, lightIp: string): Promise<Result<any>>;
    /**
     * Changes light mode of WiZ Light
     * @param lightMode Light mode, check LightMode type for details
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    changeLightModeAndBrightness(lightMode: LightMode, brightness: number, lightIp: string): Promise<Result<any>>;
    /**
     * Changes playing speed of Dynamic Scene of WiZ Light
     * @param speed Playing speed, 20-200
     * @param lightIp
     */
    changeSpeed(speed: number, lightIp: string): Promise<Result<any>>;
    /**
     * Changes status of WiZ Light
     * @param status Desired status, true - ON, false - OFF
     * @param lightIp
     */
    changeStatus(status: boolean, lightIp: string): Promise<Result<any>>;
    /**
     * Retrieves system configuration for WiZ Device (like FW version)
     * @param lightIp
     */
    getSystemConfig(lightIp: string): Promise<Result<GetSystemConfigResponse>>;
    validateMsg(msg: SetPilotMessage): Promise<void>;
}
