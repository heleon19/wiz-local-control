import { FavoriteLightMode } from "./Favorites";
export declare type WiZClickMode = FavoriteLightMode;
export declare class SetWiZClickParameters {
    wizc1: {
        mode: number[];
        opts: object;
    };
    wizc2: {
        mode: number[];
        opts: object;
    };
    confTs: number;
    static buildFromWiZClickModes(wizClick1: WiZClickMode, wizClick2: WiZClickMode): SetWiZClickParameters;
}
export declare class SetWiZClickMessage {
    method: string;
    version: number;
    id: number;
    params: SetWiZClickParameters;
    constructor();
    /**
     * Constructs set WiZ Click message
     */
    static buildSetWiZClickMessage(params: SetWiZClickParameters): SetWiZClickMessage;
}
