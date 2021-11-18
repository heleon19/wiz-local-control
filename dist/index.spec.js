"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const index_1 = require("./index");
const UDPManager_1 = require("./UDPManager");
const Pilot_1 = require("./classes/Pilot");
const Control_1 = require("./classes/Control");
const SystemConfig_1 = require("./classes/SystemConfig");
const GetMessage_1 = require("./classes/GetMessage");
const types_1 = require("../dist/constants/types");
describe("Creating instance", () => {
    it("should create UDP manager when creating new instance", () => {
        const control = new index_1.default({
            incomingMsgCallback: () => {
            },
        });
        (0, chai_1.expect)(control.udpManager).to.be.instanceof(UDPManager_1.default);
    });
    it("should pass interface name to UDP manager when provided", () => {
        const interfaceName = "test";
        const control = new index_1.default({
            incomingMsgCallback: () => { },
            interfaceName,
        });
        (0, chai_1.expect)(control.udpManager.interfaceName).to.be.equal(interfaceName);
    });
    it("should start listening when asked", async () => {
        const manager = new UDPManager_1.default(() => {
        }, "eth0");
        const spyStart = sinon.stub(manager, "startListening");
        sinon.stub(manager, "stopListening");
        const control = new index_1.default({
            incomingMsgCallback: () => {
            },
        });
        control.udpManager = manager;
        await control.startListening();
        await control.stopListening();
        (0, chai_1.expect)(spyStart.calledOnce).to.be.true;
    });
    it("should stop listening when asked", async () => {
        const manager = new UDPManager_1.default(() => {
        }, "eth0");
        sinon.stub(manager, "startListening");
        const spyStop = sinon.stub(manager, "stopListening");
        const control = new index_1.default({
            incomingMsgCallback: () => {
            },
        });
        control.udpManager = manager;
        await control.startListening();
        await control.stopListening();
        (0, chai_1.expect)(spyStop.called).to.be.true;
    });
});
describe("Sending commands", () => {
    let control, sendCommandSpy;
    beforeEach(() => {
        const manager = new UDPManager_1.default(() => {
        }, "eth0");
        sendCommandSpy = sinon.stub(manager, "sendUDPCommand");
        control = new index_1.default({
            incomingMsgCallback: () => {
            },
        });
        control.udpManager = manager;
    });
    it("msg was validated before sending", async () => {
        const spy = sinon.spy(control, "validateMsg");
        const targetIp = "127.0.0.1";
        await control.changeBrightness(15, targetIp);
        (0, chai_1.expect)(spy.called).to.be.true;
    });
    it("should form and send brightness command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeBrightness(50, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send scene command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeLightMode({ type: "scene", sceneId: 5, name: "tmp" }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send color command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeLightMode({ type: "color", r: 255, g: 255, b: 0, cw: 0, ww: 0 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send color temperature command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeLightMode({ type: "temperature", colorTemperature: 2500 }, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send speed change command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeSpeed(100, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send status change command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.changeStatus(Boolean(100), targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Pilot_1.SetPilotMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send update firmware command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.updateFirmware(undefined, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(Control_1.UpdateFirmwareMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send get system config command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.getSystemConfig(targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(SystemConfig_1.GetSystemConfigMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send get power command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        await control.getPower(targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(GetMessage_1.GetPowerMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send setModelConfig command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        const params = {
            confTs: 1596790372,
            ps: 2,
            pwmFreq: 1000,
            pwmRange: [0, 100],
            wcr: 20,
            nowc: 2,
            cctRange: [2200, 2700, 6500, 9000],
            renderFactor: "ff0000ff00000051f5b2",
            hasAdjMinDim: true,
            hasTapSensor: true,
            pm: 1,
            fanSpeed: 6,
        };
        await control.setModelConfig(params, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(types_1.SetModelConfigMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send setSystemConfig command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        const params = {
            moduleName: "thisIsA32CharacterLongModuleName",
            drvConf: [20, 2],
            ewf: "ff0000ff00000051f5b2",
            fs: 6,
        };
        await control.setSystemConfig(params, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(SystemConfig_1.SetSystemConfigMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
    it("should form and send setUserConfig command", async () => {
        const spy = sendCommandSpy;
        const targetIp = "127.0.0.1";
        const params = {
            pwmRange: [0, 100],
            whiteRange: [2700, 6500],
            extRange: [2200, 9000],
        };
        await control.setUserConfig(params, targetIp);
        const msg = spy.getCall(0).args[0];
        const ip = spy.getCall(0).args[1];
        (0, chai_1.expect)(msg).to.be.instanceof(types_1.SetUserConfigMessage);
        (0, chai_1.expect)(ip).to.be.equal(targetIp);
    });
});
//# sourceMappingURL=index.spec.js.map