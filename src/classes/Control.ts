import { IsInt, IsString, Max, Min, ValidateNested } from "class-validator";
import * as networkConstants from "../constants";

/**
 * Incoming message that lamp is updating firmware and the status changed
 */
export type UpdateOtaMessage = {
  method: "updateOta";
  id: number;
  env: string;
  timestamp: Date;
  ip: string;
  params: {
    updateStatus?: number;
  };
};

/**
 * Update firmware messages parameters for request
 */
export class UpdateFirmwareParameters {
  @IsString()
  fw: string;
  @IsInt()
  @Min(0)
  @Max(1)
  force: number;

  constructor(firmwareVersion: string | undefined) {
    this.fw = firmwareVersion || "default";
    this.force = 1;
  }
}

export class UpdateFirmwareMessage {
  method: "updateOta";
  version: number;
  id: number;
  @ValidateNested() params: UpdateFirmwareParameters;

  constructor() {
    this.method = networkConstants.updateOtaMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs firmware update message
   */
  static buildUpdateFirmwareMessage(
    firmwareVersion: string | undefined,
  ): UpdateFirmwareMessage {
    const msg = new UpdateFirmwareMessage();
    msg.params = new UpdateFirmwareParameters(firmwareVersion);
    return msg;
  }
}

export class ResetMessage {
  method: "reset";
  version: number;
  id: number;

  constructor() {
    this.method = networkConstants.resetMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs reset message
   */
  static buildResetMessage(): ResetMessage {
    return new ResetMessage();
  }
}

export class RebootMessage {
  method: "reboot";
  version: number;
  id: number;

  constructor() {
    this.method = networkConstants.rebootMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs reboot message
   */
  static buildRebootMessage(): RebootMessage {
    return new RebootMessage();
  }
}

/**
 * Message broadcasted by the light after booting,
 * way to inform nearby devices about its presence
 */
export type FirstBeatMessage = {
  method: "firstBeat";
  id: number;
  env: string;
  params: {
    mac: string;
    fwVersion: string;
  };
};

/**
 * Message sent by device to the lamp (via broadcast or unicast)
 * Lamp will add specified IP to the list devices that it notifies on status change using
 * SyncPilot messages
 */
export class RegistrationMessage {
  method: "registration";
  version: number;
  id: number;
  params: {
    register: boolean;
    phoneMac: string;
    phoneIp: string;
  };

  constructor(ip: string, mac: string) {
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
