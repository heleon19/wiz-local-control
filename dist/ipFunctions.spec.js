"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ipFunctions = require("./ipFunctions");
describe("Local IP obtaining", () => {
    it("should obtain default current IP", async () => {
        const ip = await ipFunctions.getLocalIPAddress();
        chai_1.expect(ip).to.not.be.undefined;
    });
    it("should obtain default current IP if passed invalid interface", async () => {
        const ip = await ipFunctions.getLocalIPAddress("undefinedInterface");
        const defaultIP = await ipFunctions.getLocalIPAddress();
        chai_1.expect(ip).to.not.be.undefined;
        chai_1.expect(defaultIP).to.equal(ip);
    });
});
describe("Local MAC obtaining", () => {
    it("should obtain random MAC address-like string", () => {
        const mac = ipFunctions.getLocalMac();
        chai_1.expect(mac).to.match(new RegExp("[0-9a-f]{12}"));
    });
    it("should persist MAC address during current session", () => {
        const mac1 = ipFunctions.getLocalMac();
        const mac2 = ipFunctions.getLocalMac();
        chai_1.expect(mac1).to.be.equal(mac2);
    });
});
//# sourceMappingURL=ipFunctions.spec.js.map