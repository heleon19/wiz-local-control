/// <reference types="node" />
import { Socket } from "dgram";
import { Result, WiZControlMessage, WiZMessageResponse } from "./classes/types";
/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 * @param localIp Current device local IP address
 * @param udpPort udp port to send a command
 * @param broadcast true/false broadcasting
 * @param socket socket name
 */
export default function sendCommand<T extends WiZMessageResponse>(msg: WiZControlMessage, ip: string, localIp: string, udpPort?: number, broadcast?: boolean, socket?: Socket): Promise<Result<T>>;
