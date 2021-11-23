import { Color, Scene, Temperature } from "./LightMode";
export declare class FavoriteLightMode {
    sceneId: number;
    r: number;
    g: number;
    b: number;
    ww: number;
    cw: number;
    temperature: number;
    dim?: number;
    spd?: number;
    ratio?: number;
    /**
     * Builds favorite light mode for the Scene (dynamic or static)
     * @param scene Scene that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param speed Speed level (for dynamic light modes)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForScene(scene: Scene, dimming?: number, speed?: number, ratio?: number): FavoriteLightMode;
    /**
     * Builds favorite light mode for Color
     * @param color Color definition that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForColor(color: Color, dimming?: number, ratio?: number): FavoriteLightMode;
    /**
     * Builds favorite light mode for Temperature
     * @param cct Temperature definition that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForTemperature(cct: Temperature, dimming?: number, ratio?: number): FavoriteLightMode;
    /**
     * Builds favorite light mode for Turning light On or Off as a favorite
     * @param onOff Should the light been turned on or off
     */
    static buildFavoriteForOnOff(onOff: boolean): FavoriteLightMode;
    /**
     * Builds favorite light mode for keeping previous mode when applying a favorite
     */
    static buildFavoriteForDoNothing(): FavoriteLightMode;
    extractLightModeArray(): number[];
    extractOptObject(): object;
}
export declare class SetFavoritesParameters {
    favs: number[][];
    opts: object[];
    favConfigTs: number;
    static buildFromFavorites(favorite1: FavoriteLightMode, favorite2: FavoriteLightMode, favorite3: FavoriteLightMode, favorite4: FavoriteLightMode): SetFavoritesParameters;
}
export declare class SetFavoritesMessage {
    method: string;
    version: number;
    id: number;
    params: SetFavoritesParameters;
    constructor();
    /**
     * Constructs set favorites message
     */
    static buildSetFavoritesMessage(params: SetFavoritesParameters): SetFavoritesMessage;
}
