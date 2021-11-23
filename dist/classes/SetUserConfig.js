"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserConfigMessage = exports.SetUserConfigParameters = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
/**
 * Set user config messages parameters for request
 */
class SetUserConfigParameters {
    constructor(parameters) {
        const excludedKeys = ["whiteTemperatureMin", "whiteTemperatureMax", "extendedTemperatureMin", "extendedTemperatureMax", "pwmMin", "pwmMax", "pwmRange", "whiteRange", "extRange"];
        Object.assign(this, Object.keys(parameters).filter(key => !excludedKeys.includes(key)).reduce((result, key) => {
            // @ts-ignore
            result[key] = parameters[key];
            return result;
        }, {}));
        Object.assign(this, parameters);
        if (parameters.whiteTemperatureMin != undefined && parameters.whiteTemperatureMax != undefined) {
            this.whiteRange = [parameters.whiteTemperatureMin, parameters.whiteTemperatureMax];
        }
        if (parameters.extendedTemperatureMin != undefined && parameters.extendedTemperatureMax != undefined) {
            this.extRange = [parameters.extendedTemperatureMin, parameters.extendedTemperatureMax];
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
        if (parameters.userConfigTs == undefined) {
            this.userConfigTs = 0;
        }
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
], SetUserConfigParameters.prototype, "userConfigTs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)()
], SetUserConfigParameters.prototype, "whiteRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)()
], SetUserConfigParameters.prototype, "extRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)()
], SetUserConfigParameters.prototype, "pwmRange", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
], SetUserConfigParameters.prototype, "dftDim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)()
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
    (0, class_validator_1.ValidateNested)()
], SetUserConfigMessage.prototype, "params", void 0);
exports.SetUserConfigMessage = SetUserConfigMessage;
//# sourceMappingURL=SetUserConfig.js.map