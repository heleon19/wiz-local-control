"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetFavoritesMessage = exports.SetFavoritesParameters = exports.FavoriteLightMode = void 0;
const class_validator_1 = require("class-validator");
const networkConstants = require("../constants");
class FavoriteLightMode {
    constructor() {
        this.sceneId = 0;
        this.r = 0;
        this.g = 0;
        this.b = 0;
        this.ww = 0;
        this.cw = 0;
        this.temperature = 0;
    }
    /**
     * Builds favorite light mode for the Scene (dynamic or static)
     * @param scene Scene that should be played as favorite
     * @param dimming Dimming level (for light modes that support dimming)
     * @param speed Speed level (for dynamic light modes)
     * @param ratio Ratio level (for products that support ratio)
     */
    static buildFavoriteForScene(scene, dimming, speed, ratio) {
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
    static buildFavoriteForColor(color, dimming, ratio) {
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
    static buildFavoriteForTemperature(cct, dimming, ratio) {
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
    static buildFavoriteForOnOff(onOff) {
        const favorite = new FavoriteLightMode();
        favorite.sceneId = onOff ? 254 : 0;
        return favorite;
    }
    /**
     * Builds favorite light mode for keeping previous mode when applying a favorite
     */
    static buildFavoriteForDoNothing() {
        const favorite = new FavoriteLightMode();
        favorite.sceneId = 255;
        return favorite;
    }
    extractLightModeArray() {
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
    extractOptObject() {
        return {
            dim: this.dim,
            spd: this.spd,
            ratio: this.ratio,
        };
    }
}
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "sceneId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "r", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "g", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "b", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "ww", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(255)
], FavoriteLightMode.prototype, "cw", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0)
], FavoriteLightMode.prototype, "temperature", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100)
], FavoriteLightMode.prototype, "dim", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(50),
    (0, class_validator_1.Max)(200)
], FavoriteLightMode.prototype, "spd", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100)
], FavoriteLightMode.prototype, "ratio", void 0);
exports.FavoriteLightMode = FavoriteLightMode;
class SetFavoritesParameters {
    constructor() {
        this.favConfigTs = 0;
    }
    static buildFromFavorites(favorite1, favorite2, favorite3, favorite4) {
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
__decorate([
    (0, class_validator_1.IsArray)()
], SetFavoritesParameters.prototype, "favs", void 0);
__decorate([
    (0, class_validator_1.IsArray)()
], SetFavoritesParameters.prototype, "opts", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(0)
], SetFavoritesParameters.prototype, "favConfigTs", void 0);
exports.SetFavoritesParameters = SetFavoritesParameters;
class SetFavoritesMessage {
    constructor() {
        this.method = "setFavs";
        this.method = networkConstants.setFavoritesMethod;
        this.version = 1;
        this.id = Math.floor(Math.random() * 10000 + 1);
    }
    /**
     * Constructs set favorites message
     */
    static buildSetFavoritesMessage(params) {
        const msg = new SetFavoritesMessage();
        msg.params = params;
        return msg;
    }
}
__decorate([
    (0, class_validator_1.ValidateNested)()
], SetFavoritesMessage.prototype, "params", void 0);
exports.SetFavoritesMessage = SetFavoritesMessage;
//# sourceMappingURL=Favorites.js.map