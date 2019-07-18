import {} from "mocha";
import { expect } from "chai";
import { convertPWMRefreshRateToPWMConf } from "./helpers";

describe("helpers", () => {

  it("should convert PWM refresh rate to PWM config", () => {
    const zeroResult = convertPWMRefreshRateToPWMConf(0);
    expect(zeroResult).to.be.equal("00");
    const twoHundredsResult = convertPWMRefreshRateToPWMConf(200);
    expect(twoHundredsResult).to.be.equal("02");
    const fiveHundredsResult = convertPWMRefreshRateToPWMConf(500);
    expect(fiveHundredsResult).to.be.equal("05");
  });

});
