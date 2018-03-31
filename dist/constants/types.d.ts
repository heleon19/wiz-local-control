export declare class Light {
    ip: string;
    mac: string;
    name: string;
    status: boolean;
    dimming: number;
    r: number | undefined;
    g: number | undefined;
    b: number | undefined;
    cw: number | undefined;
    ww: number | undefined;
    sceneId: number | undefined;
    colorTemperature: number | undefined;
    rssi: number | undefined;
    lastCommunicationDate: Date;
    firmwareVersion: string | undefined;
    constructor(mac: string);
    lightMode: LightMode;
}
export declare type LightsState = {
    lights: Array<Light>;
};
export declare type LightManufacturingData = {
    mac: string;
    modelId: number;
    model_name: string;
    type: number;
    productionDate: Date;
};
export declare type LightModel = {
    id: number;
    name: string;
    image: {
        url: string;
        loading: boolean;
        localPath: string;
        urlExpiryDate: Date;
    };
};
export declare type Scene = {
    type: "scene";
    sceneId: number;
    name: string;
};
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
    };
};
export declare type SyncPilotAckMessage = {
    method: "syncPilot";
    id: number;
    env: string;
    result: {
        mac: string;
    };
};
export declare type GetPilotMessage = {
    method: "getPilot";
    version: number;
    id: number;
};
export declare class SetPilotMessage {
    method: "setPilot";
    version: number;
    id: number;
    params: {
        r?: number;
        g?: number;
        b?: number;
        w?: number;
        c?: number;
        state?: boolean;
        sceneId?: number;
        speed?: number;
        temp?: number;
        dimming?: number;
    };
    static buildDimmingControlMessage(dimming: number): SetPilotMessage;
    static buildStatusControlMessage(status: boolean): SetPilotMessage;
    static buildSceneControlMessage(sceneId: number): SetPilotMessage;
    static buildColorControlMessage(red: number, green: number, blue: number, whiteLevel: number): SetPilotMessage;
    static buildColorTemperatureControlMessage(colorTemperature: number): SetPilotMessage;
}
export declare type FirstBeatMessage = {
    method: "firstBeat";
    id: number;
    env: string;
    params: {
        mac: string;
        fwVersion: string;
    };
};
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
export declare type WiZControlMessage = SetPilotMessage | SyncPilotAckMessage;
export declare type WiZMessage = GetPilotMessage | SetPilotMessage | SyncPilotMessage | FirstBeatMessage | RegistrationMessage;
export declare type Result = {
    type: "success";
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
