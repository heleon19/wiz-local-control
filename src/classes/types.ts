import { SetPilotMessage, SyncPilotAckMessage, SyncPilotMessage } from "./Pilot";
import {
  FirstBeatMessage,
  RebootMessage,
  RegistrationMessage,
  ResetMessage,
  UpdateFirmwareMessage,
  UpdateOtaMessage,
} from "./Control";
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
export enum MQTTConnectionStatus {
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
  PasswordError = 5,
}

export type WiZControlMessage =
  | SetPilotMessage
  | SyncPilotAckMessage
  | RegistrationMessage
  | UpdateFirmwareMessage
  | GetSystemConfigMessage
  | SetSystemConfigMessage
  | ResetMessage
  | RebootMessage
  | SetUserConfigMessage
  | SetFavoritesMessage
  | SetWiZClickMessage
  | GetPowerMessage
  | SetModelConfigMessage;

export type WiZMessage =
  | GetPilotMessage
  | SetPilotMessage
  | SyncPilotMessage
  | UpdateOtaMessage
  | FirstBeatMessage
  | RegistrationMessage
  | UpdateFirmwareMessage
  | SetSystemConfigMessage
  | ResetMessage
  | RebootMessage
  | SetUserConfigMessage;

export type WiZMessageResponse = GetSystemConfigResponse | GetPowerResponse;

export type Result<T extends WiZMessageResponse> =
  | {
  type: "success";
  method: string;
  params: T;
}
  | {
  type: "error";
  message: string;
};

export const staticScenes: Array<LightMode> = [
  {
    type: "scene",
    sceneId: 1,
    name: "Ocean",
  },
  {
    type: "scene",
    sceneId: 2,
    name: "Romance",
  },
  {
    type: "scene",
    sceneId: 3,
    name: "Sunset",
  },
  {
    type: "scene",
    sceneId: 4,
    name: "Party",
  },
  {
    type: "scene",
    sceneId: 5,
    name: "Fireplace",
  },
  {
    type: "scene",
    sceneId: 6,
    name: "Cozy",
  },
  {
    type: "scene",
    sceneId: 7,
    name: "Forest",
  },
  {
    type: "scene",
    sceneId: 8,
    name: "Pastel colors",
  },
  {
    type: "scene",
    sceneId: 9,
    name: "Wake up",
  },
  {
    type: "scene",
    sceneId: 10,
    name: "Bedtime",
  },
  {
    type: "scene",
    sceneId: 11,
    name: "Warm white",
  },
  {
    type: "scene",
    sceneId: 12,
    name: "Daylight",
  },
  {
    type: "scene",
    sceneId: 13,
    name: "Cool white",
  },
  {
    type: "scene",
    sceneId: 14,
    name: "Night Light",
  },
  {
    type: "scene",
    sceneId: 15,
    name: "Focus",
  },
  {
    type: "scene",
    sceneId: 16,
    name: "Relax",
  },
  {
    type: "scene",
    sceneId: 17,
    name: "True colors",
  },
  {
    type: "scene",
    sceneId: 18,
    name: "TV Time",
  },
  {
    type: "scene",
    sceneId: 19,
    name: "Plant growth",
  },
  {
    type: "scene",
    sceneId: 20,
    name: "Spring",
  },
  {
    type: "scene",
    sceneId: 21,
    name: "Summer",
  },
  {
    type: "scene",
    sceneId: 22,
    name: "Fall",
  },
  {
    type: "scene",
    sceneId: 23,
    name: "Deep dive",
  },
  {
    type: "scene",
    sceneId: 24,
    name: "Jungle",
  },
  {
    type: "scene",
    sceneId: 25,
    name: "Mojito",
  },
  {
    type: "scene",
    sceneId: 26,
    name: "Club",
  },
  {
    type: "scene",
    sceneId: 27,
    name: "Christmas",
  },
  {
    type: "scene",
    sceneId: 28,
    name: "Halloween",
  },
  {
    type: "scene",
    sceneId: 29,
    name: "Candlelight",
  },
  {
    type: "scene",
    sceneId: 30,
    name: "Golden White",
  },
  {
    type: "scene",
    sceneId: 31,
    name: "Pulse",
  },
  {
    type: "scene",
    sceneId: 32,
    name: "Steampunk",
  },
];
