"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const dgram = require("dgram");
const registrationManager_1 = require("./registrationManager");
const networkConstants = require("./constants");
describe("Register light with IP", function () { });
describe("Register all lights", () => {
    beforeEach(() => {
        const socket = dgram.createSocket("udp4");
    });
    it("should send registration packet 3 times", async () => {
        const manager = new registrationManager_1.default();
        const stub = sinon.stub(manager, "registerDevice");
        const timer = await manager.registerAllLights("eth0", networkConstants.LIGHT_UDP_CONTROL_PORT);
        clearInterval(timer);
        return new Promise(resolve => {
            setTimeout(() => {
                (0, chai_1.expect)(stub.calledThrice).to.be.true;
                resolve();
            }, 50);
        });
    });
    it("should return timer after for canceling interval", async () => {
        const manager = new registrationManager_1.default();
        const stub = sinon.stub(manager, "registerDevice");
        const timer = await manager.registerAllLights("eth0", networkConstants.LIGHT_UDP_CONTROL_PORT);
        clearInterval(timer);
        (0, chai_1.expect)(timer).to.not.be.undefined;
    });
});
//# sourceMappingURL=registrationManager.spec.js.map