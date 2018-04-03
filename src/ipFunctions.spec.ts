import {} from "mocha";
import { expect } from "chai";
import * as sinon from "sinon";

import * as ipFunctions from "./ipFunctions";

describe("Local IP obtaining", () => {
  it("should obtain default current IP", async () => {
    const ip = await ipFunctions.getLocalIPAddress();
    expect(ip).to.not.be.undefined;
  });

  it("should obtain default current IP if passed invalid interface", async () => {
    const ip = await ipFunctions.getLocalIPAddress("undefinedInterface");
    const defaultIP = await ipFunctions.getLocalIPAddress();
    expect(ip).to.not.be.undefined;
    expect(defaultIP).to.equal(ip);
  });
});

describe("Local MAC obtaining", () => {
  it("should obtain random MAC address-like string", () => {
    const mac = ipFunctions.getLocalMac();
    expect(mac).to.match(new RegExp("[0-9a-f]{12}"));
  });
  it("should persist MAC address during current session", () => {
    const mac1 = ipFunctions.getLocalMac();
    const mac2 = ipFunctions.getLocalMac();
    expect(mac1).to.be.equal(mac2);
  });
});
