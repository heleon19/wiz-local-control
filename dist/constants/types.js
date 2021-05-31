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
const helpers_1 = require("../helpers");
/**
 * MQTT connection status,
 * lamp will report it under some certain testing conditions
 */
var MQTTConnectionStatus;
(function (MQTTConnectionStatus) {
    MQTTConnectionStatus[MQTTConnectionStatus["Success"] = 0] = "Success";
    MQTTConnectionStatus[MQTTConnectionStatus["LibraryError"] = -1] = "LibraryError";
    MQTTConnectionStatus[MQTTConnectionStatus["NetworkConnectionError"] = -2] = "NetworkConnectionError";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMissing"] = -3] = "MQTTServerCertMissing";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMalformed"] = -4] = "MQTTServerCertMalformed";
    MQTTConnectionStatus[MQTTConnectionStatus["HandshakeError"] = -5] = "HandshakeError";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMismatch"] = -6] = "MQTTServerCertMismatch";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTLibraryError"] = 1] = "MQTTLibraryError";
    MQTTConnectionStatus[MQTTConnectionStatus["NoCredentials"] = 2] = "NoCredentials";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTClientInitFailure"] = 3] = "MQTTClientInitFailure";
    MQTTConnectionStatus[MQTTConnectionStatus["ErrorLoadingPasswordFromFlash"] = 4] = "ErrorLoadingPasswordFromFlash";
    MQTTConnectionStatus[MQTTConnectionStatus["PasswordError"] = 5] = "PasswordError";
})(MQTTConnectionStatus = exports.MQTTConnectionStatus || (exports.MQTTConnectionStatus = {}));
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
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColor.prototype, "r", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColor.prototype, "g", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColor.prototype, "b", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColor.prototype, "w", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColorAndBrightness.prototype, "r", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColorAndBrightness.prototype, "g", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColorAndBrightness.prototype, "b", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColorAndBrightness.prototype, "w", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], SetPilotParametersColorAndBrightness.prototype, "c", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(100)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.Max(32)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(100)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(1),
    class_validator_1.Max(32)
], SetPilotParametersSceneAndBrightness.prototype, "sceneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(100)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(100)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(20),
    class_validator_1.Max(200)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(2000),
    class_validator_1.Max(9000)
], SetPilotParametersColorTemperatureAndBrightness.prototype, "temp", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(10),
    class_validator_1.Max(100)
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
    class_validator_1.IsInt(),
    class_validator_1.Min(2000),
    class_validator_1.Max(9000)
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
    class_validator_1.ValidateNested()
], SetPilotMessage.prototype, "params", void 0);
exports.SetPilotMessage = SetPilotMessage;
/**
 * Set system config messages parameters for request
 */
class SetSystemConfigParameters {
    constructor(parameters) {
        if (parameters.environment != undefined) {
            this.env = parameters.environment;
        }
        if (parameters.moduleName != undefined) {
            this.moduleName = parameters.moduleName;
        }
        if (parameters.extendedWhiteFactor != undefined) {
            this.ewf = parameters.extendedWhiteFactor;
        }
        if (parameters.pwmRefreshRate != undefined) {
            this.pwmConf = helpers_1.convertPWMRefreshRateToPWMConf(parameters.pwmRefreshRate);
        }
        if (parameters.whiteChannels != undefined &&
            parameters.whiteToColorsRatio != undefined) {
            this.drvConf = [parameters.whiteToColorsRatio, parameters.whiteChannels];
        }
        if (parameters.ewf != undefined) {
            this.ewf = parameters.ewf;
        }
        if (parameters.fs != undefined) {
            this.fs = parameters.fs;
        }
        if (parameters.drvConf != undefined) {
            this.drvConf = parameters.drvConf;
        }
        this.systemConfigTs = 0;
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString()
], SetSystemConfigParameters.prototype, "env", void 0);
__decorate([
    class_validator_1.IsInt()
], SetSystemConfigParameters.prototype, "systemConfigTs", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString()
], SetSystemConfigParameters.prototype, "moduleName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString()
], SetSystemConfigParameters.prototype, "ewf", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString()
], SetSystemConfigParameters.prototype, "pwmConf", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray()
], SetSystemConfigParameters.prototype, "drvConf", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SetSystemConfigParameters.prototype, "fs", void 0);
exports.SetSystemConfigParameters = SetSystemConfigParameters;
class SetSystemConfigMessage {
    constructor() {
        this.method = networkConstants.setSystemConfigMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs firmware update message
     */
    static buildSetEnvironmentMessage(environment) {
        const msg = new SetSystemConfigMessage();
        msg.params = new SetSystemConfigParameters({
            environment,
        });
        return msg;
    }
    /**
     * Constructs changing of module name message
     */
    static buildSetModuleNameMessage(moduleName) {
        const msg = new SetSystemConfigMessage();
        msg.params = new SetSystemConfigParameters({
            moduleName,
        });
        return msg;
    }
    /**
     * Constructs update ewf message
     */
    static buildSetExtendedWhiteFactorMessage(extendedWhiteFactor) {
        const msg = new SetSystemConfigMessage();
        msg.params = new SetSystemConfigParameters({
            extendedWhiteFactor,
        });
        return msg;
    }
    /**
     * Constructs general message
     */
    static buildSetSystemConfigMessage(parameters) {
        const msg = new SetSystemConfigMessage();
        msg.params = new SetSystemConfigParameters(parameters);
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], SetSystemConfigMessage.prototype, "params", void 0);
exports.SetSystemConfigMessage = SetSystemConfigMessage;
/**
 * Set system config messages parameters for request
 */
class SetUserConfigParameters {
    constructor(parameters) {
        if (parameters.whiteTemperatureMin != undefined &&
            parameters.whiteTemperatureMax != undefined) {
            this.whiteRange = [
                parameters.whiteTemperatureMin,
                parameters.whiteTemperatureMax,
            ];
        }
        if (parameters.extendedTemperatureMin != undefined &&
            parameters.extendedTemperatureMax != undefined) {
            this.extRange = [
                parameters.extendedTemperatureMin,
                parameters.extendedTemperatureMax,
            ];
        }
        if (parameters.pwmMin != undefined && parameters.pwmMax != undefined) {
            this.pwmRange = [parameters.pwmMin, parameters.pwmMax];
        }
        if (parameters.pwmRange != undefined) {
            this.pwmRange = parameters.pwmRange;
        }
        if (parameters.whiteRange != undefined) {
            this.whiteRange = parameters.whiteRange;
        }
        if (parameters.extRange != undefined) {
            this.extRange = parameters.extRange;
        }
        this.dftDim = parameters.dftDim || 100;
        this.startupMode = parameters.startupMode || "wizclick";
        this.userConfigTs = 0;
    }
}
__decorate([
    class_validator_1.IsInt()
], SetUserConfigParameters.prototype, "userConfigTs", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray()
], SetUserConfigParameters.prototype, "whiteRange", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray()
], SetUserConfigParameters.prototype, "extRange", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsArray()
], SetUserConfigParameters.prototype, "pwmRange", void 0);
__decorate([
    class_validator_1.IsInt()
], SetUserConfigParameters.prototype, "dftDim", void 0);
__decorate([
    class_validator_1.IsString()
], SetUserConfigParameters.prototype, "startupMode", void 0);
exports.SetUserConfigParameters = SetUserConfigParameters;
class SetUserConfigMessage {
    constructor() {
        this.method = networkConstants.setUserConfigMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs temperature range update message
     */
    static buildSetTemperatureRangeMessage(whiteTemperatureMin, whiteTemperatureMax, extendedTemperatureMin, extendedTemperatureMax) {
        const msg = new SetUserConfigMessage();
        msg.params = new SetUserConfigParameters({
            whiteTemperatureMin,
            whiteTemperatureMax,
            extendedTemperatureMin,
            extendedTemperatureMax,
        });
        return msg;
    }
    /**
     * Constructs SetUserConfig message
     */
    static buildSetUserConfigMessage(parameters) {
        const msg = new SetUserConfigMessage();
        msg.params = new SetUserConfigParameters(parameters);
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], SetUserConfigMessage.prototype, "params", void 0);
exports.SetUserConfigMessage = SetUserConfigMessage;
/**
 * Update firmware messages parameters for request
 */
class UpdateFirmwareParameters {
    constructor(firmwareVersion) {
        this.fw = firmwareVersion || "default";
        this.force = 1;
    }
}
__decorate([
    class_validator_1.IsString()
], UpdateFirmwareParameters.prototype, "fw", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(1)
], UpdateFirmwareParameters.prototype, "force", void 0);
exports.UpdateFirmwareParameters = UpdateFirmwareParameters;
class UpdateFirmwareMessage {
    constructor() {
        this.method = networkConstants.updateOtaMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs firmware update message
     */
    static buildUpdateFirmwareMessage(firmwareVersion) {
        const msg = new UpdateFirmwareMessage();
        msg.params = new UpdateFirmwareParameters(firmwareVersion);
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], UpdateFirmwareMessage.prototype, "params", void 0);
exports.UpdateFirmwareMessage = UpdateFirmwareMessage;
class FavoriteLightMode {
    constructor() {
        this.sceneId = 0;
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.ww = 0;
        this.cw = 0;
        this.temperature = 0;
    }
    /**
     * Builds favorite light mode for the Scene (dynamic or static)
     * @param scene Scene that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param speed Speed level (for dynamic light modes)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForScene(scene, dimming, speed, ratio) {
        const favorite = new FavoriteLightMode();
        favorite.sceneId = scene.sceneId;
        favorite.dim = dimming;
        favorite.spd = speed;
        favorite.ratio = ratio;
        return favorite;
    }
    /**
     * Builds favorite light mode for Color
     * @param color Color definition that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForColor(color, dimming, ratio) {
        const favorite = new FavoriteLightMode();
        favorite.r = color.r;
        favorite.g = color.g;
        favorite.b = color.b;
        favorite.cw = color.cw;
        favorite.ww = color.ww;
        favorite.dim = dimming;
        favorite.ratio = ratio;
        return favorite;
    }
    /**
     * Builds favorite light mode for Temperature
     * @param cct Temperature definition that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForTemperature(cct, dimming, ratio) {
        const favorite = new FavoriteLightMode();
        favorite.temperature = cct.colorTemperature;
        favorite.dim = dimming;
        favorite.ratio = ratio;
        return favorite;
    }
    /**
     * Builds favorite light mode for Turning light On or Off as a favorite
     * @param onOff Should the light been turned on or off
     */
    static buildFavoriteForOnOff(onOff) {
        const favorite = new FavoriteLightMode();
        favorite.sceneId = onOff ? 254 : 0;
        return favorite;
    }
    /**
     * Builds favorite light mode for keeping previous mode when applying a favorite
     */
    static buildFavoriteForDoNothing() {
        const favorite = new FavoriteLightMode();
        favorite.sceneId = 255;
        return favorite;
    }
    extractLightModeArray() {
        return [
            this.sceneId,
            this.r,
            this.g,
            this.b,
            this.cw,
            this.ww,
            this.temperature,
        ];
    }
    extractOptObject() {
        return {
            dim: this.dim,
            spd: this.spd,
            ratio: this.ratio,
        };
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "sceneId", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "r", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "g", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "b", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "ww", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(255)
], FavoriteLightMode.prototype, "cw", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0)
], FavoriteLightMode.prototype, "temperature", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(100)
], FavoriteLightMode.prototype, "dim", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(50),
    class_validator_1.Max(200)
], FavoriteLightMode.prototype, "spd", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(100)
], FavoriteLightMode.prototype, "ratio", void 0);
exports.FavoriteLightMode = FavoriteLightMode;
class SetFavoritesParameters {
    constructor() {
        this.favConfigTs = 0;
    }
    static buildFromFavorites(favorite1, favorite2, favorite3, favorite4) {
        const params = new SetFavoritesParameters();
        params.favs = [
            favorite1.extractLightModeArray(),
            favorite2.extractLightModeArray(),
            favorite3.extractLightModeArray(),
            favorite4.extractLightModeArray(),
        ];
        params.opts = [
            favorite1.extractOptObject(),
            favorite2.extractOptObject(),
            favorite3.extractOptObject(),
            favorite4.extractOptObject(),
        ];
        return params;
    }
}
__decorate([
    class_validator_1.IsArray()
], SetFavoritesParameters.prototype, "favs", void 0);
__decorate([
    class_validator_1.IsArray()
], SetFavoritesParameters.prototype, "opts", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(0)
], SetFavoritesParameters.prototype, "favConfigTs", void 0);
exports.SetFavoritesParameters = SetFavoritesParameters;
class SetFavoritesMessage {
    constructor() {
        this.method = "setFavs";
        this.method = networkConstants.setFavoritesMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs set favorites message
     */
    static buildSetFavoritesMessage(params) {
        const msg = new SetFavoritesMessage();
        msg.params = params;
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], SetFavoritesMessage.prototype, "params", void 0);
exports.SetFavoritesMessage = SetFavoritesMessage;
class SetWiZClickParameters {
    constructor() {
        this.confTs = 0;
    }
    static buildFromWiZClickModes(wizClick1, wizClick2) {
        const params = new SetWiZClickParameters();
        params.wizc1 = {
            mode: wizClick1.extractLightModeArray(),
            opts: wizClick1.extractOptObject(),
        };
        params.wizc2 = {
            mode: wizClick2.extractLightModeArray(),
            opts: wizClick2.extractOptObject(),
        };
        return params;
    }
}
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.Min(0),
    class_validator_1.Max(0)
], SetWiZClickParameters.prototype, "confTs", void 0);
exports.SetWiZClickParameters = SetWiZClickParameters;
class SetWiZClickMessage {
    constructor() {
        this.method = "setWiZClick";
        this.method = networkConstants.setWiZClickMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs set WiZ Click message
     */
    static buildSetWiZClickMessage(params) {
        const msg = new SetWiZClickMessage();
        msg.params = params;
        return msg;
    }
}
__decorate([
    class_validator_1.IsInt()
], SetWiZClickMessage.prototype, "version", void 0);
__decorate([
    class_validator_1.IsInt()
], SetWiZClickMessage.prototype, "id", void 0);
__decorate([
    class_validator_1.ValidateNested()
], SetWiZClickMessage.prototype, "params", void 0);
exports.SetWiZClickMessage = SetWiZClickMessage;
class ResetMessage {
    constructor() {
        this.method = networkConstants.resetMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs reset message
     */
    static buildResetMessage() {
        return new ResetMessage();
    }
}
exports.ResetMessage = ResetMessage;
class RebootMessage {
    constructor() {
        this.method = networkConstants.rebootMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs reboot message
     */
    static buildRebootMessage() {
        return new RebootMessage();
    }
}
exports.RebootMessage = RebootMessage;
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
/**
 * Message sent to the lamp requesting its system configuration (fwVersion for example)
 */
class GetSystemConfigMessage {
    constructor() {
        this.method = networkConstants.getSystemConfigMethod;
        this.id = Math.floor(Math.random() * 10000 + 1);
        this.version = 1;
    }
}
exports.GetSystemConfigMessage = GetSystemConfigMessage;
/**
 * Message sent to the lamp requesting its power load
 */
class GetPowerMessage {
    constructor() {
        this.method = networkConstants.getPower;
        this.id = Math.floor(Math.random() * 10000 + 1);
        this.version = 1;
    }
}
exports.GetPowerMessage = GetPowerMessage;
class SetModelConfigParameters {
    constructor(parameters) {
        Object.assign(this, parameters);
    }
}
__decorate([
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "confTs", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "ps", void 0);
__decorate([
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "pwmFreq", void 0);
__decorate([
    class_validator_1.IsArray()
], SetModelConfigParameters.prototype, "pwmRange", void 0);
__decorate([
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "wcr", void 0);
__decorate([
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "nowc", void 0);
__decorate([
    class_validator_1.IsArray()
], SetModelConfigParameters.prototype, "cctRange", void 0);
__decorate([
    class_validator_1.IsString()
], SetModelConfigParameters.prototype, "renderFactor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean()
], SetModelConfigParameters.prototype, "hasAdjMinDim", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsBoolean()
], SetModelConfigParameters.prototype, "hasTapSensor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "pm", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt()
], SetModelConfigParameters.prototype, "fanSpeed", void 0);
exports.SetModelConfigParameters = SetModelConfigParameters;
class SetModelConfigMessage {
    constructor() {
        this.method = networkConstants.setModelConfigMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs general message
     */
    static buildSetModelConfigMessage(parameters) {
        const msg = new SetModelConfigMessage();
        msg.params = new SetModelConfigParameters(parameters);
        return msg;
    }
}
__decorate([
    class_validator_1.ValidateNested()
], SetModelConfigMessage.prototype, "params", void 0);
exports.SetModelConfigMessage = SetModelConfigMessage;
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
//# sourceMappingURL=types.js.map