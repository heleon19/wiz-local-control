"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./constants/types");
const UDPManager_1 = require("./UDPManager");
const types_2 = require("./constants/types");
const class_validator_1 = require("class-validator");
class WiZLocalControl {
    constructor(options) {
        const interfaceName = options.interfaceName || "eth0";
        this.udpManager = new UDPManager_1.default(options.incomingMsgCallback, interfaceName);
    }
    /**
     * Starts listening to status updates of WiZ lights
     */
    async startListening() {
        return this.udpManager.startListening();
    }
    /**
     * Stops listening to status updates of WiZ lights
     */
    async stopListening() {
        await this.udpManager.stopListening();
    }
    /**
     * Changes brightness of WiZ Light
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    async changeBrightness(brightness, lightIp) {
        const msg = types_2.SetPilotMessage.buildDimmingControlMessage(brightness);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Requests firmware update of WiZ Light
     * @param lightIp Light IP address
     */
    async updateFirmware(lightIp) {
        const msg = types_2.UpdateFirmwareMessage.buildUpdateFirmwareMessage();
        const validationErrors = await class_validator_1.validate(msg);
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Reset WiZ Light
     * @param lightIp Light IP address
     */
    async reset(lightIp) {
        const msg = types_2.ResetMessage.buildResetMessage();
        const validationErrors = await class_validator_1.validate(msg);
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Reboot WiZ Light
     * @param lightIp Light IP address
     */
    async reboot(lightIp) {
        const msg = types_2.RebootMessage.buildRebootMessage();
        const validationErrors = await class_validator_1.validate(msg);
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Sets environment of WiZ Light
     * @param environment system environment
     * @param lightIp Light IP address
     */
    async setEnvironment(environment, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetEnvironmentMessage(environment);
        const validationErrors = await class_validator_1.validate(msg);
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes module name for WiZ Light
     * @param moduleName module name
     * @param lightIp Light IP address
     */
    async setModuleName(moduleName, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetModuleNameMessage(moduleName);
        const validationErrors = await class_validator_1.validate(msg);
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes light mode of WiZ Light
     * @param lightMode Light mode, check LightMode type for details
     * @param lightIp Light IP address
     */
    async changeLightMode(lightMode, lightIp) {
        switch (lightMode.type) {
            case "scene": {
                const msg = types_2.SetPilotMessage.buildSceneControlMessage(lightMode);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "color": {
                const msg = types_2.SetPilotMessage.buildColorControlMessage(lightMode.r, lightMode.g, lightMode.b, lightMode.cw, lightMode.ww);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "temperature": {
                const msg = types_2.SetPilotMessage.buildColorTemperatureControlMessage(lightMode.colorTemperature);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
        }
    }
    /**
     * Changes light mode of WiZ Light
     * @param lightMode Light mode, check LightMode type for details
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    async changeLightModeAndBrightness(lightMode, brightness, lightIp) {
        switch (lightMode.type) {
            case "scene": {
                const msg = types_2.SetPilotMessage.buildSceneAndBrightnessControlMessage(lightMode, brightness);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "color": {
                const msg = types_2.SetPilotMessage.buildColorAndBrightnessControlMessage(lightMode.r, lightMode.g, lightMode.b, lightMode.cw, lightMode.ww, brightness);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "temperature": {
                const msg = types_2.SetPilotMessage.buildColorTemperatureAndBrightnessControlMessage(lightMode.colorTemperature, brightness);
                await this.validateMsg(msg);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
        }
    }
    /**
     * Changes playing speed of Dynamic Scene of WiZ Light
     * @param speed Playing speed, 20-200
     * @param lightIp
     */
    async changeSpeed(speed, lightIp) {
        const msg = types_2.SetPilotMessage.buildSpeedControlMessage(speed);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes status of WiZ Light
     * @param status Desired status, true - ON, false - OFF
     * @param lightIp
     */
    async changeStatus(status, lightIp) {
        const msg = types_2.SetPilotMessage.buildStatusControlMessage(status);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Retrieves system configuration for WiZ Device (like FW version)
     * @param lightIp
     */
    async getSystemConfig(lightIp) {
        const msg = new types_1.GetSystemConfigMessage(lightIp);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    async validateMsg(msg) {
        const validationErrors = await class_validator_1.validate(msg, {
            skipMissingProperties: true,
        });
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
    }
}
exports.default = WiZLocalControl;
//# sourceMappingURL=index.js.map