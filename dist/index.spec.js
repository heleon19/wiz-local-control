"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const index_1 = require("./index");
const UDPManager_1 = require("./UDPManager");
const types_1 = require("./constants/types");
describe("Creating instance", () => {
    it("should create UDP manager when creating new instance", () => {
        const control = new index_1.default({ incomingMsgCallback: () => { } });
        chai_1.expect(control.udpManager).to.be.instanceof(UDPManager_1.default);
    });
    it("should pass interface name to UDP manager when provided", () => {
        const interfaceName = "test";
        const control = new index_1.default({
            incomingMsgCallback: () => { },
            interfaceName,
        });
        chai_1.expect(control.udpManager.interfaceName).to.be.equal(interfaceName);
    });
    it("should start listening when asked", async () => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const spyStart = sinon.stub(manager, "startListening");
        const spyStop = sinon.stub(manager, "stopListening");
        const control = new index_1.default({ incomingMsgCallback: () => { } });
        control.udpManager = manager;
        await control.startListening();
        await control.stopListening();
        chai_1.expect(spyStart.calledOnce).to.be.true;
    });
    it("should stop listening when asked", async () => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const spyStart = sinon.stub(manager, "startListening");
        const spyStop = sinon.stub(manager, "stopListening");
        const control = new index_1.default({ incomingMsgCallback: () => { } });
        control.udpManager = manager;
        await control.startListening();
        await control.stopListening();
        chai_1.expect(spyStop.called).to.be.true;
    });
});
describe("Sending commands", () => {
    beforeEach(() => {
        const manager = new UDPManager_1.default(() => { }, "eth0");
        const spy = sinon.stub(manager, "sendUDPCommand");
        this.control = new index_1.default({ incomingMsgCallback: () => { } });
        this.control.udpManager = manager;
        this.sendCommandSpy = spy;
    });
    it("msg was validated before sending", async () => {
        const spy = sinon.spy(this.control, "validateMsg");
        const targetIp = "127.0.0.1";
        await this.control.changeBrightness(15, targetIp);
        chai_1.expect(spy.called).to.be.true;
    });
    it("should form and send brightness command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeBrightness(50, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send scene command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeLightMode({ type: "scene", sceneId: 5, name: "tmp" }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send color command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeLightMode({ type: "color", r: 255, g: 255, b: 0, cw: 0, ww: 0 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send color temperature command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeLightMode({ type: "temperature", colorTemperature: 2500 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send speed change command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeSpeed(100, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send status change command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.changeStatus(100, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.SetPilotMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send update firmware command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.updateFirmware(undefined, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.UpdateFirmwareMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send get system config command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.getSystemConfig(targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.GetSystemConfigMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
    it("should form and send get power command", async () => {
        const spy = this.sendCommandSpy;
        const targetIp = "127.0.0.1";
        await this.control.getPower(targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        chai_1.expect(msg).to.be.instanceof(types_1.GetPowerMessage);
        chai_1.expect(ip).to.be.equal(targetIp);
    });
});
//# sourceMappingURL=index.spec.js.map