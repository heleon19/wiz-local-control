import * as networkConstants from "../constants/communication";

export class Light {
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

  constructor(mac: string) {
    this.mac = mac;
  }

  set lightMode(lightMode: LightMode) {
    switch (lightMode.type) {
      case "scene":
        this.sceneId = lightMode.sceneId;
        break;
      case "temperature":
        this.colorTemperature = lightMode.colorTemperature;
        break;
      case "color":
        this.r = lightMode.r;
        this.g = lightMode.g;
        this.b = lightMode.b;
        this.cw = lightMode.cw;
        this.ww = lightMode.ww;
        break;
      default:
        break;
    }
  }
}

export type LightsState = {
  lights: Array<Light>
};

export type LightManufacturingData = {
  mac: string,
  modelId: number,
  model_name: string,
  type: number,
  productionDate: Date
};

export type LightModel = {
  id: number,
  name: string,
  image: {
    url: string,
    loading: boolean,
    localPath: string,
    urlExpiryDate: Date
  }
};

export type Scene = {
  type: "scene",
  sceneId: number,
  name: string,
};
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

  static buildSceneControlMessage(sceneId: number): SetPilotMessage {
    const msg = new SetPilotMessage();
    msg.method = networkConstants.setPilotMethod;
    msg.id = Math.floor(Math.random() * 10000 + 1);
    msg.version = 1;
    msg.params = {
      sceneId
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
      // ww: whiteLevel,
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

// light mode

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
  }
];

export type Color = {
  red: number,
  green: number,
  blue: number
};
