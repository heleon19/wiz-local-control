"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertPWMRefreshRateToPWMConf(pwmRefreshRate) {
    const refreshRateHundreds = pwmRefreshRate / 100;
    return ("0" + refreshRateHundreds).slice(-2);
}
exports.convertPWMRefreshRateToPWMConf = convertPWMRefreshRateToPWMConf;
//# sourceMappingURL=helpers.js.map