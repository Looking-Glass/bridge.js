export interface BridgeOrchestration {
	name: "orchestration"
	type: BridgeType
	value: ""
}

export interface BridgePayload {
	name: "value"
	orchestration: BridgeOrchestration
	payload: {
		name: "payload"
		type: BridgeType
		value: BridgeValueMap
	}
}

export type BridgeType =
	| "BOOLEAN"
	| "CHAR"
	| "SHORT"
	| "UNSIGNED_SHORT"
	| "INT"
	| "LONG"
	| "FLOAT"
	| "DOUBLE"
	| "INT2"
	| "INT3"
	| "INT4"
	| "FLOAT2"
	| "FLOAT3"
	| "FLOAT4"
	| "FLOAT4X4"
	| "STRING"
	| "WSTRING"
	| "VARIANT_MAP"

export interface BridgeValue {
	name: string
	type: BridgeType
	value: string | number | boolean | { x: number; y: number }
}

export interface BridgeValueMap {
	[key: string]: BridgeValue
}

export interface BridgeEvent {
	name: "event"
	type: BridgeType
	value:
		| "Monitor Connect"
		| "Monitor Disconnect"
		| "Progress Start"
		| "Progress Completion"
		| "Progress Update"
		| "Playlist Instance"
		| "Playlist Insert"
		| "Playlist Delete"
		| "Sync/Play Playlist"
		| "Sync/Play Playlist Complete"
		| "Sync/Play Playlist Cancelled"
}