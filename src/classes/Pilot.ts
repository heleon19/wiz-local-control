import { IsInt, Max, Min, ValidateNested } from "class-validator";
import * as networkConstants from "../constants";
import { Scene } from "./LightMode";

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
  @Max(32)
  sceneId?: number;

  constructor(sceneId: number) {
    this.sceneId = sceneId;
  }
}

/**
 * Set Pilot messages parameters for ratio
 */
export class SetPilotParametersRatio {
  @IsInt()
  @Min(0)
  @Max(100)
  ratio?: number;

  constructor(ratio: number) {
    this.ratio = ratio;
  }
}

/**
 * Set Pilot messages parameters for scene and brightness
 */
export class SetPilotParametersSceneAndBrightness {
  @IsInt()
  @Min(1)
  @Max(32)
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
  @Min(2000)
  @Max(9000)
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
  @Min(2000)
  @Max(9000)
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
  | SetPilotParametersStatus
  | SetPilotParametersRatio;

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
   * @param colorTemperature - Integer, valid range 2000-9000
   */
  static buildColorTemperatureControlMessage(colorTemperature: number) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersColorTemperature(colorTemperature);
    return msg;
  }

  /**
   * Constructs color temperature control message.
   * @param colorTemperature - Integer, valid range 2000-9000
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

  /**
   * Constructs ratio control message
   * @param ratio - Ratio between zones brightess, number in range 0..100
   */
  static buildRatioControlMessage(ratio: number) {
    const msg = new SetPilotMessage();
    msg.params = new SetPilotParametersRatio(ratio);
    return msg;
  }
}
