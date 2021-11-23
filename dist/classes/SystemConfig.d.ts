export interface SetSystemConfigMessageParameters {
    environment?: string;
    moduleName?: string;
    extendedWhiteFactor?: string;
    pwmRefreshRate?: number;
    whiteChannels?: number;
    whiteToColorsRatio?: number;
    ewf?: string;
    fs?: number;
    drvConf?: number[];
    systemConfigTs?: number;
}
/**
 * Set system config messages parameters for request
 */
export declare class SetSystemConfigParameters {
    env?: string;
    systemConfigTs: number;
    moduleName?: string;
    ewf?: string;
    pwmConf?: string;
    drvConf?: number[];
    fs?: number;
    constructor(parameters: SetSystemConfigMessageParameters);
}
export declare class SetSystemConfigMessage {
    method: "setSystemConfig";
    version: number;
    id: number;
    params: SetSystemConfigParameters;
    constructor();
    /**
     * Constructs firmware update message
     */
    static buildSetEnvironmentMessage(environment: string): SetSystemConfigMessage;
    /**
     * Constructs changing of module name message
     */
    static buildSetModuleNameMessage(moduleName: string): SetSystemConfigMessage;
    /**
     * Constructs update ewf message
     */
    static buildSetExtendedWhiteFactorMessage(extendedWhiteFactor: string): SetSystemConfigMessage;
    /**
     * Constructs general message
     */
    static buildSetSystemConfigMessage(parameters: SetSystemConfigMessageParameters): SetSystemConfigMessage;
}
/**
 * WiZ Light system configuration (fwVersion for example)
 */
export declare type GetSystemConfigResponse = {
    method: "getSystemConfig";
    result: {
        homeId: number;
        lock: boolean;
        groupId: number;
        typeId: number;
        fwOtaStatus: number;
        fwVersion: string;
    };
};
/**
 * Message sent to the lamp requesting its system configuration (fwVersion for example)
 */
export declare class GetSystemConfigMessage {
    method: "getSystemConfig";
    version: number;
    id: number;
    constructor();
}
