"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrationMessage = exports.RebootMessage = exports.ResetMessage = exports.UpdateFirmwareMessage = exports.UpdateFirmwareParameters = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
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
    (0, class_validator_1.IsString)()
], UpdateFirmwareParameters.prototype, "fw", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(1)
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
    (0, class_validator_1.ValidateNested)()
], UpdateFirmwareMessage.prototype, "params", void 0);
exports.UpdateFirmwareMessage = UpdateFirmwareMessage;
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
//# sourceMappingURL=Control.js.map