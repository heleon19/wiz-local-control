import { WiZControlMessage, Result } from "./constants/types";
/**
 * Sends message to the WiZ device
 * @param msg WiZ Control message to be sent to the lamp
 * @param ip WiZ device IP address
 */
export default function sendCommand(msg: WiZControlMessage, ip: string): Promise<Result>;
