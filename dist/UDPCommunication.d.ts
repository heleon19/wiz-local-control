/// <reference types="node" />
import * as dgram from "dgram";
import { WiZControlMessage, Result, WiZMessageResponse } from "./constants/types";
/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 * @param localIp Current device local IP address
 */
export default function sendCommand<T extends WiZMessageResponse>(msg: WiZControlMessage, ip: string, localIp: string, udpPort?: number, broadcast?: boolean, socket?: dgram.Socket): Promise<Result<T>>;
