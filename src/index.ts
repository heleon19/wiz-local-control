import { WiZMessage, Result, LightMode } from "./constants/types";
import UDPManager from "./UDPManager";
import { SetPilotMessage } from "./constants/types";
import sendCommand from "./UDPCommunication";
import * as dgram from "dgram";

export type WiZLocalControlConfig = {
  incomingMsgCallback: (msg: WiZMessage, sourceIp: string) => void;
  interfaceName?: string;
};
export default class WiZLocalControl {
  udpManager: UDPManager;
  sendCommandImpl: (
    msg: SetPilotMessage,
    ip: string,
    udpPort?: number,
    broadcast?: boolean,
    socket?: dgram.Socket,
  ) => Promise<Result> = sendCommand;

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
  async changeBrightness(brightness: number, lightIp: string): Promise<Result> {
    const msg = SetPilotMessage.buildDimmingControlMessage(brightness);
    return this.sendCommandImpl(msg, lightIp);
  }

  /**
   * Changes light mode of WiZ Light
   * @param lightMode Light mode, check LightMode type for details
   * @param lightIp Light IP address
   */
  async changeLightMode(
    lightMode: LightMode,
    lightIp: string,
  ): Promise<Result> {
    switch (lightMode.type) {
      case "scene": {
        const msg = SetPilotMessage.buildSceneControlMessage(lightMode);
        return this.sendCommandImpl(msg, lightIp);
      }
      case "color": {
        const msg = SetPilotMessage.buildColorControlMessage(
          lightMode.r,
          lightMode.g,
          lightMode.b,
          lightMode.ww,
        );
        return this.sendCommandImpl(msg, lightIp);
      }
      case "temperature": {
        const msg = SetPilotMessage.buildColorTemperatureControlMessage(
          lightMode.colorTemperature,
        );
        return this.sendCommandImpl(msg, lightIp);
      }
    }
  }

  /**
   * Changes playing speed of Dynamic Scene of WiZ Light
   * @param speed Playing speed, 20-200
   * @param lightIp
   */
  async changeSpeed(speed: number, lightIp: string): Promise<Result> {
    const msg = SetPilotMessage.buildSpeedControlMessage(speed);
    return this.sendCommandImpl(msg, lightIp);
  }

  /**
   * Changes status of WiZ Light
   * @param status Desired status, true - ON, false - OFF
   * @param lightIp
   */
  async changeStatus(status: boolean, lightIp: string): Promise<Result> {
    const msg = SetPilotMessage.buildStatusControlMessage(status);
    return this.sendCommandImpl(msg, lightIp);
  }
}
