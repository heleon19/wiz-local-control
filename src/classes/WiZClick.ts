import { IsInt, Max, Min, ValidateNested } from "class-validator";
import * as networkConstants from "../constants";
import { FavoriteLightMode } from "./Favorites";

export type WiZClickMode = FavoriteLightMode;

export class SetWiZClickParameters {
  wizc1: {
    mode: number[];
    opts: object;
  };
  wizc2: {
    mode: number[];
    opts: object;
  };
  @IsInt()
  @Min(0)
  @Max(0)
  confTs: number = 0;

  static buildFromWiZClickModes(
    wizClick1: WiZClickMode,
    wizClick2: WiZClickMode): SetWiZClickParameters {
    const params = new SetWiZClickParameters();

    params.wizc1 = {
      mode: wizClick1.extractLightModeArray(),
      opts: wizClick1.extractOptObject(),
    };

    params.wizc2 = {
      mode: wizClick2.extractLightModeArray(),
      opts: wizClick2.extractOptObject(),
    };

    return params;
  }
}

export class SetWiZClickMessage {
  method: string = "setWiZClick";
  @IsInt()
  version: number;
  @IsInt()
  id: number;
  @ValidateNested() params: SetWiZClickParameters;

  constructor() {
    this.method = networkConstants.setWiZClickMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs set WiZ Click message
   */
  static buildSetWiZClickMessage(params: SetWiZClickParameters): SetWiZClickMessage {
    const msg = new SetWiZClickMessage();
    msg.params = params;
    return msg;
  }

}
