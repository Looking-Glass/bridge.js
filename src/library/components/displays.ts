import { BridgeValue } from "./types"

export interface Display {
	calibration: CalibrationType | null
	defaultQuilt: QuiltType | null
	hardwareVersion: string
	hwid: string
	index: BridgeValue
	state: BridgeValue
	windowCoords: BridgeValue
}

type Value = {
	value: number
}

interface BridgeCalibrationResponse {
	DPI: Value
	center: Value
	configVersion: string
	flipImageX: Value
	flipImageY: Value
	flipSubp: Value
	fringe: Value
	invView: Value
	pitch: Value
	screenH: Value
	screenW: Value
	serial: string
	slope: Value
	verticalAngle: Value
	viewCone: Value
}

export interface CalibrationType {
	DPI: number
	center: number
	configVersion: string
	flipImageX: number
	flipImageY: number
	flipSubp: number
	fringe: number
	invView: number
	pitch: number
	screenH: number
	screenW: number
	serial: string
	slope: number
	verticalAngle: number
	viewCone: number
}

export interface QuiltType {
	quiltAspect: number
	quiltWidth: number
	quiltHeight: number
	rows: number
	columns: number
}

export function tryParseCalibration(value: string): CalibrationType | null {
	const parsedValue = JSON.parse(value) as BridgeCalibrationResponse

	if (parsedValue == undefined) {
		console.warn("Unable to parse calibration")
		return null
	}

	const calibration: CalibrationType = {
		DPI: parsedValue.DPI.value,
		center: parsedValue.center.value,
		configVersion: parsedValue.configVersion,
		flipImageX: parsedValue.flipImageX.value,
		flipImageY: parsedValue.flipImageY.value,
		flipSubp: parsedValue.flipSubp.value,
		fringe: parsedValue.fringe.value,
		invView: parsedValue.invView.value,
		pitch: parsedValue.pitch.value,
		screenH: parsedValue.screenH.value,
		screenW: parsedValue.screenW.value,
		serial: parsedValue.serial,
		slope: parsedValue.slope.value,
		verticalAngle: parsedValue.verticalAngle.value,
		viewCone: parsedValue.viewCone.value,
	}
	return calibration
}

export function tryParseQuilt(value: string): QuiltType | null {
	const parsedValue = JSON.parse(value)

	if (parsedValue == undefined) {
		return null
	}

	const quilt: QuiltType = {
		quiltAspect: parsedValue.quiltAspect,
		quiltWidth: parsedValue.quiltX,
		quiltHeight: parsedValue.quiltY,
		rows: parsedValue.tileY,
		columns: parsedValue.tileX,
	}
	return quilt
}

export function tryParseDisplay(value: any): Display | null {
	const display: Display = {
		calibration: tryParseCalibration(value.calibration.value),
		defaultQuilt: tryParseQuilt(value.defaultQuilt.value),
		hwid: value.hwid.value,
		hardwareVersion: value.hardwareVersion.value,
		index: value.index.value,
		state: value.state.value,
		windowCoords: value.windowCoords.value,
	}
	return display
}
