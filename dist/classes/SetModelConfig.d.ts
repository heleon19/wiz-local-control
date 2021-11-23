export interface SetModelConfigMessageParameters {
    confTs: number;
    ps?: number;
    pwmFreq: number;
    pwmRange: number[];
    wcr: number;
    nowc: number;
    cctRange: number[];
    renderFactor: string;
    hasAdjMinDim?: boolean;
    hasTapSensor?: boolean;
    pm?: number;
    fanSpeed?: number;
}
export declare class SetModelConfigParameters {
    confTs: number;
    ps?: number;
    pwmFreq: number;
    pwmRange: number[];
    wcr: number;
    nowc: number;
    cctRange: number[];
    renderFactor: string;
    hasAdjMinDim?: boolean;
    hasTapSensor?: boolean;
    pm?: number;
    fanSpeed?: number;
    constructor(parameters: SetModelConfigMessageParameters);
}
export declare class SetModelConfigMessage {
    method: "setModelConfig";
    version: number;
    id: number;
    params: SetModelConfigParameters;
    constructor();
    /**
     * Constructs general message
     */
    static buildSetModelConfigMessage(parameters: SetModelConfigMessageParameters): SetModelConfigMessage;
}
