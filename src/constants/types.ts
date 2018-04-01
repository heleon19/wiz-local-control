import * as networkConstants from "../constants/communication";

/**
 * Scene type – built in the bulb scenes. Could be one of the scenes listed 
 * in staticScenes const
 */
export type Scene = {
  type: "scene",
  sceneId: number,
  name: string,
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
    type: "color",
    r: number,
    g: number,
    b: number,
    cw: number,
    ww: number
  }
  | {
    type: "temperature",
    colorTemperature: number
  };

export type SyncPilotMessage = {
  method: "syncPilot",
  id: number,
  env: string,
  timestamp: Date,
  ip: string,
  params: {
    r?: number,
    g?: number,
    b?: number,
    w?: number,
    c?: number,
    state?: boolean,
    sceneId?: number,
    temp?: number,
    dimming?: number,
    rssi: number,
    mac: string
  }
};

export type SyncPilotAckMessage = {
  method: "syncPilot",
  id: number,
  env: string,
  result: {
    mac: string
  }
};

export type GetPilotMessage = {
  method: "getPilot",
  version: number,
  id: number
};

export class SetPilotMessage {
  method: "setPilot";
  version: number;
  id: number;
  params: {
    r?: number,
    g?: number,
    b?: number,
    w?: number,
    c?: number,
    state?: boolean,
    sceneId?: number,
    speed?: number,
    temp?: number,
    dimming?: number
  };

  static buildDimmingControlMessage(dimming: number): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      dimming
    };
    return msg;
  }

  static buildStatusControlMessage(status: boolean): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      state: status
    };
    return msg;
  }

  static buildSceneControlMessage(scene: Scene): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      sceneId: scene.sceneId
    };
    return msg;
  }

  static buildColorControlMessage(
    red: number,
    green: number,
    blue: number,
    whiteLevel: number
  ) {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      r: red,
      g: green,
      b: blue
    };
    return msg;
  }

  static buildColorTemperatureControlMessage(colorTemperature: number) {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      temp: colorTemperature
    };
    return msg;
  }
}

export type FirstBeatMessage = {
  method: "firstBeat",
  id: number,
  env: string,
  params: {
    mac: string,
    fwVersion: string
  }
};

export class RegistrationMessage {
  method: "registration";
  version: number;
  id: number;
  params: {
    register: boolean,
    phoneMac: string,
    phoneIp: string
  };
  constructor(ip: string, mac: string) {
    this.method = networkConstants.registrationMethod;
    this.id = Math.floor(Math.random() * 10000 + 1);
    this.version = 1;
    this.params = {
      register: true,
      phoneIp: ip,
      phoneMac: mac
    };
  }
}

export type WiZControlMessage =
  | SetPilotMessage
  | SyncPilotAckMessage;

export type WiZMessage =
  | GetPilotMessage
  | SetPilotMessage
  | SyncPilotMessage
  | FirstBeatMessage
  | RegistrationMessage;

export type Result =
  | {
    type: "success"
  }
  | {
    type: "error",
    message: string
  };


export const staticScenes: Array<LightMode> = [
  {
    type: "scene",
    sceneId: 1,
    name: "Ocean"
  },
  {
    type: "scene",
    sceneId: 2,
    name: "Romance"
  },
  {
    type: "scene",
    sceneId: 3,
    name: "Sunset"
  },
  {
    type: "scene",
    sceneId: 4,
    name: "Party"
  },
  {
    type: "scene",
    sceneId: 5,
    name: "Fireplace"
  },
  {
    type: "scene",
    sceneId: 6,
    name: "Cozy"
  },
  {
    type: "scene",
    sceneId: 7,
    name: "Forest"
  },
  {
    type: "scene",
    sceneId: 8,
    name: "Pastel colors"
  },
  {
    type: "scene",
    sceneId: 9,
    name: "Wake up"
  },
  {
    type: "scene",
    sceneId: 10,
    name: "Bedtime"
  },
  {
    type: "scene",
    sceneId: 11,
    name: "Warm white"
  },
  {
    type: "scene",
    sceneId: 12,
    name: "Daylight"
  },
  {
    type: "scene",
    sceneId: 13,
    name: "Cool white"
  },
  {
    type: "scene",
    sceneId: 14,
    name: "Night Light"
  },
  {
    type: "scene",
    sceneId: 15,
    name: "Focus"
  },
  {
    type: "scene",
    sceneId: 16,
    name: "Relax"
  },
  {
    type: "scene",
    sceneId: 17,
    name: "True colors"
  },
  {
    type: "scene",
    sceneId: 18,
    name: "TV Time"
  },
  {
    type: "scene",
    sceneId: 19,
    name: "Plant growth"
  },
  {
    type: "scene",
    sceneId: 20,
    name: "Spring"
  },
  {
    type: "scene",
    sceneId: 21,
    name: "Summer"
  },
  {
    type: "scene",
    sceneId: 22,
    name: "Fall"
  },
  {
    type: "scene",
    sceneId: 23,
    name: "Deep dive"
  },
  {
    type: "scene",
    sceneId: 24,
    name: "Jungle"
  },
  {
    type: "scene",
    sceneId: 25,
    name: "Mojito"
  },
  {
    type: "scene",
    sceneId: 26,
    name: "Club"
  },
  {
    type: "scene",
    sceneId: 27,
    name: "Christmas"
  },
  {
    type: "scene",
    sceneId: 28,
    name: "Halloween"
  },
];

export type Color = {
  red: number,
  green: number,
  blue: number
};
