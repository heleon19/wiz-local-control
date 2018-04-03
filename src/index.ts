import { WiZMessage, Result, LightMode } from "./constants/types";
import UDPManager from "./UDPManager";
import { SetPilotMessage } from "./constants/types";
import sendCommand from "./UDPCommunication";

export default class WiZLocalControl {
  udpManager: UDPManager;
  constructor(incomingMsgCallback: (msg: WiZMessage) => void) {
    const udpManager = new UDPManager(incomingMsgCallback);
    udpManager.startListening();
    this.udpManager = udpManager;
  }

  /**
   * Starts listening to status updates of WiZ lights
   */
  startListening() {
    this.udpManager.startListening();
  }
  /**
   * Stops listening to status updates of WiZ lights
   */
  stopListening() {
    this.udpManager.stopListening();
  }
  /**
   * Changes brightness of WiZ Light
   * @param brightness Brightness level, 10-100
   * @param lightIp Light IP address
   */
  async changeBrightness(brightness: number, lightIp: string): Promise<Result> {
    const msg = SetPilotMessage.buildDimmingControlMessage(brightness);
    return sendCommand(msg, lightIp);
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
        return sendCommand(msg, lightIp);
      }
      case "color": {
        const msg = SetPilotMessage.buildColorControlMessage(
          lightMode.r,
          lightMode.g,
          lightMode.b,
          lightMode.ww,
        );
        return sendCommand(msg, lightIp);
      }
      case "temperature": {
        const msg = SetPilotMessage.buildColorTemperatureControlMessage(
          lightMode.colorTemperature,
        );
        return sendCommand(msg, lightIp);
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
    return sendCommand(msg, lightIp);
  }

  /**
   * Changes status of WiZ Light
   * @param status Desired status, true - ON, false - OFF
   * @param lightIp
   */
  async changeStatus(status: boolean, lightIp: string): Promise<Result> {
    const msg = SetPilotMessage.buildStatusControlMessage(status);
    return sendCommand(msg, lightIp);
  }
}
