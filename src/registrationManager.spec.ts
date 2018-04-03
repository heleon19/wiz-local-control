import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as dgram from "dgram";

import * as registrationManager from "./registrationManager";
import * as networkConstants from "./constants/communication";

describe("Register light with IP", function() {
  it("should bind the socket", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "bind");

    await registrationManager.registerDevice(
      lightIp,
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      undefined,
      socket,
    );
    expect(spy.calledOnce).to.be.true;
  });

  it("should close the socket after timeout", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const stub = sinon.stub(socket, "once");
    const spy = sinon.spy(socket, "close");
    await registrationManager.registerDevice(
      lightIp,
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      undefined,
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
    await registrationManager.registerDevice(
      lightIp,
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      undefined,
      socket,
    );
    expect(spy.calledWith("listening")).to.be.true;
  });

  it("should start listening for incoming messages", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "on");
    await registrationManager.registerDevice(
      lightIp,
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      undefined,
      socket,
    );
    expect(spy.calledWith("message")).to.be.true;
  });

  it("should send message when socket comes to Listening state", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const spy = sinon.spy(socket, "send");
    await registrationManager.registerDevice(
      lightIp,
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      false,
      undefined,
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

describe("Register all lights", () => {
  it("should send registration packet 3 times", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const callback = sinon.spy();
    const timer = await registrationManager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      callback,
    );
    clearInterval(timer);
    return new Promise(resolve => {
      setTimeout(() => {
        expect(callback.calledThrice).to.be.true;
        resolve();
      }, 50);
    });
  });
});
