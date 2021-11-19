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
 * Set user config messages parameters for request
 */
export class SetUserConfigParameters {
  @IsOptional()
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
  @IsOptional()
  @IsInt()
  dftDim: number;
  @IsOptional()
  @IsString()
  startupMode: string;

  constructor(parameters: SetUserConfigMessageParameters) {
    Object.assign(this, parameters);
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
