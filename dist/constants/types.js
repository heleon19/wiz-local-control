"use strict";
// @flow
Object.defineProperty(exports, "__esModule", { value: true });
const networkConstants = require("../constants/communication");
class Light {
    constructor(mac) {
        this.mac = mac;
    }
    set lightMode(lightMode) {
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
exports.Light = Light;
class SetPilotMessage {
    static buildDimmingControlMessage(dimming) {
        const msg = new SetPilotMessage();
        msg.method = networkConstants.setPilotMethod;
        msg.id = Math.floor(Math.random() * 10000 + 1);
        msg.version = 1;
        msg.params = {
            dimming
        };
        return msg;
    }
    static buildStatusControlMessage(status) {
        const msg = new SetPilotMessage();
        msg.method = networkConstants.setPilotMethod;
        msg.id = Math.floor(Math.random() * 10000 + 1);
        msg.version = 1;
        msg.params = {
            state: status
        };
        return msg;
    }
    static buildSceneControlMessage(sceneId) {
        const msg = new SetPilotMessage();
        msg.method = networkConstants.setPilotMethod;
        msg.id = Math.floor(Math.random() * 10000 + 1);
        msg.version = 1;
        msg.params = {
            sceneId
        };
        return msg;
    }
    static buildColorControlMessage(red, green, blue, whiteLevel) {
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
    static buildColorTemperatureControlMessage(colorTemperature) {
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
exports.SetPilotMessage = SetPilotMessage;
class RegistrationMessage {
    constructor(ip, mac) {
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
exports.RegistrationMessage = RegistrationMessage;
// light mode
exports.staticScenes = [
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
//# sourceMappingURL=types.js.map