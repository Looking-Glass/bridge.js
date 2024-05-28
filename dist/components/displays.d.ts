import { BridgeValue } from "./types";
export interface Display {
    calibration: CalibrationType | null;
    defaultQuilt: QuiltType | null;
    hardwareVersion: string;
    hwid: string;
    index: BridgeValue;
    state: BridgeValue;
    windowCoords: BridgeValue;
}
export interface CalibrationType {
    DPI: number;
    center: number;
    configVersion: string;
    flipImageX: number;
    flipImageY: number;
    flipSubp: number;
    fringe: number;
    invView: number;
    pitch: number;
    screenH: number;
    screenW: number;
    serial: string;
    slope: number;
    verticalAngle: number;
    viewCone: number;
}
export interface QuiltType {
    quiltAspect: number;
    quiltWidth: number;
    quiltHeight: number;
    rows: number;
    columns: number;
}
export declare function tryParseCalibration(value: string): CalibrationType | null;
export declare function tryParseQuilt(value: string): QuiltType | null;
export declare function tryParseDisplay(value: any): Display | null;
