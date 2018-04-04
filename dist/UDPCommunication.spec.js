"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const types_1 = require("./constants/types");
const ipFunctions_1 = require("./ipFunctions");
const networkConstants = require("./constants/communication");
const dgram = require("dgram");
const UDPCommunication_1 = require("./UDPCommunication");
describe("Send command", () => {
    it("should bind the socket", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const stubBind = sinon.stub(socket, "bind");
        stubBind.throws("mockup");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(stubBind.calledOnce).to.be.true;
    });
    it("should close the socket after timeout", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const stubBind = sinon.stub(socket, "bind");
        stubBind.returns(1);
        const stubOnce = sinon.stub(socket, "once");
        const stubClose = sinon.stub(socket, "close");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(stubClose.calledOnce).to.be.true;
    });
    it("should start listening for state changes", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const stubBind = sinon.stub(socket, "bind");
        stubBind.resolves(1);
        const stubOnce = sinon.stub(socket, "once");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        const onStub = sinon
            .stub(socket, "on")
            .withArgs("message")
            .callsFake(function (event, callback) {
            callback(new Buffer(1));
        });
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(stubOnce.calledWith("listening")).to.be.true;
    });
    it("should start listening for incoming messages", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        const onStub = sinon
            .stub(socket, "on")
            .withArgs("message")
            .callsFake(function (event, callback) {
            callback(new Buffer(1));
        });
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(onStub.calledOnce).to.be.true;
    });
    it("should send message when socket comes to Listening state", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const spy = sinon.spy(socket, "send");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        const onStub = sinon
            .stub(socket, "once")
            .withArgs("listening")
            .callsFake(function (event, callback) {
            callback();
        });
        stubSocketOnMessageCallback(socket, {});
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(spy.calledOnce).to.be.true;
    });
    it("should resolve with success when received msg", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        stubSocketOnMessageCallback(socket, {
            result: { success: true, data: {} },
        });
        const result = await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(result)
            .to.have.property("type")
            .equal("success");
    });
    it("should resolve with error if failed to parse the received msg", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        sinon
            .stub(socket, "on")
            .withArgs("message")
            .callsFake(function (event, callback) {
            callback(Buffer.from("123"));
        });
        const result = await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(result)
            .to.have.property("type")
            .equal("error");
    });
    it("should resolve with error if msg has no result field and has no error field", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        stubSocketOnMessageCallback(socket, {});
        const result = await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(result)
            .to.have.property("type")
            .equal("error");
    });
    it("should resolve with error if msg has no result field and has error field", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        const errorData = { data: "123" };
        stubSocketOnMessageCallback(socket, { error: errorData });
        const result = await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(result)
            .to.have.property("type")
            .equal("error");
        chai_1.expect(result)
            .to.have.property("message")
            .equal(JSON.stringify(errorData));
    });
    it("should close the socket after finishing with message processing", async () => {
        const lightIp = "127.0.0.1";
        const socket = dgram.createSocket("udp4");
        const msg = new types_1.RegistrationMessage("127.0.0.1", ipFunctions_1.getLocalMac());
        const spy = sinon.spy(socket, "close");
        stubSocketOnMessageCallback(socket, {});
        await UDPCommunication_1.default(msg, lightIp, networkConstants.LIGHT_UDP_CONTROL_PORT, false, socket);
        chai_1.expect(spy.calledOnce).to.be.true;
    });
});
function stubSocketOnMessageCallback(socket, incomingMsg) {
    sinon
        .stub(socket, "on")
        .withArgs("message")
        .callsFake(function (event, callback) {
        callback(Buffer.from(JSON.stringify(incomingMsg)));
    });
}
//# sourceMappingURL=UDPCommunication.spec.js.map