"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetSystemConfigMessage = exports.SetSystemConfigMessage = exports.SetSystemConfigParameters = void 0;
const class_validator_1 = require("class-validator");
const helpers_1 = require("../helpers");
const networkConstants = require("../constants");
/**
 * Set system config messages parameters for request
 */
class SetSystemConfigParameters {
    constructor(parameters) {
        const excludedKeys = ["environment", "extendedWhiteFactor", "pwmRefreshRate", "whiteChannels", "whiteToColorsRatio"];
        Object.assign(this, Object.keys(parameters).filter(key => !excludedKeys.includes(key)).reduce((result, key) => {
            // @ts-ignore
            result[key] = parameters[key];
            return result;
        }, {}));
        if (parameters.environment != undefined) {
            this.env = parameters.environment;
        }
        if (parameters.extendedWhiteFactor != undefined) {
            this.ewf = parameters.extendedWhiteFactor;
        }
        if (parameters.pwmRefreshRate != undefined) {
            this.pwmConf = (0, helpers_1.convertPWMRefreshRateToPWMConf)(parameters.pwmRefreshRate);
        }
        if (parameters.whiteChannels != undefined && parameters.whiteToColorsRatio != undefined) {
            this.drvConf = [parameters.whiteToColorsRatio, parameters.whiteChannels];
        }
        if (parameters.systemConfigTs == undefined) {
            this.systemConfigTs = 0;
        }
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], SetSystemConfigParameters.prototype, "env", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
], SetSystemConfigParameters.prototype, "systemConfigTs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], SetSystemConfigParameters.prototype, "moduleName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], SetSystemConfigParameters.prototype, "ewf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
], SetSystemConfigParameters.prototype, "pwmConf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)()
], SetSystemConfigParameters.prototype, "drvConf", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
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
    (0, class_validator_1.ValidateNested)()
], SetSystemConfigMessage.prototype, "params", void 0);
exports.SetSystemConfigMessage = SetSystemConfigMessage;
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
//# sourceMappingURL=SystemConfig.js.map