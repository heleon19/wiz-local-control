import { expect } from "chai";
import * as sinon from "sinon";
import UDPManager from "./UDPManager";
import * as networkConstants from "./constants";
import * as dgram from "dgram";
import RegistrationManager from "./registrationManager";

describe("Start listening", () => {
  it("should stop listening before starting listening again", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const manager = new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    const spy = sinon.spy(manager, "stopListening");
    await manager.startListening();
    await manager.stopListening();

    expect(spy.calledTwice).to.be.true;
  });

  it("should bind the socket when start listening", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const manager = await new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    let spy: sinon.SinonSpy | undefined;
    sinon.stub(manager, "createSocket").callsFake(async () => {
      manager.socket = await dgram.createSocket("udp4");
      spy = sinon.spy(manager.socket, "bind");
      return;
    });

    await manager.startListening();
    expect(spy && spy.called).to.be.true;
    await manager.stopListening();
  });

  it("should call message processing when receiving message", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const manager = await new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    const spy = sinon.spy(manager, "processMessage");

    sinon.stub(manager, "createSocket").callsFake(async () => {
      manager.socket = await dgram.createSocket("udp4");
      sinon
        .stub(manager.socket, "on")
        .withArgs("message")
        .callsFake(function (
          event: string,
          callback: (msg: Buffer, rinfo: any) => void,
        ) {
          callback(Buffer.from(JSON.stringify({})), { address: 1 });
          return this;
        });
      return;
    });
    await manager.startListening();
    expect(spy.calledOnce).to.be.true;
    await manager.stopListening();
  });

  it("should save the timer saved after registering all lights and clear after stopping listening", async () => {
    // ToDo const clock = sinon.useFakeTimers();
    const registrationManager = new RegistrationManager();
    sinon
      .stub(registrationManager, "registerAllLights")
      .returns(setInterval(() => {}, 500));
    const manager = await new UDPManager(
      ()=>{},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    await manager.startListening();
    expect(manager.registerLightsTimer).to.not.be.undefined;
    await manager.stopListening();
    expect(manager.registerLightsTimer).to.be.undefined;
  });
});

describe("Stop listening", () => {
  it("should close the existing socket and create new one", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const manager = await new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    const spyCreateSocket = sinon.spy(manager, "createSocket");
    const spyCloseSocket = sinon.spy(manager.socket, "close");

    await manager.stopListening();
    expect(spyCloseSocket.calledOnce).to.be.true;
    expect(spyCreateSocket.calledOnce).to.be.true;
  });
});

describe("Process message", () => {
  it("should send syncPilot ack and call the incoming msg callback on receiving syncPilot", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const manager = await new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    const spySendSyncPilotAcknowledgement = sinon.stub(
      manager,
      "sendSyncPilotAcknowledgement",
    );
    const spyReceivedMsgCallback = sinon.stub(manager, "receivedMsgCallback");

    sinon.stub(manager, "createSocket").callsFake(async () => {
      manager.socket = await dgram.createSocket("udp4");
      sinon
        .stub(manager.socket, "on")
        .withArgs("message")
        .callsFake(function (
          event: string,
          callback: (msg: Buffer, rinfo: any) => void,
        ) {
          callback(Buffer.from(JSON.stringify({ method: "syncPilot", params: {} })),{ address: "1" });
          return this;
        });
      return;
    });
    await manager.startListening();
    expect(spySendSyncPilotAcknowledgement.calledOnce).to.be.true;
    expect(spyReceivedMsgCallback.calledOnce).to.be.true;
    await manager.stopListening();
  });

  it("should register device when got firstBeat message", async () => {
    const registrationManager = new RegistrationManager();
    sinon.stub(registrationManager, "registerAllLights");
    const spy = sinon.stub(registrationManager, "registerDevice");
    const manager = await new UDPManager(
      () => {},
      "eth0",
      networkConstants.DEVICE_UDP_LISTEN_PORT,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      registrationManager,
    );
    // const spyReceivedMsgCallback = sinon.stub(manager, "receivedMsgCallback");

    sinon.stub(manager, "createSocket").callsFake(async () => {
      manager.socket = await dgram.createSocket("udp4");
      sinon
        .stub(manager.socket, "on")
        .withArgs("message")
        .callsFake(function(
          event: string,
          callback: (msg: Buffer, rinfo: any) => void,
        ) {
          callback(Buffer.from(JSON.stringify({ method: "firstBeat", params: {} })),{ address: "1" });
          return this;
        });
      return;
    });
    await manager.startListening();
    expect(spy.calledOnce).to.be.true;
    await manager.stopListening();
  });
});
