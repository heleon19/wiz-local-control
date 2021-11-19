import { Scene } from "./LightMode";
/**
 * Acknowledgement message device should send to
 * the lamp on receiving SyncPilot message
 */
export declare type SyncPilotAckMessage = {
    method: "syncPilot";
    id: number;
    env: string;
    result: {
        mac: string;
    };
};
/**
 * Incoming message that lamp sends to report its status
 */
export declare type SyncPilotMessage = {
    method: "syncPilot";
    id: number;
    env: string;
    timestamp: Date;
    ip: string;
    params: {
        r?: number;
        g?: number;
        b?: number;
        w?: number;
        c?: number;
        state?: boolean;
        sceneId?: number;
        temp?: number;
        dimming?: number;
        speed?: number;
        rssi: number;
        mac: string;
        mqttCd?: number;
        src: string;
        ratio?: number;
    };
};
/**
 * Set Pilot messages parameters for changing color
 */
export declare class SetPilotParametersColor {
    r?: number;
    g?: number;
    b?: number;
    w?: number;
    c?: number;
    constructor(r: number, g: number, b: number, coolWhiteLevel: number, warmWhiteLevel: number);
}
/**
 * Set Pilot messages parameters for changing color and brightness
 */
export declare class SetPilotParametersColorAndBrightness {
    r?: number;
    g?: number;
    b?: number;
    w?: number;
    c?: number;
    dimming?: number;
    constructor(r: number, g: number, b: number, coolWhiteLevel: number, warmWhiteLevel: number, brightness: number);
}
/**
 * Set Pilot messages parameters for scene
 */
export declare class SetPilotParametersScene {
    sceneId?: number;
    constructor(sceneId: number);
}
/**
 * Set Pilot messages parameters for ratio
 */
export declare class SetPilotParametersRatio {
    ratio?: number;
    constructor(ratio: number);
}
/**
 * Set Pilot messages parameters for scene and brightness
 */
export declare class SetPilotParametersSceneAndBrightness {
    sceneId?: number;
    dimming?: number;
    constructor(sceneId: number, brightness: number);
}
/**
 * Set Pilot messages parameters for status
 */
export declare class SetPilotParametersStatus {
    state?: boolean;
    constructor(status: boolean);
}
/**
 * Set Pilot messages parameters for changing dimming
 */
export declare class SetPilotParametersDimming {
    dimming?: number;
    constructor(dimming: number);
}
/**
 * Set Pilot messages parameters for changing speed
 */
export declare class SetPilotParametersSpeed {
    speed?: number;
    constructor(speed: number);
}
/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
export declare class SetPilotParametersColorTemperatureAndBrightness {
    temp?: number;
    dimming?: number;
    constructor(temperature: number, brightness: number);
}
/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
export declare class SetPilotParametersColorTemperature {
    temp?: number;
    constructor(temperature: number);
}
export declare type SetPilotParams = SetPilotParametersColor | SetPilotParametersColorAndBrightness | SetPilotParametersColorTemperature | SetPilotParametersColorTemperatureAndBrightness | SetPilotParametersDimming | SetPilotParametersScene | SetPilotParametersSceneAndBrightness | SetPilotParametersSpeed | SetPilotParametersStatus | SetPilotParametersRatio;
export declare class SetPilotMessage {
    method: "setPilot";
    version: number;
    id: number;
    params: SetPilotParams;
    constructor();
    /**
     * Constructs dimming control message
     * @param dimming - Integer, valid range is 10-100
     */
    static buildDimmingControlMessage(dimming: number): SetPilotMessage;
    /**
     * Constructs status control message
     * @param status - Boolean, true - turn the lamp on, false - off
     */
    static buildStatusControlMessage(status: boolean): SetPilotMessage;
    /**
     * Constructs scene control message
     * @param scene - Scene object, from the list of static scenes
     */
    static buildSceneControlMessage(scene: Scene): SetPilotMessage;
    /**
     * Constructs scene control message
     * @param scene - Scene object, from the list of static scenes
     * @param dimming - Integer, valid range is 10-100
     */
    static buildSceneAndBrightnessControlMessage(scene: Scene, dimming: number): SetPilotMessage;
    /**
     * Constructs color control message.
     * Valid combinations: R+G+B, R+G+(W|C), G+B+(W|C), R+B+(W|C), W+C.
     * R+G+B+(W|C), W+C+(R|G|B) could not be played due to limitations in the light engine
     * @param red - Integer, valid range 0-255
     * @param green - Integer, valid range 0-255
     * @param blue - Integer, valid range 0-255
     * @param coolWhiteLevel - Integer, valid range 0-255
     * @param warmWhiteLevel - Integer, valid range 0-255
     */
    static buildColorControlMessage(red: number, green: number, blue: number, coolWhiteLevel: number, warmWhiteLevel: number): SetPilotMessage;
    /**
     * Constructs color + dimming control message.
     * Valid combinations: R+G+B, R+G+(W|C), G+B+(W|C), R+B+(W|C), W+C.
     * R+G+B+(W|C), W+C+(R|G|B) could not be played due to limitations in the light engine
     * @param red - Integer, valid range 0-255
     * @param green - Integer, valid range 0-255
     * @param blue - Integer, valid range 0-255
     * @param coolWhiteLevel - Integer, valid range 0-255
     * @param warmWhiteLevel - Integer, valid range 0-255
     * @param dimming - Integer, valid range is 10-100
     */
    static buildColorAndBrightnessControlMessage(red: number, green: number, blue: number, coolWhiteLevel: number, warmWhiteLevel: number, dimming: number): SetPilotMessage;
    /**
     * Constructs color temperature control message.
     * @param colorTemperature - Integer, valid range 2000-9000
     */
    static buildColorTemperatureControlMessage(colorTemperature: number): SetPilotMessage;
    /**
     * Constructs color temperature control message.
     * @param colorTemperature - Integer, valid range 2000-9000
     * @param dimming - Integer, valid range is 10-100
     */
    static buildColorTemperatureAndBrightnessControlMessage(colorTemperature: number, dimming: number): SetPilotMessage;
    /**
     * Constructs playing speed control message.
     * Valid only for dynamic scenes
     * @param speed Playing speed, valid range 20-200
     */
    static buildSpeedControlMessage(speed: number): SetPilotMessage;
    /**
     * Constructs ratio control message
     * @param ratio - Ratio between zones brightess, number in range 0..100
     */
    static buildRatioControlMessage(ratio: number): SetPilotMessage;
}
