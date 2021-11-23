import * as networkConstants from "../constants";

/**
 * Message sent to the lamp requesting its status
 */
export type GetPilotMessage = {
  method: "getPilot";
  version: number;
  id: number;
};

/**
 * WiZ Light power load
 */
export type GetPowerResponse = {
  method: "getPower";
  result: {
    power: number;
  };
};

/**
 * Message sent to the lamp requesting its power load
 */
export class GetPowerMessage {
  method: "getPower";
  version: number;
  id: number;

  constructor() {
    this.method = networkConstants.getPower;
    this.id = Math.floor(Math.random() * 10000 + 1);
    this.version = 1;
  }
}
