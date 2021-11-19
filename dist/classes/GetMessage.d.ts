/**
 * Message sent to the lamp requesting its status
 */
export declare type GetPilotMessage = {
    method: "getPilot";
    version: number;
    id: number;
};
/**
 * WiZ Light power load
 */
export declare type GetPowerResponse = {
    method: "getPower";
    result: {
        power: number;
    };
};
/**
 * Message sent to the lamp requesting its power load
 */
export declare class GetPowerMessage {
    method: "getPower";
    version: number;
    id: number;
    constructor();
}
