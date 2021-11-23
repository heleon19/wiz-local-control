"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staticScenes = exports.MQTTConnectionStatus = void 0;
/**
 * MQTT connection status,
 * lamp will report it under some certain testing conditions
 */
var MQTTConnectionStatus;
(function (MQTTConnectionStatus) {
    MQTTConnectionStatus[MQTTConnectionStatus["Success"] = 0] = "Success";
    MQTTConnectionStatus[MQTTConnectionStatus["LibraryError"] = -1] = "LibraryError";
    MQTTConnectionStatus[MQTTConnectionStatus["NetworkConnectionError"] = -2] = "NetworkConnectionError";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMissing"] = -3] = "MQTTServerCertMissing";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMalformed"] = -4] = "MQTTServerCertMalformed";
    MQTTConnectionStatus[MQTTConnectionStatus["HandshakeError"] = -5] = "HandshakeError";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTServerCertMismatch"] = -6] = "MQTTServerCertMismatch";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTLibraryError"] = 1] = "MQTTLibraryError";
    MQTTConnectionStatus[MQTTConnectionStatus["NoCredentials"] = 2] = "NoCredentials";
    MQTTConnectionStatus[MQTTConnectionStatus["MQTTClientInitFailure"] = 3] = "MQTTClientInitFailure";
    MQTTConnectionStatus[MQTTConnectionStatus["ErrorLoadingPasswordFromFlash"] = 4] = "ErrorLoadingPasswordFromFlash";
    MQTTConnectionStatus[MQTTConnectionStatus["PasswordError"] = 5] = "PasswordError";
})(MQTTConnectionStatus = exports.MQTTConnectionStatus || (exports.MQTTConnectionStatus = {}));
exports.staticScenes = [
    {
        type: "scene",
        sceneId: 1,
        name: "Ocean",
    },
    {
        type: "scene",
        sceneId: 2,
        name: "Romance",
    },
    {
        type: "scene",
        sceneId: 3,
        name: "Sunset",
    },
    {
        type: "scene",
        sceneId: 4,
        name: "Party",
    },
    {
        type: "scene",
        sceneId: 5,
        name: "Fireplace",
    },
    {
        type: "scene",
        sceneId: 6,
        name: "Cozy",
    },
    {
        type: "scene",
        sceneId: 7,
        name: "Forest",
    },
    {
        type: "scene",
        sceneId: 8,
        name: "Pastel colors",
    },
    {
        type: "scene",
        sceneId: 9,
        name: "Wake up",
    },
    {
        type: "scene",
        sceneId: 10,
        name: "Bedtime",
    },
    {
        type: "scene",
        sceneId: 11,
        name: "Warm white",
    },
    {
        type: "scene",
        sceneId: 12,
        name: "Daylight",
    },
    {
        type: "scene",
        sceneId: 13,
        name: "Cool white",
    },
    {
        type: "scene",
        sceneId: 14,
        name: "Night Light",
    },
    {
        type: "scene",
        sceneId: 15,
        name: "Focus",
    },
    {
        type: "scene",
        sceneId: 16,
        name: "Relax",
    },
    {
        type: "scene",
        sceneId: 17,
        name: "True colors",
    },
    {
        type: "scene",
        sceneId: 18,
        name: "TV Time",
    },
    {
        type: "scene",
        sceneId: 19,
        name: "Plant growth",
    },
    {
        type: "scene",
        sceneId: 20,
        name: "Spring",
    },
    {
        type: "scene",
        sceneId: 21,
        name: "Summer",
    },
    {
        type: "scene",
        sceneId: 22,
        name: "Fall",
    },
    {
        type: "scene",
        sceneId: 23,
        name: "Deep dive",
    },
    {
        type: "scene",
        sceneId: 24,
        name: "Jungle",
    },
    {
        type: "scene",
        sceneId: 25,
        name: "Mojito",
    },
    {
        type: "scene",
        sceneId: 26,
        name: "Club",
    },
    {
        type: "scene",
        sceneId: 27,
        name: "Christmas",
    },
    {
        type: "scene",
        sceneId: 28,
        name: "Halloween",
    },
    {
        type: "scene",
        sceneId: 29,
        name: "Candlelight",
    },
    {
        type: "scene",
        sceneId: 30,
        name: "Golden White",
    },
    {
        type: "scene",
        sceneId: 31,
        name: "Pulse",
    },
    {
        type: "scene",
        sceneId: 32,
        name: "Steampunk",
    },
];
//# sourceMappingURL=types.js.map