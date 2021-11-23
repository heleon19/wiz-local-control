import { IsArray, IsInt, Max, Min, ValidateNested } from "class-validator";
import * as networkConstants from "../constants";
import { Color, Scene, Temperature } from "./LightMode";

export class FavoriteLightMode {
  @IsInt()
  @Min(0)
  @Max(255)
  sceneId: number = 0;
  @IsInt()
  @Min(0)
  @Max(255)
  r: number = 0;
  @IsInt()
  @Min(0)
  @Max(255)
  g: number = 0;
  @IsInt()
  @Min(0)
  @Max(255)
  b: number = 0;
  @IsInt()
  @Min(0)
  @Max(255)
  ww: number = 0;
  @IsInt()
  @Min(0)
  @Max(255)
  cw: number = 0;
  @IsInt()
  @Min(0)
  temperature: number = 0;
  @IsInt()
  @Min(0)
  @Max(100)
  dim?: number;
  @IsInt()
  @Min(50)
  @Max(200)
  spd?: number;
  @IsInt()
  @Min(0)
  @Max(100)
  ratio?: number;

  /**
   * Builds favorite light mode for the Scene (dynamic or static)
   * @param scene Scene that should be played as favorite
   * @param dimming Dimming level (for light modes that support dimming)
   * @param speed Speed level (for dynamic light modes)
   * @param ratio Ratio level (for products that support ratio)
   */
  static buildFavoriteForScene(scene: Scene, dimming?: number, speed?: number, ratio?: number): FavoriteLightMode {
    const favorite = new FavoriteLightMode();
    favorite.sceneId = scene.sceneId;
    favorite.dim = dimming;
    favorite.spd = speed;
    favorite.ratio = ratio;
    return favorite;
  }

  /**
   * Builds favorite light mode for Color
   * @param color Color definition that should be played as favorite
   * @param dimming Dimming level (for light modes that support dimming)
   * @param ratio Ratio level (for products that support ratio)
   */
  static buildFavoriteForColor(color: Color, dimming?: number, ratio?: number): FavoriteLightMode {
    const favorite = new FavoriteLightMode();
    favorite.r = color.r;
    favorite.g = color.g;
    favorite.b = color.b;
    favorite.cw = color.cw;
    favorite.ww = color.ww;
    favorite.dim = dimming;
    favorite.ratio = ratio;
    return favorite;
  }

  /**
   * Builds favorite light mode for Temperature
   * @param cct Temperature definition that should be played as favorite
   * @param dimming Dimming level (for light modes that support dimming)
   * @param ratio Ratio level (for products that support ratio)
   */
  static buildFavoriteForTemperature(cct: Temperature, dimming?: number, ratio?: number): FavoriteLightMode {
    const favorite = new FavoriteLightMode();
    favorite.temperature = cct.colorTemperature;
    favorite.dim = dimming;
    favorite.ratio = ratio;
    return favorite;
  }

  /**
   * Builds favorite light mode for Turning light On or Off as a favorite
   * @param onOff Should the light been turned on or off
   */
  static buildFavoriteForOnOff(onOff: boolean): FavoriteLightMode {
    const favorite = new FavoriteLightMode();
    favorite.sceneId = onOff ? 254 : 0;
    return favorite;
  }

  /**
   * Builds favorite light mode for keeping previous mode when applying a favorite
   */
  static buildFavoriteForDoNothing(): FavoriteLightMode {
    const favorite = new FavoriteLightMode();
    favorite.sceneId = 255;
    return favorite;
  }

  extractLightModeArray(): number[] {
    return [
      this.sceneId,
      this.r,
      this.g,
      this.b,
      this.cw,
      this.ww,
      this.temperature,
    ];
  }

  extractOptObject(): object {
    return {
      dim: this.dim,
      spd: this.spd,
      ratio: this.ratio,
    };
  }
}

export class SetFavoritesParameters {
  @IsArray()
  favs: number[][];
  @IsArray()
  opts: object[];
  @IsInt()
  @Min(0)
  @Max(0)
  favConfigTs: number = 0;

  static buildFromFavorites(
    favorite1: FavoriteLightMode,
    favorite2: FavoriteLightMode,
    favorite3: FavoriteLightMode,
    favorite4: FavoriteLightMode): SetFavoritesParameters {
    const params = new SetFavoritesParameters();

    params.favs = [
      favorite1.extractLightModeArray(),
      favorite2.extractLightModeArray(),
      favorite3.extractLightModeArray(),
      favorite4.extractLightModeArray(),
    ];

    params.opts = [
      favorite1.extractOptObject(),
      favorite2.extractOptObject(),
      favorite3.extractOptObject(),
      favorite4.extractOptObject(),
    ];

    return params;
  }
}

export class SetFavoritesMessage {
  method: string = "setFavs";
  version: number;
  id: number;
  @ValidateNested() params: SetFavoritesParameters;

  constructor() {
    this.method = networkConstants.setFavoritesMethod;
    this.version = 1;
    this.id = Math.floor(Math.random() * 10000 + 1);
  }

  /**
   * Constructs set favorites message
   */
  static buildSetFavoritesMessage(params: SetFavoritesParameters): SetFavoritesMessage {
    const msg = new SetFavoritesMessage();
    msg.params = params;
    return msg;
  }

}
