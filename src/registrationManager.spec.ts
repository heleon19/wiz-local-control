import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as dgram from "dgram";

import RegistrationManager from "./registrationManager";
import * as networkConstants from "./constants";

describe("Register light with IP", function() {});

describe("Register all lights", () => {
  beforeEach(() => {
    const socket = dgram.createSocket("udp4");
  });
  it("should send registration packet 3 times", async () => {
    const manager = new RegistrationManager();
    const stub = sinon.stub(manager, "registerDevice");

    const timer = await manager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
    );
    clearInterval(timer);

    return new Promise(resolve => {
      setTimeout(() => {
        expect(stub.calledThrice).to.be.true;
        resolve();
      }, 50);
    });
  });

  it("should return timer after for canceling interval", async () => {
    const manager = new RegistrationManager();
    const stub = sinon.stub(manager, "registerDevice");

    const timer = await manager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
    );
    clearInterval(timer);
    expect(timer).to.not.be.undefined;
  });
});
