import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";
import { RegistrationMessage } from "./constants/types";
import { getLocalIPAddress, getLocalMac } from "./ipFunctions";
import * as networkConstants from "./constants/communication";
import * as dgram from "dgram";
import sendCommand from "./UDPCommunication";

describe("Send command", () => {
  it("should bind the socket", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stubBind = sinon.stub(socket, "bind");
    stubBind.throws("mockup");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubBind.calledOnce).to.be.true;
  });

  it("should close the socket after timeout", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");

    const stubBind = sinon.stub(socket, "bind");
    stubBind.returns(1);

    const stubOnce = sinon.stub(socket, "once");
    const stubClose = sinon.stub(socket, "close");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubClose.calledOnce).to.be.true;
  });

  it("should start listening for state changes", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stubBind = sinon.stub(socket, "bind");
    stubBind.resolves(1);

    const stubOnce = sinon.stub(socket, "once");

    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    const onStub = sinon
      .stub(socket, "on")
      .withArgs("message")
      .callsFake(function(
        event: string,
        callback: (msg: Buffer) => void,
      ): void {
        callback(new Buffer(1));
      });

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubOnce.calledWith("listening")).to.be.true;
  });

  it("should start listening for incoming messages", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    const onStub = sinon
      .stub(socket, "on")
      .withArgs("message")
      .callsFake(function(
        event: string,
        callback: (msg: Buffer) => void,
      ): void {
        callback(new Buffer(1));
      });

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(onStub.calledOnce).to.be.true;
  });

  it("should send message when socket comes to Listening state", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "send");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    const onStub = sinon
      .stub(socket, "once")
      .withArgs("listening")
      .callsFake(function(event: string, callback: () => void): void {
        callback();
      });

    stubSocketOnMessageCallback(socket, {});

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(spy.calledOnce).to.be.true;
  });

  it("should resolve with success when received msg", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    stubSocketOnMessageCallback(socket, {
      result: { success: true, data: {} },
    });
    const result = await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(result)
      .to.have.property("type")
      .equal("success");
  });

  it("should resolve with error if failed to parse the received msg", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    sinon
      .stub(socket, "on")
      .withArgs("message")
      .callsFake(function(
        event: string,
        callback: (msg: Buffer) => void,
      ): void {
        callback(Buffer.from("123"));
      });

    const result = await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(result)
      .to.have.property("type")
      .equal("error");
  });

  it("should resolve with error if msg has no result field and has no error field", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    stubSocketOnMessageCallback(socket, {});
    const result = await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(result)
      .to.have.property("type")
      .equal("error");
  });

  it("should resolve with error if msg has no result field and has error field", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    const errorData = { data: "123" };
    stubSocketOnMessageCallback(socket, { error: errorData });
    const result = await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(result)
      .to.have.property("type")
      .equal("error");

    expect(result)
      .to.have.property("message")
      .equal(JSON.stringify(errorData));
  });

  it("should close the socket after finishing with message processing", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());
    const spy = sinon.spy(socket, "close");
    stubSocketOnMessageCallback(socket, {});
    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(spy.calledOnce).to.be.true;
  });
});

function stubSocketOnMessageCallback(
  socket: dgram.Socket,
  incomingMsg: object,
) {
  sinon
    .stub(socket, "on")
    .withArgs("message")
    .callsFake(function(event: string, callback: (msg: Buffer) => void): void {
      callback(Buffer.from(JSON.stringify(incomingMsg)));
    });
}
