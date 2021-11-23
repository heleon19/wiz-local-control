"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetPilotMessage = exports.SetPilotParametersColorTemperature = exports.SetPilotParametersColorTemperatureAndBrightness = exports.SetPilotParametersSpeed = exports.SetPilotParametersDimming = exports.SetPilotParametersStatus = exports.SetPilotParametersSceneAndBrightness = exports.SetPilotParametersRatio = exports.SetPilotParametersScene = exports.SetPilotParametersColorAndBrightness = exports.SetPilotParametersColor = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
/**
 * Set Pilot messages parameters for changing color
 */
class SetPilotParametersColor {
    constructor(r, g, b, coolWhiteLevel, warmWhiteLevel) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.w = warmWhiteLevel;
        this.c = coolWhiteLevel;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColor.prototype, "r", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColor.prototype, "g", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColor.prototype, "b", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColor.prototype, "w", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColor.prototype, "c", void 0);
exports.SetPilotParametersColor = SetPilotParametersColor;
/**
 * Set Pilot messages parameters for changing color and brightness
 */
class SetPilotParametersColorAndBrightness {
    constructor(r, g, b, coolWhiteLevel, warmWhiteLevel, brightness) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.w = warmWhiteLevel;
        this.c = coolWhiteLevel;
        this.dimming = brightness;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColorAndBrightness.prototype, "r", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColorAndBrightness.prototype, "g", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColorAndBrightness.prototype, "b", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColorAndBrightness.prototype, "w", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], SetPilotParametersColorAndBrightness.prototype, "c", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100)
], SetPilotParametersColorAndBrightness.prototype, "dimming", void 0);
exports.SetPilotParametersColorAndBrightness = SetPilotParametersColorAndBrightness;
/**
 * Set Pilot messages parameters for scene
 */
class SetPilotParametersScene {
    constructor(sceneId) {
        this.sceneId = sceneId;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(32)
], SetPilotParametersScene.prototype, "sceneId", void 0);
exports.SetPilotParametersScene = SetPilotParametersScene;
/**
 * Set Pilot messages parameters for ratio
 */
class SetPilotParametersRatio {
    constructor(ratio) {
        this.ratio = ratio;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100)
], SetPilotParametersRatio.prototype, "ratio", void 0);
exports.SetPilotParametersRatio = SetPilotParametersRatio;
/**
 * Set Pilot messages parameters for scene and brightness
 */
class SetPilotParametersSceneAndBrightness {
    constructor(sceneId, brightness) {
        this.sceneId = sceneId;
        this.dimming = brightness;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(32)
], SetPilotParametersSceneAndBrightness.prototype, "sceneId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100)
], SetPilotParametersSceneAndBrightness.prototype, "dimming", void 0);
exports.SetPilotParametersSceneAndBrightness = SetPilotParametersSceneAndBrightness;
/**
 * Set Pilot messages parameters for status
 */
class SetPilotParametersStatus {
    constructor(status) {
        this.state = status;
    }
}
exports.SetPilotParametersStatus = SetPilotParametersStatus;
/**
 * Set Pilot messages parameters for changing dimming
 */
class SetPilotParametersDimming {
    constructor(dimming) {
        this.dimming = dimming;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100)
], SetPilotParametersDimming.prototype, "dimming", void 0);
exports.SetPilotParametersDimming = SetPilotParametersDimming;
/**
 * Set Pilot messages parameters for changing speed
 */
class SetPilotParametersSpeed {
    constructor(speed) {
        this.speed = speed;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(20),
    (0, class_validator_1.Max)(200)
], SetPilotParametersSpeed.prototype, "speed", void 0);
exports.SetPilotParametersSpeed = SetPilotParametersSpeed;
/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
class SetPilotParametersColorTemperatureAndBrightness {
    constructor(temperature, brightness) {
        this.temp = temperature;
        this.dimming = brightness;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(9000)
], SetPilotParametersColorTemperatureAndBrightness.prototype, "temp", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(100)
], SetPilotParametersColorTemperatureAndBrightness.prototype, "dimming", void 0);
exports.SetPilotParametersColorTemperatureAndBrightness = SetPilotParametersColorTemperatureAndBrightness;
/**
 * Set Pilot messages parameters for changing color temperature and brightness
 */
class SetPilotParametersColorTemperature {
    constructor(temperature) {
        this.temp = temperature;
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(2000),
    (0, class_validator_1.Max)(9000)
], SetPilotParametersColorTemperature.prototype, "temp", void 0);
exports.SetPilotParametersColorTemperature = SetPilotParametersColorTemperature;
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
        msg.params = new SetPilotParametersDimming(dimming);
        return msg;
    }
    /**
     * Constructs status control message
     * @param status - Boolean, true - turn the lamp on, false - off
     */
    static buildStatusControlMessage(status) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersStatus(status);
        return msg;
    }
    /**
     * Constructs scene control message
     * @param scene - Scene object, from the list of static scenes
     */
    static buildSceneControlMessage(scene) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersScene(scene.sceneId);
        return msg;
    }
    /**
     * Constructs scene control message
     * @param scene - Scene object, from the list of static scenes
     * @param dimming - Integer, valid range is 10-100
     */
    static buildSceneAndBrightnessControlMessage(scene, dimming) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersSceneAndBrightness(scene.sceneId, dimming);
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
    static buildColorControlMessage(red, green, blue, coolWhiteLevel, warmWhiteLevel) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersColor(red, green, blue, coolWhiteLevel, warmWhiteLevel);
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
    static buildColorAndBrightnessControlMessage(red, green, blue, coolWhiteLevel, warmWhiteLevel, dimming) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersColorAndBrightness(red, green, blue, coolWhiteLevel, warmWhiteLevel, dimming);
        return msg;
    }
    /**
     * Constructs color temperature control message.
     * @param colorTemperature - Integer, valid range 2000-9000
     */
    static buildColorTemperatureControlMessage(colorTemperature) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersColorTemperature(colorTemperature);
        return msg;
    }
    /**
     * Constructs color temperature control message.
     * @param colorTemperature - Integer, valid range 2000-9000
     * @param dimming - Integer, valid range is 10-100
     */
    static buildColorTemperatureAndBrightnessControlMessage(colorTemperature, dimming) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersColorTemperatureAndBrightness(colorTemperature, dimming);
        return msg;
    }
    /**
     * Constructs playing speed control message.
     * Valid only for dynamic scenes
     * @param speed Playing speed, valid range 20-200
     */
    static buildSpeedControlMessage(speed) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersSpeed(speed);
        return msg;
    }
    /**
     * Constructs ratio control message
     * @param ratio - Ratio between zones brightess, number in range 0..100
     */
    static buildRatioControlMessage(ratio) {
        const msg = new SetPilotMessage();
        msg.params = new SetPilotParametersRatio(ratio);
        return msg;
    }
}
__decorate([
    (0, class_validator_1.ValidateNested)()
], SetPilotMessage.prototype, "params", void 0);
exports.SetPilotMessage = SetPilotMessage;
//# sourceMappingURL=Pilot.js.map