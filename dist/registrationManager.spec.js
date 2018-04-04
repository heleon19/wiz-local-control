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
const sinon = require("sinon");
const dgram = require("dgram");
const registrationManager_1 = require("./registrationManager");
const networkConstants = require("./constants/communication");
describe("Register light with IP", function () { });
describe("Register all lights", () => {
    beforeEach(() => {
        const socket = dgram.createSocket("udp4");
    });
    it("should send registration packet 3 times", () => __awaiter(this, void 0, void 0, function* () {
        const manager = new registrationManager_1.default();
        const stub = sinon.stub(manager, "registerDevice");
        const timer = yield manager.registerAllLights("eth0", networkConstants.LIGHT_UDP_CONTROL_PORT);
        clearInterval(timer);
        return new Promise(resolve => {
            setTimeout(() => {
                chai_1.expect(stub.calledThrice).to.be.true;
                resolve();
            }, 50);
        });
    }));
    it("should return timer after for canceling interval", () => __awaiter(this, void 0, void 0, function* () {
        const manager = new registrationManager_1.default();
        const stub = sinon.stub(manager, "registerDevice");
        const timer = yield manager.registerAllLights("eth0", networkConstants.LIGHT_UDP_CONTROL_PORT);
        clearInterval(timer);
        chai_1.expect(timer).to.not.be.undefined;
    }));
});
//# sourceMappingURL=registrationManager.spec.js.map