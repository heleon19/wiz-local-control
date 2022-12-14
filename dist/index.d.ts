import UDPManager from "./UDPManager";
import { Result, staticScenes, WiZControlMessage, WiZMessage } from "./classes/types";
import { GetSystemConfigResponse, SetSystemConfigMessageParameters } from "./classes/SystemConfig";
import { LightMode } from "./classes/LightMode";
import { GetPowerResponse } from "./classes/GetMessage";
import { FavoriteLightMode } from "./classes/Favorites";
import { WiZClickMode } from "./classes/WiZClick";
import { SetUserConfigMessageParameters } from "./classes/SetUserConfig";
import { SetModelConfigMessageParameters } from "./classes/SetModelConfig";
export declare type WiZLocalControlConfig = {
    incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
    interfaceName?: string;
};
export default class WiZLocalControl {
    udpManager: UDPManager;
    constructor(options: WiZLocalControlConfig);
    validateMsg(msg: WiZControlMessage, skipMissingProperties?: boolean): Promise<void>;
    /**
     * Starts listening to status updates of WiZ lights
     */
    startListening(): Promise<void>;
    /**
     * Stops listening to status updates of WiZ lights
     */
    stopListening(): Promise<void>;
    /**
     * Requests firmware update of WiZ Light
     * @param firmwareVersion target fw version, if undefined - then default
     * @param lightIp Light IP address
     */
    updateFirmware(firmwareVersion: string | undefined, lightIp: string): Promise<Result<any>>;
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
     * Sets environment of WiZ Light (OBSOLETE after fw 1.18)
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
     * Changes extended white factor for WiZ Light
     * @param extendedWhiteFactor extended white factor
     * @param lightIp Light IP address
     */
    setExtendedWhiteFactor(extendedWhiteFactor: string, lightIp: string): Promise<Result<any>>;
    /**
     * Sets system config for WiZ Light
     * @param parameters SetSystemConfig message parameters
     * @param lightIp Light IP address
     */
    setSystemConfig(parameters: SetSystemConfigMessageParameters, lightIp: string): Promise<Result<any>>;
    /**
     * Sets model config for WiZ Light
     * @param parameters SetModelConfig message parameters
     * @param lightIp Light IP address
     */
    setModelConfig(parameters: SetModelConfigMessageParameters, lightIp: string): Promise<Result<any>>;
    /**
     * Changes temperature ranges for WiZ Light
     * @param whiteTemperatureMin the temperature in Kelvin for the native warm white
     * @param whiteTemperatureMax the temperature in Kelvin for the native cool white
     * @param extendedTemperatureMin the temperature in Kelvin for the extended warm white where red and blue need to be added.
     * @param extendedTemperatureMax the temperature in Kelvin for the extended cool white where red and blue need to be added.
     * @param lightIp Light IP address
     */
    setTemperatureRanges(whiteTemperatureMin: number, whiteTemperatureMax: number, extendedTemperatureMin: number, extendedTemperatureMax: number, lightIp: string): Promise<Result<any>>;
    /**
     * Sets user config for WiZ Light
     * @param parameters SetUserConfig message parameters
     * @param lightIp Light IP address
     */
    setUserConfig(parameters: SetUserConfigMessageParameters, lightIp: string): Promise<Result<any>>;
    /**
     * Changes brightness of WiZ Light
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    changeBrightness(brightness: number, lightIp: string): Promise<Result<any>>;
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
     * Changes ratio of WiZ Light (for supported products)
     * @param ratio Ratio between top and bottom part, number in range 0..100
     * @param lightIp Light IP address
     */
    changeRatio(ratio: number, lightIp: string): Promise<Result<any>>;
    /**
     * Retrieves system configuration for WiZ Device (like FW version)
     * @param lightIp
     */
    getSystemConfig(lightIp: string): Promise<Result<GetSystemConfigResponse>>;
    /**
     * Retrieves system configuration for WiZ Device (like FW version)
     * @param lightIp
     */
    getPower(lightIp: string): Promise<Result<GetPowerResponse>>;
    /**
     * Sets favorites on the light
     * @param favorite1
     * @param favorite2
     * @param favorite3
     * @param favorite4
     * @param lightIp
     */
    setFavorites(favorite1: FavoriteLightMode, favorite2: FavoriteLightMode, favorite3: FavoriteLightMode, favorite4: FavoriteLightMode, lightIp: string): Promise<Result<any>>;
    /**
     * Sets WiZ CLick settings on the light
     * @param wizClick1
     * @param wizClick2
     * @param lightIp
     */
    setWiZClick(wizClick1: WiZClickMode, wizClick2: WiZClickMode, lightIp: string): Promise<Result<any>>;
}
export { staticScenes, FavoriteLightMode };
