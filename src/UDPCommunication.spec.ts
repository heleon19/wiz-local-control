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
    const spy = sinon.spy(socket, "bind");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(spy.calledOnce).to.be.true;
  });

  it("should close the socket after timeout", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stub = sinon.stub(socket, "once");
    const spy = sinon.spy(socket, "close");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );

    return new Promise(resolve => {
      setTimeout(() => {
        expect(spy.calledOnce).to.be.true;
        resolve();
      }, 1100);
    });
  });

  it("should start listening for state changes", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "once");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(spy.calledWith("listening")).to.be.true;
  });

  it("should start listening for incoming messages", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "on");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    expect(spy.calledWith("message")).to.be.true;
  });

  it("should send message when socket comes to Listening state", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "send");
    const msg = new RegistrationMessage("127.0.0.1", getLocalMac());

    await sendCommand(
      msg,
      lightIp,
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      socket,
    );
    return new Promise(resolve => {
      setTimeout(() => {
        expect(spy.calledOnce).to.be.true;
        resolve();
      }, 50);
    });
  });
});
