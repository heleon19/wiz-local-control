import * as networkConstants from "../constants/communication";
import {
  validate,
  IsInt,
  Min,
  Max,
  ValidateNested,
  IsString,
  IsOptional,
} from "class-validator";

/**
 * Scene type – built in the bulb scenes. Could be one of the scenes listed
 * in staticScenes const
 */
export type Scene = {
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
 * 3. Color temperature – form color temperature using Cool and Warm white LEDs (2200-6500)
 */
export type LightMode =
  | Scene
  | {
      type: "color";
      r: number;
      g: number;
      b: number;
      cw: number;
      ww: number;
    }
  | {
      type: "temperature";
      colorTemperature: number;
    };

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
/**
 * Incoming message that lamp sends to report its status
 */
export type SyncPilotMessage = {
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
export type SyncPilotAckMessage = {
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
export type GetPilotMessage = {
  method: "getPilot";
  version: number;
  id: number;
};

/**
 * Set Pilot messages parameters for changing color
 */
export class SetPilotParametersColor {
  @IsInt()
  @Min(0)
  @Max(255)
  r?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  g?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  b?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  w?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  c?: number;

  constructor(
    r: number,
    g: number,
    b: number,
    coolWhiteLevel: number,
    warmWhiteLevel: number,
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.w = warmWhiteLevel;
    this.c = coolWhiteLevel;
  }
}

/**
 * Set Pilot messages parameters for changing color and brightness
 */
export class SetPilotParametersColorAndBrightness {
  @IsInt()
  @Min(0)
  @Max(255)
  r?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  g?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  b?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  w?: number;
  @IsInt()
  @Min(0)
  @Max(255)
  c?: number;
  @IsInt()
  @Min(10)
  @Max(100)
  dimming?: number;

  constructor(
    r: number,
    g: number,
    b: number,
    coolWhiteLevel: number,
    warmWhiteLevel: number,
    brightness: number,
  ) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.w = warmWhiteLevel;
    this.c = coolWhiteLevel;
    this.dimming = brightness;
  }
}

/**
 * Set Pilot messages parameters for scene
 */
export class SetPilotParametersScene {
  @IsInt()
  @Min(1)
  @Max(28)
  sceneId?: number;

  constructor(sceneId: number) {
    this.sceneId = sceneId;
  }
}

/**
 * Set Pilot messages parameters for scene and brightness
 */
export class SetPilotParametersSceneAndBrightness {
  @IsInt()
  @Min(1)
  @Max(28)
  sceneId?: number;
  @IsInt()
  @Min(10)
  @Max(100)
  dimming?: number;

  constructor(sceneId: number, brightness: number) {
    this.sceneId = sceneId;
    this.dimming = brightness;
  }
}

/**
 * Set Pilot messages parameters for status
 */
export class SetPilotParametersStatus {
  state?: boolean;

  constructor(status: boolean) {
    this.state = status;
  }
}

/**
 * Set Pilot messages parameters for changing dimming
 */
export class SetPilotParametersDimming {
  @IsInt()
  @Min(10)
  @Max(100)
  dimming?: number;

  constructor(dimming: number) {
    this.dimming = dimming;
  }
}

/**
 * Set Pilot messages parameters for changing speed
 */
export class SetPilotParametersSpeed {
  @IsInt()
  @Min(20)
  @Max(200)
  speed?: number;

  constructor(speed: number) {
    this.speed = speed;
  }
}

/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
export class SetPilotParametersColorTemperatureAndBrightness {
  @IsInt()
  @Min(2200)
  @Max(6500)
  temp?: number;
  @IsInt()
  @Min(10)
  @Max(100)
  dimming?: number;

  constructor(temperature: number, brightness: number) {
    this.temp = temperature;
    this.dimming = brightness;
  }
}

/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
export class SetPilotParametersColorTemperature {
  @IsInt()
  @Min(2200)
  @Max(6500)
  temp?: number;

  constructor(temperature: number) {
    this.temp = temperature;
  }
}

export type SetPilotParams =
  | SetPilotParametersColor
  | SetPilotParametersColorAndBrightness
  | SetPilotParametersColorTemperature
  | SetPilotParametersColorTemperatureAndBrightness
  | SetPilotParametersDimming
  | SetPilotParametersScene
  | SetPilotParametersSceneAndBrightness
  | SetPilotParametersSpeed
  | SetPilotParametersStatus;

export class SetPilotMessage {
  method: "setPilot";
  version: number;
  id: number;
  @ValidateNested() params: SetPilotParams;

  constructor() {
    this.method = networkConstants.setPilotMethod;
    this.id = Math.floor(Math.random() * 10000 + 1);
    this.version = 1;
  }
  /**
   * Constructs dimming control message
   * @param dimming - Integer, valid range is 10-100
   */
  static buildDimmingControlMessage(dimming: number): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersDimming(dimming);
    return msg;
  }

  /**
   * Constructs status control message
   * @param status - Boolean, true - turn the lamp on, false - off
   */
  static buildStatusControlMessage(status: boolean): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersStatus(status);
    return msg;
  }

  /**
   * Constructs scene control message
   * @param scene - Scene object, from the list of static scenes
   */
  static buildSceneControlMessage(scene: Scene): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersScene(scene.sceneId);
    return msg;
  }

  /**
   * Constructs scene control message
   * @param scene - Scene object, from the list of static scenes
   * @param dimming - Integer, valid range is 10-100
   */
  static buildSceneAndBrightnessControlMessage(
    scene: Scene,
    dimming: number,
  ): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersSceneAndBrightness(
      scene.sceneId,
      dimming,
    );
    return msg;
  }

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
  static buildColorControlMessage(
    red: number,
    green: number,
    blue: number,
    coolWhiteLevel: number,
    warmWhiteLevel: number,
  ) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersColor(
      red,
      green,
      blue,
      coolWhiteLevel,
      warmWhiteLevel,
    );
    return msg;
  }

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
  static buildColorAndBrightnessControlMessage(
    red: number,
    green: number,
    blue: number,
    coolWhiteLevel: number,
    warmWhiteLevel: number,
    dimming: number,
  ) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersColorAndBrightness(
      red,
      green,
      blue,
      coolWhiteLevel,
      warmWhiteLevel,
      dimming,
    );
    return msg;
  }

  /**
   * Constructs color temperature control message.
   * @param colorTemperature - Integer, valid range 2200-6500
   */
  static buildColorTemperatureControlMessage(colorTemperature: number) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersColorTemperature(colorTemperature);
    return msg;
  }

  /**
   * Constructs color temperature control message.
   * @param colorTemperature - Integer, valid range 2200-6500
   * @param dimming - Integer, valid range is 10-100
   */
  static buildColorTemperatureAndBrightnessControlMessage(
    colorTemperature: number,
    dimming: number,
  ) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersColorTemperatureAndBrightness(
      colorTemperature,
      dimming,
    );
    return msg;
  }

  /**
   * Constructs playing speed control message.
   * Valid only for dynamic scenes
   * @param speed Playing speed, valid range 20-200
   */
  static buildSpeedControlMessage(speed: number) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersSpeed(speed);
    return msg;
  }
}

/**
 * Set system config messages parameters for request
 */
export class SetSystemConfigParameters {
  @IsOptional()
  @IsString()
  env?: string;
  @IsInt()
  systemConfigTs: number;
  @IsOptional()
  @IsString()
  moduleName?: string;

  constructor(
    environment: string | undefined,
    moduleName: string | undefined,
  ) {
    if (environment != undefined) {
      this.env = environment;
    }
    if (moduleName != undefined) {
      this.moduleName = moduleName;
    }
    this.systemConfigTs = 0;
  }
}

export class SetSystemConfigMessage {
  method: "setSystemConfig";
  version: number;
  id: number;
  @ValidateNested() params: SetSystemConfigParameters;

  constructor() {
    this.method = networkConstants.setSystemConfigMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }
  /**
   * Constructs firmware update message
   */
  static buildSetEnvironmentMessage(
    environment: string,
  ): SetSystemConfigMessage {
    const msg = new SetSystemConfigMessage();
    msg.params = new SetSystemConfigParameters(environment, undefined);
    return msg;
  }
  /**
   * Constructs changing of module name message
   */
  static buildSetModuleNameMessage(
    moduleName: string,
  ): SetSystemConfigMessage {
    const msg = new SetSystemConfigMessage();
    msg.params = new SetSystemConfigParameters(undefined, moduleName);
    return msg;
  }
}

/**
 * Update firmware messages parameters for request
 */
export class UpdateFirmwareParameters {
  @IsString()
  fw: string;
  @IsInt()
  @Min(0)
  @Max(1)
  force: number;

  constructor() {
    this.fw = "default";
    this.force = 1;
  }
}

export class UpdateFirmwareMessage {
  method: "updateOta";
  version: number;
  id: number;
  @ValidateNested() params: UpdateFirmwareParameters;

  constructor() {
    this.method = networkConstants.updateOtaMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }
  /**
   * Constructs firmware update message
   */
  static buildUpdateFirmwareMessage(): UpdateFirmwareMessage {
    const msg = new UpdateFirmwareMessage();
    msg.params = new UpdateFirmwareParameters();
    return msg;
  }
}

export class ResetMessage {
  method: "reset";
  version: number;
  id: number;

  constructor() {
    this.method = networkConstants.resetMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }
  /**
   * Constructs reset message
   */
  static buildResetMessage(): ResetMessage {
    const msg = new ResetMessage();
    return msg;
  }
}

export class RebootMessage {
  method: "reboot";
  version: number;
  id: number;

  constructor() {
    this.method = networkConstants.rebootMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }
  /**
   * Constructs reboot message
   */
  static buildRebootMessage(): RebootMessage {
    const msg = new RebootMessage();
    return msg;
  }
}

/**
 * Message broadcasted by the light after booting,
 * way to inform nearby devices about its presence
 */
export type FirstBeatMessage = {
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
export class RegistrationMessage {
  method: "registration";
  version: number;
  id: number;
  params: {
    register: boolean;
    phoneMac: string;
    phoneIp: string;
  };
  constructor(ip: string, mac: string) {
    this.method = networkConstants.registrationMethod;
    this.id = Math.floor(Math.random() * 10000 + 1);
    this.version = 1;
    this.params = {
      register: true,
      phoneIp: ip,
      phoneMac: mac,
    };
  }
}

/**
 * WiZ Light system configuration (fwVersion for example)
 */
export type GetSystemConfigResponse = {
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
export class GetSystemConfigMessage {
  method: "getSystemConfig";
  version: number;
  id: number;
  constructor(ip: string) {
    this.method = networkConstants.getSystemConfigMethod;
    this.id = Math.floor(Math.random() * 10000 + 1);
    this.version = 1;
  }
}

export type WiZControlMessage =
  | SetPilotMessage
  | SyncPilotAckMessage
  | RegistrationMessage
  | UpdateFirmwareMessage
  | GetSystemConfigMessage
  | SetSystemConfigMessage
  | ResetMessage
  | RebootMessage;

export type WiZMessage =
  | GetPilotMessage
  | SetPilotMessage
  | SyncPilotMessage
  | FirstBeatMessage
  | RegistrationMessage
  | UpdateFirmwareMessage
  | SetSystemConfigMessage
  | ResetMessage
  | RebootMessage;

export type WiZMessageResponse = GetSystemConfigResponse;

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
];

export type Color = {
  red: number;
  green: number;
  blue: number;
};
