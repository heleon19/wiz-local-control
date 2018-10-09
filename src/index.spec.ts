import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import WiZLocalControl from "./index";
import UDPManager from "./UDPManager";
import { SetPilotMessage, SetPilotParametersDimming, UpdateFirmwareMessage } from "./constants/types";

describe("Creating instance", () => {
  it("should create UDP manager when creating new instance", () => {
    const control = new WiZLocalControl({ incomingMsgCallback: () => {} });
    expect(control.udpManager).to.be.instanceof(UDPManager);
  });

  it("should pass interface name to UDP manager when provided", () => {
    const interfaceName = "test";
    const control = new WiZLocalControl({
      incomingMsgCallback: () => {},
      interfaceName,
    });
    expect(control.udpManager.interfaceName).to.be.equal(interfaceName);
  });

  it("should start listening when asked", async () => {
    const manager = new UDPManager(() => {}, "eth0");
    const spyStart = sinon.stub(manager, "startListening");
    const spyStop = sinon.stub(manager, "stopListening");

    const control = new WiZLocalControl({ incomingMsgCallback: () => {} });
    control.udpManager = manager;
    await control.startListening();
    await control.stopListening();
    expect(spyStart.calledOnce).to.be.true;
  });

  it("should stop listening when asked", async () => {
    const manager = new UDPManager(() => {}, "eth0");
    const spyStart = sinon.stub(manager, "startListening");
    const spyStop = sinon.stub(manager, "stopListening");

    const control = new WiZLocalControl({ incomingMsgCallback: () => {} });
    control.udpManager = manager;

    await control.startListening();
    await control.stopListening();
    expect(spyStop.called).to.be.true;
  });
});

describe("Sending commands", () => {
  beforeEach(() => {
    const manager = new UDPManager(() => {}, "eth0");
    const spy = sinon.stub(manager, "sendUDPCommand");

    this.control = new WiZLocalControl({ incomingMsgCallback: () => {} });
    this.control.udpManager = manager;
    this.sendCommandSpy = spy;
  });

  it("should form and send brightness command", async () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    await this.control.changeBrightness(50, targetIp);
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send scene command", () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    this.control.changeLightMode(
      { type: "scene", sceneId: 5, name: "tmp" },
      targetIp,
    );
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send color command", () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    this.control.changeLightMode(
      { type: "color", r: 255, g: 255, b: 0, cw: 0, ww: 0 },
      targetIp,
    );
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send color temperature command", () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    this.control.changeLightMode(
      { type: "temperature", colorTemperature: 2500 },
      targetIp,
    );
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send speed change command", () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    this.control.changeSpeed(100, targetIp);
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send status change command", () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    this.control.changeStatus(100, targetIp);
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(SetPilotMessage);
    expect(ip).to.be.equal(targetIp);
  });

  it("should form and send update firmware command", async () => {
    const spy: sinon.SinonSpy = this.sendCommandSpy;
    const targetIp = "127.0.0.1";
    await this.control.updateFirmware(targetIp);
    const msg = spy.getCall(0).args[0];
    const ip = spy.getCall(0).args[1];

    expect(msg).to.be.instanceof(UpdateFirmwareMessage);
    expect(ip).to.be.equal(targetIp);
  });
});
