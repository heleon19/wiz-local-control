import { SetPilotMessage, SyncPilotAckMessage, SyncPilotMessage } from "./Pilot";
import { FirstBeatMessage, RebootMessage, RegistrationMessage, ResetMessage, UpdateFirmwareMessage, UpdateOtaMessage } from "./Control";
import { GetSystemConfigMessage, GetSystemConfigResponse, SetSystemConfigMessage } from "./SystemConfig";
import { SetUserConfigMessage } from "./SetUserConfig";
import { SetWiZClickMessage } from "./WiZClick";
import { SetFavoritesMessage } from "./Favorites";
import { GetPilotMessage, GetPowerMessage, GetPowerResponse } from "./GetMessage";
import { SetModelConfigMessage } from "./SetModelConfig";
import { LightMode } from "./LightMode";
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
export declare type WiZControlMessage = SetPilotMessage | SyncPilotAckMessage | RegistrationMessage | UpdateFirmwareMessage | GetSystemConfigMessage | SetSystemConfigMessage | ResetMessage | RebootMessage | SetUserConfigMessage | SetFavoritesMessage | SetWiZClickMessage | GetPowerMessage | SetModelConfigMessage;
export declare type WiZMessage = GetPilotMessage | SetPilotMessage | SyncPilotMessage | UpdateOtaMessage | FirstBeatMessage | RegistrationMessage | UpdateFirmwareMessage | SetSystemConfigMessage | ResetMessage | RebootMessage | SetUserConfigMessage;
export declare type WiZMessageResponse = GetSystemConfigResponse | GetPowerResponse;
export declare type Result<T extends WiZMessageResponse> = {
    type: "success";
    method: string;
    params: T;
} | {
    type: "error";
    message: string;
};
export declare const staticScenes: Array<LightMode>;
