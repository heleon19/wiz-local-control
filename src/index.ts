import UDPManager from "./UDPManager";
import { validate } from "class-validator";
import { Result, staticScenes, WiZControlMessage, WiZMessage } from "./classes/types";
import { RebootMessage, ResetMessage, UpdateFirmwareMessage } from "./classes/Control";
import {
  GetSystemConfigMessage,
  GetSystemConfigResponse,
  SetSystemConfigMessage,
  SetSystemConfigMessageParameters,
} from "./classes/SystemConfig";
import { SetPilotMessage } from "./classes/Pilot";
import { LightMode } from "./classes/LightMode";
import { GetPowerMessage, GetPowerResponse } from "./classes/GetMessage";
import { FavoriteLightMode, SetFavoritesMessage, SetFavoritesParameters } from "./classes/Favorites";
import { SetWiZClickMessage, SetWiZClickParameters, WiZClickMode } from "./classes/WiZClick";
import { SetUserConfigMessage, SetUserConfigMessageParameters } from "./classes/SetUserConfig";
import { SetModelConfigMessage, SetModelConfigMessageParameters } from "./classes/SetModelConfig";

export type WiZLocalControlConfig = {
  incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
  interfaceName?: string;
};
export default class WiZLocalControl {
  udpManager: UDPManager;

  constructor(options: WiZLocalControlConfig) {
    this.udpManager = new UDPManager(
      options.incomingMsgCallback,
      options.interfaceName || "eth0",
    );
  }

  async validateMsg(msg: WiZControlMessage, skipMissingProperties: boolean = false): Promise<void> {
    const validationErrors = await validate(msg, {
      skipMissingProperties,
    });
    if (validationErrors.length > 0) {
      throw Error(JSON.stringify(validationErrors));
    }
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
   * @param firmwareVersion target fw version, if undefined - then default
   * @param lightIp Light IP address
   */
  async updateFirmware(
    firmwareVersion: string | undefined,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = UpdateFirmwareMessage.buildUpdateFirmwareMessage(firmwareVersion);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Reset WiZ Light
   * @param lightIp Light IP address
   */
  async reset(lightIp: string): Promise<Result<any>> {
    const msg = ResetMessage.buildResetMessage();
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Reboot WiZ Light
   * @param lightIp Light IP address
   */
  async reboot(lightIp: string): Promise<Result<any>> {
    const msg = RebootMessage.buildRebootMessage();
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Sets environment of WiZ Light (OBSOLETE after fw 1.18)
   * @param environment system environment
   * @param lightIp Light IP address
   */
  async setEnvironment(
    environment: string,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetEnvironmentMessage(environment);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes module name for WiZ Light
   * @param moduleName module name
   * @param lightIp Light IP address
   */
  async setModuleName(
    moduleName: string,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetModuleNameMessage(moduleName);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes extended white factor for WiZ Light
   * @param extendedWhiteFactor extended white factor
   * @param lightIp Light IP address
   */
  async setExtendedWhiteFactor(
    extendedWhiteFactor: string,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetExtendedWhiteFactorMessage(extendedWhiteFactor);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Sets system config for WiZ Light
   * @param parameters SetSystemConfig message parameters
   * @param lightIp Light IP address
   */
  async setSystemConfig(
    parameters: SetSystemConfigMessageParameters,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetSystemConfigMessage(parameters);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Sets model config for WiZ Light
   * @param parameters SetModelConfig message parameters
   * @param lightIp Light IP address
   */
  async setModelConfig(
    parameters: SetModelConfigMessageParameters,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetModelConfigMessage.buildSetModelConfigMessage(parameters);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes temperature ranges for WiZ Light
   * @param whiteTemperatureMin the temperature in Kelvin for the native warm white
   * @param whiteTemperatureMax the temperature in Kelvin for the native cool white
   * @param extendedTemperatureMin the temperature in Kelvin for the extended warm white where red and blue need to be added.
   * @param extendedTemperatureMax the temperature in Kelvin for the extended cool white where red and blue need to be added.
   * @param lightIp Light IP address
   */
  async setTemperatureRanges(
    whiteTemperatureMin: number,
    whiteTemperatureMax: number,
    extendedTemperatureMin: number,
    extendedTemperatureMax: number,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetUserConfigMessage.buildSetTemperatureRangeMessage(
      whiteTemperatureMin,
      whiteTemperatureMax,
      extendedTemperatureMin,
      extendedTemperatureMax,
    );
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Sets user config for WiZ Light
   * @param parameters SetUserConfig message parameters
   * @param lightIp Light IP address
   */
  async setUserConfig(
    parameters: SetUserConfigMessageParameters,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetUserConfigMessage.buildSetUserConfigMessage(parameters);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes brightness of WiZ Light
   * @param brightness Brightness level, 10-100
   * @param lightIp Light IP address
   */
  async changeBrightness(
    brightness: number,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetPilotMessage.buildDimmingControlMessage(brightness);
    await this.validateMsg(msg, true);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes light mode of WiZ Light
   * @param lightMode Light mode, check LightMode type for details
   * @param lightIp Light IP address
   */
  async changeLightMode(
    lightMode: LightMode,
    lightIp: string,
  ): Promise<Result<any>> {
    switch (lightMode.type) {
      case "scene": {
        const msg = SetPilotMessage.buildSceneControlMessage(lightMode);
        await this.validateMsg(msg, true);
        return this.udpManager.sendUDPCommand(msg, lightIp);
      }
      case "color": {
        const msg = SetPilotMessage.buildColorControlMessage(
          lightMode.r,
          lightMode.g,
          lightMode.b,
          lightMode.cw,
          lightMode.ww,
        );
        await this.validateMsg(msg, true);
        return this.udpManager.sendUDPCommand(msg, lightIp);
      }
      case "temperature": {
        const msg = SetPilotMessage.buildColorTemperatureControlMessage(
          lightMode.colorTemperature,
        );
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
  async changeLightModeAndBrightness(
    lightMode: LightMode,
    brightness: number,
    lightIp: string,
  ): Promise<Result<any>> {
    let msg;
    switch (lightMode.type) {
      case "scene": {
        msg = SetPilotMessage.buildSceneAndBrightnessControlMessage(
          lightMode,
          brightness,
        );
        break;
      }
      case "color": {
        msg = SetPilotMessage.buildColorAndBrightnessControlMessage(
          lightMode.r,
          lightMode.g,
          lightMode.b,
          lightMode.cw,
          lightMode.ww,
          brightness,
        );
        break;
      }
      case "temperature": {
        msg = SetPilotMessage.buildColorTemperatureAndBrightnessControlMessage(
          lightMode.colorTemperature,
          brightness,
        );
        break;
      }
    }
    await this.validateMsg(msg, true);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes playing speed of Dynamic Scene of WiZ Light
   * @param speed Playing speed, 20-200
   * @param lightIp
   */
  async changeSpeed(speed: number, lightIp: string): Promise<Result<any>> {
    const msg = SetPilotMessage.buildSpeedControlMessage(speed);
    await this.validateMsg(msg, true);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes status of WiZ Light
   * @param status Desired status, true - ON, false - OFF
   * @param lightIp
   */
  async changeStatus(status: boolean, lightIp: string): Promise<Result<any>> {
    const msg = SetPilotMessage.buildStatusControlMessage(status);
    await this.validateMsg(msg, true);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes ratio of WiZ Light (for supported products)
   * @param ratio Ratio between top and bottom part, number in range 0..100
   * @param lightIp Light IP address
   */
  async changeRatio(ratio: number, lightIp: string): Promise<Result<any>> {
    const msg = SetPilotMessage.buildRatioControlMessage(ratio);
    await this.validateMsg(msg, true);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Retrieves system configuration for WiZ Device (like FW version)
   * @param lightIp
   */
  async getSystemConfig(
    lightIp: string,
  ): Promise<Result<GetSystemConfigResponse>> {
    const msg = new GetSystemConfigMessage();
    return this.udpManager.sendUDPCommand<GetSystemConfigResponse>(msg, lightIp);
  }

  /**
   * Retrieves system configuration for WiZ Device (like FW version)
   * @param lightIp
   */
  async getPower(
    lightIp: string,
  ): Promise<Result<GetPowerResponse>> {
    const msg = new GetPowerMessage();
    return this.udpManager.sendUDPCommand<GetPowerResponse>(msg, lightIp);
  }

  /**
   * Sets favorites on the light
   * @param favorite1
   * @param favorite2
   * @param favorite3
   * @param favorite4
   * @param lightIp
   */
  async setFavorites(
    favorite1: FavoriteLightMode,
    favorite2: FavoriteLightMode,
    favorite3: FavoriteLightMode,
    favorite4: FavoriteLightMode,
    lightIp: string,
  ): Promise<Result<any>> {
    const params = SetFavoritesParameters.buildFromFavorites(favorite1, favorite2, favorite3, favorite4);
    const msg = SetFavoritesMessage.buildSetFavoritesMessage(params);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Sets WiZ CLick settings on the light
   * @param wizClick1
   * @param wizClick2
   * @param lightIp
   */
  async setWiZClick(
    wizClick1: WiZClickMode,
    wizClick2: WiZClickMode,
    lightIp: string,
  ): Promise<Result<any>> {
    const params = SetWiZClickParameters.buildFromWiZClickModes(wizClick1, wizClick2);
    const msg = SetWiZClickMessage.buildSetWiZClickMessage(params);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }
}

export { staticScenes, FavoriteLightMode };
