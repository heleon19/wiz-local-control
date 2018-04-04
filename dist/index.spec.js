"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const index_1 = require("./index");
const UDPManager_1 = require("./UDPManager");
const types_1 = require("./constants/types");
describe("Creating instance", () => {
    it("should create UDP manager when creating new instance", () => {
        const control = new index_1.default(() => { });
        chai_1.expect(control.udpManager).to.be.instanceof(UDPManager_1.default);
    });
    it("should use existing UDP manager when passed as a parameter", () => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const control = new index_1.default(() => { }, manager);
        chai_1.expect(control.udpManager).to.equal(manager);
    });
    it("should start listening when asked", async () => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const spyStart = sinon.stub(manager, "startListening");
        const spyStop = sinon.stub(manager, "stopListening");
        const control = new index_1.default(() => { }, manager);
        await control.startListening();
        await control.stopListening();
        chai_1.expect(spyStart.calledOnce).to.be.true;
    });
    it("should stop listening when asked", async () => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const spyStart = sinon.stub(manager, "startListening");
        const spyStop = sinon.stub(manager, "stopListening");
        const control = new index_1.default(() => { }, manager);
        await control.startListening();
        await control.stopListening();
        chai_1.expect(spyStop.called).to.be.true;
    });
});
describe("Sending commands", () => {
    beforeEach(() => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        this.control = new index_1.default(() => { }, manager, "eth0");
        const spy = sinon.stub(this.control, "sendCommandImpl");
        this.sendCommandSpy = spy;
    });
    it("should form and send brightness command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeBrightness(5, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send scene command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeLightMode({ type: "scene", sceneId: 5, name: "tmp" }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send color command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeLightMode({ type: "color", r: 255, g: 255, b: 0, cw: 0, ww: 0 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send color temperature command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeLightMode({ type: "temperature", colorTemperature: 2500 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send speed change command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeSpeed(100, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send status change command", () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        this.control.changeStatus(100, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
});
//# sourceMappingURL=index.spec.js.map