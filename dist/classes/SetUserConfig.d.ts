export interface SetUserConfigMessageParameters {
    whiteTemperatureMin?: number;
    whiteTemperatureMax?: number;
    extendedTemperatureMin?: number;
    extendedTemperatureMax?: number;
    pwmMin?: number;
    pwmMax?: number;
    dftDim?: number;
    pwmRange?: number[];
    whiteRange?: number[];
    extRange?: number[];
    startupMode?: string;
    userConfigTs?: number;
}
/**
 * Set user config messages parameters for request
 */
export declare class SetUserConfigParameters {
    userConfigTs?: number;
    whiteRange?: number[];
    extRange?: number[];
    pwmRange?: number[];
    dftDim: number;
    startupMode: string;
    constructor(parameters: SetUserConfigMessageParameters);
}
export declare class SetUserConfigMessage {
    method: "setUserConfig";
    version: number;
    id: number;
    params: SetUserConfigParameters;
    constructor();
    /**
     * Constructs temperature range update message
     */
    static buildSetTemperatureRangeMessage(whiteTemperatureMin: number, whiteTemperatureMax: number, extendedTemperatureMin: number, extendedTemperatureMax: number): SetUserConfigMessage;
    /**
     * Constructs SetUserConfig message
     */
    static buildSetUserConfigMessage(parameters: SetUserConfigMessageParameters): SetUserConfigMessage;
}
