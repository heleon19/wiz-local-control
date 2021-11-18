import { expect } from "chai";
import * as sinon from "sinon";
import { getLocalMac } from "./ipFunctions";
import * as networkConstants from "./constants";
import * as dgram from "dgram";
import sendCommand from "./UDPCommunication";
import { RegistrationMessage } from "./classes/Control";

describe("Send command", () => {
  it("should bind the socket", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stubBind = sinon.stub(socket, "bind");
    stubBind.throws("mockup");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      localIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubBind.calledOnce).to.be.true;
  });

  it("should close the socket after timeout", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");

    sinon.stub(socket, "bind").returns(1);
    sinon.stub(socket, "once");
    const stubClose = sinon.stub(socket, "close");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      localIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubClose.calledOnce).to.be.true;
  });

  it("should start listening for state changes", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stubBind = sinon.stub(socket, "bind");
    stubBind.resolves(1);

    const stubOnce = sinon.stub(socket, "once");

    const msg = new RegistrationMessage(localIp, getLocalMac());

    const onStub = sinon
      .stub(socket, "on")
      .withArgs("message", () => {})
      .callsFake(function (
        event: string,
        callback: (msg: Buffer, rinfo: any) => void,
      ) {
        callback(new Buffer(1),{ });
        return this;
      });

    await sendCommand(
      msg,
      lightIp,
      localIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(stubOnce.calledWith("listening")).to.be.true;
  });

  it("should start listening for incoming messages", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    const onStub = sinon
      .stub(socket, "on")
      .withArgs("message", () => {})
      .callsFake(function (
        event: string,
        callback: (msg: Buffer, rinfo: any) => void,
      ) {
        callback(Buffer.from("1"),{ });
        return this;
      });

    await sendCommand(
      msg,
      lightIp,
      localIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(onStub.calledOnce).to.be.true;
  });

  it("should send message when socket comes to Listening state", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "send");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    sinon
      .stub(socket, "once")
      .withArgs("listening", () => {})
      .callsFake(function (
        event: string,
        callback: (msg: Buffer, rinfo: any) => void,
      ) {
        callback(Buffer.from(""),{ });
        return this;
      });

    stubSocketOnMessageCallback(socket, {});

    await sendCommand(
      msg,
      lightIp,
      localIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    expect(spy.calledOnce).to.be.true;
  });

  it("should resolve with success when received msg", async () => {
    const lightIp = "127.0.0.1";
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    stubSocketOnMessageCallback(socket, {
      result: { success: true, data: {} },
    });
    const result = await sendCommand(
      msg,
      lightIp,
      localIp,
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
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    sinon
      .stub(socket, "on")
      .withArgs("message", () => {})
      .callsFake(function (
        event: string,
        callback: (msg: Buffer, rinfo: any) => void,
      ) {
        callback(Buffer.from("123"), {});
        return this;
      });

    const result = await sendCommand(
      msg,
      lightIp,
      localIp,
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
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    stubSocketOnMessageCallback(socket, {});
    const result = await sendCommand(
      msg,
      lightIp,
      localIp,
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
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());

    const errorData = { data: "123" };
    stubSocketOnMessageCallback(socket, { error: errorData });
    const result = await sendCommand(
      msg,
      lightIp,
      localIp,
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
    const localIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const msg = new RegistrationMessage(localIp, getLocalMac());
    const spy = sinon.spy(socket, "close");
    stubSocketOnMessageCallback(socket, {});
    await sendCommand(
      msg,
      lightIp,
      localIp,
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
    .withArgs("message", () => {})
    .callsFake(function (event: string, callback: (msg: Buffer, rinfo: any) => void) {
    callback(Buffer.from(JSON.stringify(incomingMsg)),{});
    return this;
  });
}
