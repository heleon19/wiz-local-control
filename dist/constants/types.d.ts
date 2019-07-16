/**
 * Scene type – built in the bulb scenes. Could be one of the scenes listed
 * in staticScenes const
 */
export declare type Scene = {
    type: "scene";
    sceneId: number;
    name: string;
};
/**
 * Light Mode type,
 * could be either
 * 1. Scene – determined by sceneId (1-28)
 * 2. Color - determined by Red, Green, Blue, Cool White, Warm White
 * (0-255). There is a limit on a maximum amount of channels used in the same time:
 * 3 RGB or 2 RGB + 1 White or 2 Whites
 * 3. Color temperature – form color temperature using Cool and Warm white LEDs (2000-9000)
 */
export declare type LightMode = Scene | {
    type: "color";
    r: number;
    g: number;
    b: number;
    cw: number;
    ww: number;
} | {
    type: "temperature";
    colorTemperature: number;
};
/**
 * MQTT connection status,
 * lamp will report it under some certain testing conditions
 */
export declare enum MQTTConnectionStatus {
    Success = 0,
    LibraryError = -1,
    NetworkConnectionError = -2,
    MQTTServerCertMissing = -3,
    MQTTServerCertMalformed = -4,
    HandshakeError = -5,
    MQTTServerCertMismatch = -6,
    MQTTLibraryError = 1,
    NoCredentials = 2,
    MQTTClientInitFailure = 3,
    ErrorLoadingPasswordFromFlash = 4,
    PasswordError = 5
}
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
        rssi: number;
        mac: string;
        mqttCd?: number;
        src: string;
    };
};
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
 * Message sent to the lamp requesting its status
 */
export declare type GetPilotMessage = {
    method: "getPilot";
    version: number;
    id: number;
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
export declare type SetPilotParams = SetPilotParametersColor | SetPilotParametersColorAndBrightness | SetPilotParametersColorTemperature | SetPilotParametersColorTemperatureAndBrightness | SetPilotParametersDimming | SetPilotParametersScene | SetPilotParametersSceneAndBrightness | SetPilotParametersSpeed | SetPilotParametersStatus;
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
}
/**
 * Set system config messages parameters for request
 */
export declare class SetSystemConfigParameters {
    env?: string;
    systemConfigTs: number;
    moduleName?: string;
    ewf?: string;
    constructor(environment: string | undefined, moduleName: string | undefined, extendedWhiteFactor: string | undefined);
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
}
/**
 * Set system config messages parameters for request
 */
export declare class SetUserConfigParameters {
    userConfigTs: number;
    whiteRange?: number[];
    extRange?: number[];
    constructor(whiteTemperatureMin: number | undefined, whiteTemperatureMax: number | undefined, extendedTemperatureMin: number | undefined, extendedTemperatureMax: number | undefined);
}
export declare class SetUserConfigMessage {
    method: "setUserConfig";
    version: number;
    id: number;
    params: SetUserConfigParameters;
    constructor();
    /**
     * Constructs firmware update message
     */
    static buildSetTemperatureRangeMessage(whiteTemperatureMin: number, whiteTemperatureMax: number, extendedTemperatureMin: number, extendedTemperatureMax: number): SetUserConfigMessage;
}
/**
 * Update firmware messages parameters for request
 */
export declare class UpdateFirmwareParameters {
    fw: string;
    force: number;
    constructor();
}
export declare class UpdateFirmwareMessage {
    method: "updateOta";
    version: number;
    id: number;
    params: UpdateFirmwareParameters;
    constructor();
    /**
     * Constructs firmware update message
     */
    static buildUpdateFirmwareMessage(): UpdateFirmwareMessage;
}
export declare class ResetMessage {
    method: "reset";
    version: number;
    id: number;
    constructor();
    /**
     * Constructs reset message
     */
    static buildResetMessage(): ResetMessage;
}
export declare class RebootMessage {
    method: "reboot";
    version: number;
    id: number;
    constructor();
    /**
     * Constructs reboot message
     */
    static buildRebootMessage(): RebootMessage;
}
/**
 * Message broadcasted by the light after booting,
 * way to inform nearby devices about its presence
 */
export declare type FirstBeatMessage = {
    method: "firstBeat";
    id: number;
    env: string;
    params: {
        mac: string;
        fwVersion: string;
    };
};
/**
 * Message sent by device to the lamp (via broadcast or unicast)
 * Lamp will add specified IP to the list devices that it notifies on status change using
 * SyncPilot messages
 */
export declare class RegistrationMessage {
    method: "registration";
    version: number;
    id: number;
    params: {
        register: boolean;
        phoneMac: string;
        phoneIp: string;
    };
    constructor(ip: string, mac: string);
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
    constructor(ip: string);
}
export declare type WiZControlMessage = SetPilotMessage | SyncPilotAckMessage | RegistrationMessage | UpdateFirmwareMessage | GetSystemConfigMessage | SetSystemConfigMessage | ResetMessage | RebootMessage | SetUserConfigMessage;
export declare type WiZMessage = GetPilotMessage | SetPilotMessage | SyncPilotMessage | FirstBeatMessage | RegistrationMessage | UpdateFirmwareMessage | SetSystemConfigMessage | ResetMessage | RebootMessage | SetUserConfigMessage;
export declare type WiZMessageResponse = GetSystemConfigResponse;
export declare type Result<T extends WiZMessageResponse> = {
    type: "success";
    method: string;
    params: T;
} | {
    type: "error";
    message: string;
};
export declare const staticScenes: Array<LightMode>;
export declare type Color = {
    red: number;
    green: number;
    blue: number;
};
