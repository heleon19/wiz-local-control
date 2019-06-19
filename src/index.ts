import {
  WiZMessage,
  Result,
  LightMode,
  GetSystemConfigMessage,
  GetSystemConfigResponse,
  SetSystemConfigMessage,
} from "./constants/types";
import UDPManager from "./UDPManager";
import {
  SetPilotMessage,
  UpdateFirmwareMessage,
  ResetMessage,
  RebootMessage,
} from "./constants/types";
import sendCommand from "./UDPCommunication";
import * as dgram from "dgram";
import { getLocalIPAddress } from "./ipFunctions";
import { validate } from "class-validator";

export type WiZLocalControlConfig = {
  incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
  interfaceName?: string;
};
export default class WiZLocalControl {
  udpManager: UDPManager;
  constructor(options: WiZLocalControlConfig) {
    const interfaceName = options.interfaceName || "eth0";
    this.udpManager = new UDPManager(
      options.incomingMsgCallback,
      interfaceName,
    );
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
  async changeBrightness(
    brightness: number,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetPilotMessage.buildDimmingControlMessage(brightness);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Requests firmware update of WiZ Light
   * @param lightIp Light IP address
   */
  async updateFirmware(lightIp: string): Promise<Result<any>> {
    const msg = UpdateFirmwareMessage.buildUpdateFirmwareMessage();
    const validationErrors = await validate(msg);
    if (validationErrors.length > 0) {
      throw Error(JSON.stringify(validationErrors));
    }
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Reset WiZ Light
   * @param lightIp Light IP address
   */
  async reset(lightIp: string): Promise<Result<any>> {
    const msg = ResetMessage.buildResetMessage();
    const validationErrors = await validate(msg);
    if (validationErrors.length > 0) {
      throw Error(JSON.stringify(validationErrors));
    }
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Reboot WiZ Light
   * @param lightIp Light IP address
   */
  async reboot(lightIp: string): Promise<Result<any>> {
    const msg = RebootMessage.buildRebootMessage();
    const validationErrors = await validate(msg);
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
  async setEnvironment(
    environment: string,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetEnvironmentMessage(environment);
    const validationErrors = await validate(msg);
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
  async setModuleName(
    moduleName: string,
    lightIp: string,
  ): Promise<Result<any>> {
    const msg = SetSystemConfigMessage.buildSetModuleNameMessage(moduleName);
    const validationErrors = await validate(msg);
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
  async changeLightMode(
    lightMode: LightMode,
    lightIp: string,
  ): Promise<Result<any>> {
    switch (lightMode.type) {
      case "scene": {
        const msg = SetPilotMessage.buildSceneControlMessage(lightMode);
        await this.validateMsg(msg);
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
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
      }
      case "temperature": {
        const msg = SetPilotMessage.buildColorTemperatureControlMessage(
          lightMode.colorTemperature,
        );
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
  async changeLightModeAndBrightness(
    lightMode: LightMode,
    brightness: number,
    lightIp: string,
  ): Promise<Result<any>> {
    switch (lightMode.type) {
      case "scene": {
        const msg = SetPilotMessage.buildSceneAndBrightnessControlMessage(
          lightMode,
          brightness,
        );
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
      }
      case "color": {
        const msg = SetPilotMessage.buildColorAndBrightnessControlMessage(
          lightMode.r,
          lightMode.g,
          lightMode.b,
          lightMode.cw,
          lightMode.ww,
          brightness,
        );
        await this.validateMsg(msg);
        return this.udpManager.sendUDPCommand(msg, lightIp);
      }
      case "temperature": {
        const msg = SetPilotMessage.buildColorTemperatureAndBrightnessControlMessage(
          lightMode.colorTemperature,
          brightness,
        );
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
  async changeSpeed(speed: number, lightIp: string): Promise<Result<any>> {
    const msg = SetPilotMessage.buildSpeedControlMessage(speed);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Changes status of WiZ Light
   * @param status Desired status, true - ON, false - OFF
   * @param lightIp
   */
  async changeStatus(status: boolean, lightIp: string): Promise<Result<any>> {
    const msg = SetPilotMessage.buildStatusControlMessage(status);
    await this.validateMsg(msg);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  /**
   * Retrieves system configuration for WiZ Device (like FW version)
   * @param lightIp
   */
  async getSystemConfig(
    lightIp: string,
  ): Promise<Result<GetSystemConfigResponse>> {
    const msg = new GetSystemConfigMessage(lightIp);
    return this.udpManager.sendUDPCommand(msg, lightIp);
  }

  async validateMsg(msg: SetPilotMessage): Promise<void> {
    const validationErrors = await validate(msg, {
      skipMissingProperties: true,
    });
    if (validationErrors.length > 0) {
      throw Error(JSON.stringify(validationErrors));
    }
  }
}
