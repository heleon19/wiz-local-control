"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPowerMessage = void 0;
const networkConstants = require("../constants");
/**
 * Message sent to the lamp requesting its power load
 */
class GetPowerMessage {
    constructor() {
        this.method = networkConstants.getPower;
        this.id = Math.floor(Math.random() * 10000 + 1);
        this.version = 1;
    }
}
exports.GetPowerMessage = GetPowerMessage;
//# sourceMappingURL=GetMessage.js.map