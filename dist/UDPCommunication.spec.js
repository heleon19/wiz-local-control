"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const ipFunctions_1 = require("./ipFunctions");
const networkConstants = require("./constants");
const dgram = require("dgram");
const UDPCommunication_1 = require("./UDPCommunication");
const Control_1 = require("./classes/Control");
describe("Send command", () => {
    it("should bind the socket", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const stubBind = sinon.stub(socket, "bind");
        stubBind.throws("mockup");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(stubBind.calledOnce).to.be.true;
    });
    it("should close the socket after timeout", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        sinon.stub(socket, "bind").returns(1);
        sinon.stub(socket, "once");
        const stubClose = sinon.stub(socket, "close");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(stubClose.calledOnce).to.be.true;
    });
    it("should start listening for state changes", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const stubBind = sinon.stub(socket, "bind");
        stubBind.resolves(1);
        const stubOnce = sinon.stub(socket, "once");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        const onStub = sinon
            .stub(socket, "on")
            .withArgs("message", () => { })
            .callsFake(function (event, callback) {
            callback(new Buffer(1), {});
            return this;
        });
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(stubOnce.calledWith("listening")).to.be.true;
    });
    it("should start listening for incoming messages", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        const onStub = sinon
            .stub(socket, "on")
            .withArgs("message", () => { })
            .callsFake(function (event, callback) {
            callback(Buffer.from("1"), {});
            return this;
        });
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(onStub.calledOnce).to.be.true;
    });
    it("should send message when socket comes to Listening state", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const spy = sinon.spy(socket, "send");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        sinon
            .stub(socket, "once")
            .withArgs("listening", () => { })
            .callsFake(function (event, callback) {
            callback(Buffer.from(""), {});
            return this;
        });
        stubSocketOnMessageCallback(socket, {});
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(spy.calledOnce).to.be.true;
    });
    it("should resolve with success when received msg", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        stubSocketOnMessageCallback(socket, {
            result: { success: true, data: {} },
        });
        const result = await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(result)
            .to.have.property("type")
            .equal("success");
    });
    it("should resolve with error if failed to parse the received msg", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        sinon
            .stub(socket, "on")
            .withArgs("message", () => { })
            .callsFake(function (event, callback) {
            callback(Buffer.from("123"), {});
            return this;
        });
        const result = await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(result)
            .to.have.property("type")
            .equal("error");
    });
    it("should resolve with error if msg has no result field and has no error field", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        stubSocketOnMessageCallback(socket, {});
        const result = await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(result)
            .to.have.property("type")
            .equal("error");
    });
    it("should resolve with error if msg has no result field and has error field", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        const errorData = { data: "123" };
        stubSocketOnMessageCallback(socket, { error: errorData });
        const result = await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(result)
            .to.have.property("type")
            .equal("error");
        (0, chai_1.expect)(result)
            .to.have.property("message")
            .equal(JSON.stringify(errorData));
    });
    it("should close the socket after finishing with message processing", async () => {
        const lightIp = "127.0.0.1";
        const localIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new Control_1.RegistrationMessage(localIp, (0, ipFunctions_1.getLocalMac)());
        const spy = sinon.spy(socket, "close");
        stubSocketOnMessageCallback(socket, {});
        await (0, UDPCommunication_1.default)(msg, lightIp, localIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        (0, chai_1.expect)(spy.calledOnce).to.be.true;
    });
});
function stubSocketOnMessageCallback(socket, incomingMsg) {
    sinon
        .stub(socket, "on")
        .withArgs("message", () => { })
        .callsFake(function (event, callback) {
        callback(Buffer.from(JSON.stringify(incomingMsg)), {});
        return this;
    });
}
//# sourceMappingURL=UDPCommunication.spec.js.map