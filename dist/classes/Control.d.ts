/**
 * Incoming message that lamp is updating firmware and the status changed
 */
export declare type UpdateOtaMessage = {
    method: "updateOta";
    id: number;
    env: string;
    timestamp: Date;
    ip: string;
    params: {
        updateStatus?: number;
    };
};
/**
 * Update firmware messages parameters for request
 */
export declare class UpdateFirmwareParameters {
    fw: string;
    force: number;
    constructor(firmwareVersion: string | undefined);
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
    static buildUpdateFirmwareMessage(firmwareVersion: string | undefined): UpdateFirmwareMessage;
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
