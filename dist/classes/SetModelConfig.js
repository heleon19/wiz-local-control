"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetModelConfigMessage = exports.SetModelConfigParameters = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
class SetModelConfigParameters {
    constructor(parameters) {
        Object.assign(this, parameters);
    }
}
__decorate([
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "confTs", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "ps", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "pwmFreq", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], SetModelConfigParameters.prototype, "pwmRange", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "wcr", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "nowc", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], SetModelConfigParameters.prototype, "cctRange", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], SetModelConfigParameters.prototype, "renderFactor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)()
], SetModelConfigParameters.prototype, "hasAdjMinDim", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)()
], SetModelConfigParameters.prototype, "hasTapSensor", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
], SetModelConfigParameters.prototype, "pm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)()
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
    (0, class_validator_1.ValidateNested)()
], SetModelConfigMessage.prototype, "params", void 0);
exports.SetModelConfigMessage = SetModelConfigMessage;
//# sourceMappingURL=SetModelConfig.js.map