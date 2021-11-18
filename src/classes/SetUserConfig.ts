import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import * as networkConstants from "../constants";

export interface SetUserConfigMessageParameters {
  whiteTemperatureMin?: number;
  whiteTemperatureMax?: number;
  extendedTemperatureMin?: number;
  extendedTemperatureMax?: number;
  pwmMin?: number;
  pwmMax?: number;
  dftDim?: number;
  pwmRange?: number[];
  whiteRange?: number[];
  extRange?: number[];
  startupMode?: string;
}

/**
 * Set system config messages parameters for request
 */
export class SetUserConfigParameters {
  @IsInt()
  userConfigTs: number;
  @IsOptional()
  @IsArray()
  whiteRange?: number[];
  @IsOptional()
  @IsArray()
  extRange?: number[];
  @IsOptional()
  @IsArray()
  pwmRange?: number[];
  @IsInt()
  dftDim: number;
  @IsString()
  startupMode: string;

  constructor(parameters: SetUserConfigMessageParameters) {
    if (
      parameters.whiteTemperatureMin != undefined &&
      parameters.whiteTemperatureMax != undefined
    ) {
      this.whiteRange = [
        parameters.whiteTemperatureMin,
        parameters.whiteTemperatureMax,
      ];
    }
    if (
      parameters.extendedTemperatureMin != undefined &&
      parameters.extendedTemperatureMax != undefined
    ) {
      this.extRange = [
        parameters.extendedTemperatureMin,
        parameters.extendedTemperatureMax,
      ];
    }
    if (parameters.pwmMin != undefined && parameters.pwmMax != undefined) {
      this.pwmRange = [parameters.pwmMin, parameters.pwmMax];
    }

    if (parameters.pwmRange != undefined) {
      this.pwmRange = parameters.pwmRange;
    }
    if (parameters.whiteRange != undefined) {
      this.whiteRange = parameters.whiteRange;
    }
    if (parameters.extRange != undefined) {
      this.extRange = parameters.extRange;
    }
    this.dftDim = parameters.dftDim || 100;
    this.startupMode = parameters.startupMode || "wizclick";
    this.userConfigTs = 0;
  }
}

export class SetUserConfigMessage {
  method: "setUserConfig";
  version: number;
  id: number;
  @ValidateNested() params: SetUserConfigParameters;

  constructor() {
    this.method = networkConstants.setUserConfigMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs temperature range update message
   */
  static buildSetTemperatureRangeMessage(
    whiteTemperatureMin: number,
    whiteTemperatureMax: number,
    extendedTemperatureMin: number,
    extendedTemperatureMax: number,
  ): SetUserConfigMessage {
    const msg = new SetUserConfigMessage();
    msg.params = new SetUserConfigParameters({
      whiteTemperatureMin,
      whiteTemperatureMax,
      extendedTemperatureMin,
      extendedTemperatureMax,
    });
    return msg;
  }

  /**
   * Constructs SetUserConfig message
   */
  static buildSetUserConfigMessage(
    parameters: SetUserConfigMessageParameters,
  ): SetUserConfigMessage {
    const msg = new SetUserConfigMessage();
    msg.params = new SetUserConfigParameters(parameters);
    return msg;
  }
}
