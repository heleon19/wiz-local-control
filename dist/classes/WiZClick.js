"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetWiZClickMessage = exports.SetWiZClickParameters = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
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
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(0)
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
    (0, class_validator_1.IsInt)()
], SetWiZClickMessage.prototype, "version", void 0);
__decorate([
    (0, class_validator_1.IsInt)()
], SetWiZClickMessage.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)()
], SetWiZClickMessage.prototype, "params", void 0);
exports.SetWiZClickMessage = SetWiZClickMessage;
//# sourceMappingURL=WiZClick.js.map