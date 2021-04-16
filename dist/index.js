"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./constants/types");
exports.FavoriteLightMode = types_1.FavoriteLightMode;
const UDPManager_1 = require("./UDPManager");
const types_2 = require("./constants/types");
exports.staticScenes = types_2.staticScenes;
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
     * Requests firmware update of WiZ Light
     * @param lightIp Light IP address
     */
    async updateFirmware(firmwareVersion, lightIp) {
        const msg = types_2.UpdateFirmwareMessage.buildUpdateFirmwareMessage(firmwareVersion);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Reset WiZ Light
     * @param lightIp Light IP address
     */
    async reset(lightIp) {
        const msg = types_2.ResetMessage.buildResetMessage();
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Reboot WiZ Light
     * @param lightIp Light IP address
     */
    async reboot(lightIp) {
        const msg = types_2.RebootMessage.buildRebootMessage();
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Sets environment of WiZ Light
     * @param environment system environment
     * @param lightIp Light IP address
     */
    async setEnvironment(environment, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetEnvironmentMessage(environment);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes module name for WiZ Light
     * @param moduleName module name
     * @param lightIp Light IP address
     */
    async setModuleName(moduleName, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetModuleNameMessage(moduleName);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes extended white factor for WiZ Light
     * @param extendedWhiteFactor extended white factor
     * @param lightIp Light IP address
     */
    async setExtendedWhiteFactor(extendedWhiteFactor, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetExtendedWhiteFactorMessage(extendedWhiteFactor);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Sets system config for WiZ Light
     * @param parameters SetSystemConfig message parameters
     * @param lightIp Light IP address
     */
    async setSystemConfig(parameters, lightIp) {
        const msg = types_1.SetSystemConfigMessage.buildSetSystemConfigMessage(parameters);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes temperature ranges for WiZ Light
     * @param extendedWhiteFactor extended white factor
     * @param lightIp Light IP address
     */
    async setTemperatureRanges(whiteTemperatureMin, whiteTemperatureMax, extendedTemperatureMin, extendedTemperatureMax, lightIp) {
        const msg = types_1.SetUserConfigMessage.buildSetTemperatureRangeMessage(whiteTemperatureMin, whiteTemperatureMax, extendedTemperatureMin, extendedTemperatureMax);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Sets user config for WiZ Light
     * @param parameters SetUserConfig message parameters
     * @param lightIp Light IP address
     */
    async setUserConfig(parameters, lightIp) {
        const msg = types_1.SetUserConfigMessage.buildSetUserConfigMessage(parameters);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes brightness of WiZ Light
     * @param brightness Brightness level, 10-100
     * @param lightIp Light IP address
     */
    async changeBrightness(brightness, lightIp) {
        const msg = types_2.SetPilotMessage.buildDimmingControlMessage(brightness);
        await this.validateMsg(msg, true);
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
                await this.validateMsg(msg, true);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "color": {
                const msg = types_2.SetPilotMessage.buildColorControlMessage(lightMode.r, lightMode.g, lightMode.b, lightMode.cw, lightMode.ww);
                await this.validateMsg(msg, true);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "temperature": {
                const msg = types_2.SetPilotMessage.buildColorTemperatureControlMessage(lightMode.colorTemperature);
                await this.validateMsg(msg, true);
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
                await this.validateMsg(msg, true);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "color": {
                const msg = types_2.SetPilotMessage.buildColorAndBrightnessControlMessage(lightMode.r, lightMode.g, lightMode.b, lightMode.cw, lightMode.ww, brightness);
                await this.validateMsg(msg, true);
                return this.udpManager.sendUDPCommand(msg, lightIp);
            }
            case "temperature": {
                const msg = types_2.SetPilotMessage.buildColorTemperatureAndBrightnessControlMessage(lightMode.colorTemperature, brightness);
                await this.validateMsg(msg, true);
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
        await this.validateMsg(msg, true);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes status of WiZ Light
     * @param status Desired status, true - ON, false - OFF
     * @param lightIp
     */
    async changeStatus(status, lightIp) {
        const msg = types_2.SetPilotMessage.buildStatusControlMessage(status);
        await this.validateMsg(msg, true);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Changes ratio of WiZ Light (for supported products)
     * @param ratio Ratio between top and bottom part, number in range 0..100
     * @param lightIp Light IP address
     */
    async changeRatio(ratio, lightIp) {
        const msg = types_2.SetPilotMessage.buildRatioControlMessage(ratio);
        await this.validateMsg(msg, true);
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
    /**
     * Retrieves system configuration for WiZ Device (like FW version)
     * @param lightIp
     */
    async getPower(lightIp) {
        const msg = new types_1.GetPowerMessage(lightIp);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    async validateMsg(msg, skipMissingProperties = false) {
        const validationErrors = await class_validator_1.validate(msg, {
            skipMissingProperties,
        });
        if (validationErrors.length > 0) {
            throw Error(JSON.stringify(validationErrors));
        }
    }
    /**
     * Sets favorites on the light
     * @param favorite1
     * @param favorite2
     * @param favorite3
     * @param favorite4
     * @param lightIp
     */
    async setFavorites(favorite1, favorite2, favorite3, favorite4, lightIp) {
        const params = types_1.SetFavoritesParameters.buildFromFavorites(favorite1, favorite2, favorite3, favorite4);
        const msg = types_1.SetFavoritesMessage.buildSetFavoritesMessage(params);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
    /**
     * Sets WiZ CLick settings on the light
     * @param wizClick1
     * @param wizClick2
     * @param lightIp
     */
    async setWiZClick(wizClick1, wizClick2, lightIp) {
        const params = types_1.SetWiZClickParameters.buildFromWiZClickModes(wizClick1, wizClick2);
        const msg = types_1.SetWiZClickMessage.buildSetWiZClickMessage(params);
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
    }
}
exports.default = WiZLocalControl;
//# sourceMappingURL=index.js.map