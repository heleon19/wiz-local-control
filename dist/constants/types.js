"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const networkConstants = require("../constants/communication");
const class_validator_1 = require("class-validator");
/**
 * Control message sent to the lamp to change its status
 * (current scene, color, dimming, state, etc.)
 */
class SetPilotParams {
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParams.prototype, "r", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParams.prototype, "g", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParams.prototype, "b", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParams.prototype, "w", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParams.prototype, "c", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.Max(28)
], SetPilotParams.prototype, "sceneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(20),
    class_validator_1.Max(200)
], SetPilotParams.prototype, "speed", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(2200),
    class_validator_1.Max(6500)
], SetPilotParams.prototype, "temp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(100)
], SetPilotParams.prototype, "dimming", void 0);
exports.SetPilotParams = SetPilotParams;
class SetPilotMessage {
    constructor() {
        this.method = networkConstants.setPilotMethod;
        this.id = Math.floor(Math.random() * 10000 + 1);
        this.version = 1;
    }
    /**
     * Constructs dimming control message
     * @param dimming - Integer, valid range is 10-100
     */
    static buildDimmingControlMessage(dimming) {
        const msg = new SetPilotMessage();
        msg.params = {
            dimming,
        };
        return msg;
    }
    /**
     * Constructs status control message
     * @param status - Boolean, true - turn the lamp on, false - off
     */
    static buildStatusControlMessage(status) {
        const msg = new SetPilotMessage();
        msg.params = {
            state: status,
        };
        return msg;
    }
    /**
     * Constructs scene control message
     * @param scene - Scene object, from the list of static scenes
     */
    static buildSceneControlMessage(scene) {
        const msg = new SetPilotMessage();
        msg.params = {
            sceneId: scene.sceneId,
        };
        return msg;
    }
    /**
     * Constructs color control message.
     * Valid combinations: R+G+B, R+G+W, G+B+W. R+B+W.
     * R+G+B+W could not be played due to limitations in the light engine
     * @param red - Integer, valid range 0-255
     * @param green - Integer, valid range 0-255
     * @param blue - Integer, valid range 0-255
     * @param whiteLevel - Integer, valid range 0-255
     */
    static buildColorControlMessage(red, green, blue, whiteLevel) {
        const msg = new SetPilotMessage();
        msg.params = {
            r: red,
            g: green,
            b: blue,
        };
        return msg;
    }
    /**
     * Constructs color temperature control message.
     * @param colorTemperature - Integer, valid range 2200-6500
     */
    static buildColorTemperatureControlMessage(colorTemperature) {
        const msg = new SetPilotMessage();
        msg.params = {
            temp: colorTemperature,
        };
        return msg;
    }
    /**
     * Constructs playing speed control message.
     * Valid only for dynamic scenes
     * @param speed Playing speed, valid range 20-200
     */
    static buildSpeedControlMessage(speed) {
        const msg = new SetPilotMessage();
        msg.params = {
            temp: speed,
        };
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], SetPilotMessage.prototype, "params", void 0);
exports.SetPilotMessage = SetPilotMessage;
/**
 * Message sent by device to the lamp (via broadcast or unicast)
 * Lamp will add specified IP to the list devices that it notifies on status change using
 * SyncPilot messages
 */
class RegistrationMessage {
    constructor(ip, mac) {
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
exports.RegistrationMessage = RegistrationMessage;
exports.staticScenes = [
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
//# sourceMappingURL=types.js.map