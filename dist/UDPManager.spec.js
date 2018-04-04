"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = require("sinon");
const UDPManager_1 = require("./UDPManager");
const networkConstants = require("./constants/communication");
const dgram = require("dgram");
const registrationManager_1 = require("./registrationManager");
describe("Start listening", () => {
    it("should stop listening before starting listening again", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const manager = new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        const spy = sinon.spy(manager, "stopListening");
        yield manager.startListening();
        yield manager.stopListening();
        chai_1.expect(spy.calledTwice).to.be.true;
    }));
    it("should bind the socket when start listening", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        let spy;
        sinon.stub(manager, "createSocket").callsFake(() => __awaiter(this, void 0, void 0, function* () {
            manager.socket = yield dgram.createSocket("udp4");
            spy = sinon.spy(manager.socket, "bind");
            return;
        }));
        yield manager.startListening();
        chai_1.expect(spy && spy.called).to.be.true;
        yield manager.stopListening();
    }));
    it("should call message processing when receiving message", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        const spy = sinon.spy(manager, "processMessage");
        sinon.stub(manager, "createSocket").callsFake(() => __awaiter(this, void 0, void 0, function* () {
            manager.socket = yield dgram.createSocket("udp4");
            const onStub = sinon
                .stub(manager.socket, "on")
                .withArgs("message")
                .callsFake(function (event, callback) {
                callback(new Buffer(JSON.stringify({})), { address: 1 });
            });
            return;
        }));
        yield manager.startListening();
        chai_1.expect(spy.calledOnce).to.be.true;
        yield manager.stopListening();
    }));
    it("should save the timer saved after registering all lights and clear after stopping listening", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon
            .stub(registrationManager, "registerAllLights")
            .returns(setInterval(() => { }, 500));
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        yield manager.startListening();
        chai_1.expect(manager.registerLightsTimer).to.not.be.undefined;
        yield manager.stopListening();
        chai_1.expect(manager.registerLightsTimer).to.be.undefined;
    }));
});
describe("Stop listening", () => {
    it("should close the existing socket and create new one", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        const spyCreateSocket = sinon.spy(manager, "createSocket");
        const spyCloseSocket = sinon.spy(manager.socket, "close");
        yield manager.stopListening();
        chai_1.expect(spyCloseSocket.calledOnce).to.be.true;
        chai_1.expect(spyCreateSocket.calledOnce).to.be.true;
    }));
});
describe("Process message", () => {
    it("should send syncPilot ack and call the incoming msg callback on receiving syncPilot", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        const spySendSyncPilotAcknowledgement = sinon.stub(manager, "sendSyncPilotAcknowledgement");
        const spyReceivedMsgCallback = sinon.stub(manager, "receivedMsgCallback");
        sinon.stub(manager, "createSocket").callsFake(() => __awaiter(this, void 0, void 0, function* () {
            manager.socket = yield dgram.createSocket("udp4");
            const onStub = sinon
                .stub(manager.socket, "on")
                .withArgs("message")
                .callsFake(function (event, callback) {
                callback(new Buffer(JSON.stringify({ method: "syncPilot", params: {} })), { address: "1" });
            });
            return;
        }));
        yield manager.startListening();
        chai_1.expect(spySendSyncPilotAcknowledgement.calledOnce).to.be.true;
        chai_1.expect(spyReceivedMsgCallback.calledOnce).to.be.true;
        yield manager.stopListening();
    }));
    it("should register device when got firstBeat message", () => __awaiter(this, void 0, void 0, function* () {
        const registrationManager = new registrationManager_1.default();
        sinon.stub(registrationManager, "registerAllLights");
        const spy = sinon.stub(registrationManager, "registerDevice");
        const manager = yield new UDPManager_1.default((msg) => { }, "eth0", networkConstants.DEVICE_UDP_LISTEN_PORT, networkConstants.LIGHT_UDP_CONTROL_PORT, registrationManager);
        const spyReceivedMsgCallback = sinon.stub(manager, "receivedMsgCallback");
        sinon.stub(manager, "createSocket").callsFake(() => __awaiter(this, void 0, void 0, function* () {
            manager.socket = yield dgram.createSocket("udp4");
            const onStub = sinon
                .stub(manager.socket, "on")
                .withArgs("message")
                .callsFake(function (event, callback) {
                callback(new Buffer(JSON.stringify({ method: "firstBeat", params: {} })), { address: "1" });
            });
            return;
        }));
        yield manager.startListening();
        chai_1.expect(spy.calledOnce).to.be.true;
        yield manager.stopListening();
    }));
});
//# sourceMappingURL=UDPManager.spec.js.map