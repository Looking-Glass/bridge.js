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

export async function BridgeEventDecoder(bridge_response: BridgePayload) {
	const bridge_event = bridge_response.payload.value.event as BridgeEvent
	switch (bridge_event.value) {
		case "Monitor Connect":
			console.log(`${"Monitor connected!"}`)
			break
		case "Monitor Disconnect":
			console.log(`${"Monitor disconnected!"}`)
			break
		case "Progress Start":
			console.log(`${"Progress started!"}`)
			break
		case "Progress Completion":
			console.log(`${"Progress completed!"}`)
			break
		case "Progress Update":
			console.log(`${"Progress updated!"}`)
			break
		case "Playlist Instance":
			console.log(`${"Playlist instance!"}`)
			break
		case "Playlist Insert":
			console.log(`${"Playlist insert!"}`)
			break
		case "Playlist Delete":
			console.log(`${"Playlist delete!"}`)
			break
		case "Sync/Play Playlist":
			console.log(`${"Sync/Play Playlist!"}`)
			break
		case "Sync/Play Playlist Complete":
			console.log(`${"Sync/Play Playlist Complete!"}`)
			break
		case "Sync/Play Playlist Cancelled":
			console.log(`${"Sync/Play Playlist Cancelled!"}`)
			break
		default:
			console.log("Unknown event")
			console.log(bridge_response)
			break
	}
}
