import { WiZControlMessage, Result } from "./constants/types";
export default function sendCommand(msg: WiZControlMessage, ip: string): Promise<Result>;
