import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as dgram from "dgram";

import * as registrationManager from "./registrationManager";
import * as networkConstants from "./constants/communication";

describe("Register light with IP", function() {});

describe("Register all lights", () => {
  it("should send registration packet 3 times", async () => {
    const lightIp = "127.0.0.1";
    const socket = dgram.createSocket("udp4");
    const callback = sinon.spy();
    const timer = await registrationManager.registerAllLights(
      "eth0",
      networkConstants.LIGHT_UDP_CONTROL_PORT,
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
