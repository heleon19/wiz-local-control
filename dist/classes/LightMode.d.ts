/**
 * Scene type – built in the bulb scenes. Could be one of the scenes listed
 * in staticScenes const
 */
export declare type Scene = {
    type: "scene";
    sceneId: number;
    name: string;
};
export declare type Color = {
    type: "color";
    r: number;
    g: number;
    b: number;
    cw: number;
    ww: number;
};
export declare type Temperature = {
    type: "temperature";
    colorTemperature: number;
};
/**
 * Light Mode type,
 * could be either
 * 1. Scene – determined by sceneId (1-28)
 * 2. Color - determined by Red, Green, Blue, Cool White, Warm White
 * (0-255). There is a limit on a maximum amount of channels used in the same time:
 * 3 RGB or 2 RGB + 1 White or 2 Whites
 * 3. Color temperature – form color temperature using Cool and Warm white LEDs (2000-9000)
 */
export declare type LightMode = Scene | Color | Temperature;
