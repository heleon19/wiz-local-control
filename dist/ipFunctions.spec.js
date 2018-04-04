"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ipFunctions = require("./ipFunctions");
describe("Local IP obtaining", () => {
    it("should obtain default current IP", () => __awaiter(this, void 0, void 0, function* () {
        const ip = yield ipFunctions.getLocalIPAddress();
        chai_1.expect(ip).to.not.be.undefined;
    }));
    it("should obtain default current IP if passed invalid interface", () => __awaiter(this, void 0, void 0, function* () {
        const ip = yield ipFunctions.getLocalIPAddress("undefinedInterface");
        const defaultIP = yield ipFunctions.getLocalIPAddress();
        chai_1.expect(ip).to.not.be.undefined;
        chai_1.expect(defaultIP).to.equal(ip);
    }));
});
describe("Local MAC obtaining", () => {
    it("should obtain random MAC address-like string", () => {
        const mac = ipFunctions.getLocalMac();
        chai_1.expect(mac).to.match(new RegExp("[0-9a-f]{12}"));
    });
    it("should persist MAC address during current session", () => {
        const mac1 = ipFunctions.getLocalMac();
        const mac2 = ipFunctions.getLocalMac();
        chai_1.expect(mac1).to.be.equal(mac2);
    });
});
//# sourceMappingURL=ipFunctions.spec.js.map