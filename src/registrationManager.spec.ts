import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as dgram from "dgram";

import * as registrationManager from "./registrationManager";
import * as networkConstants from "./constants/communication";

describe("Register light with IP", function() {});

describe("Register all lights", () => {
  beforeEach(() => {
    const socket = dgram.createSocket("udp4");
    const stubBind = sinon.stub(socket, "bind");
    stubBind.throws("mockup");
    this.socket = socket;
    this.stubBind = stubBind;
  });
  it("should send registration packet 3 times", async () => {
    const timer = await registrationManager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      this.socket,
    );
    clearInterval(timer);

    return new Promise(resolve => {
      setTimeout(() => {
        expect(this.stubBind.calledThrice).to.be.true;
        resolve();
      }, 50);
    });
  });

  it("should return timer after for canceling interval", async () => {
    const timer = await registrationManager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
      this.socket,
    );
    clearInterval(timer);
    expect(timer).to.not.be.undefined;
  });
});
