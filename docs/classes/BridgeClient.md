[@lookingglass/bridge.js](../README.md) / BridgeClient

# Class: BridgeClient

## Table of contents

### Constructors

- [constructor](BridgeClient.md#constructor)

### Properties

- [version](BridgeClient.md#version)
- [instance](BridgeClient.md#instance)
- [verbosity](BridgeClient.md#verbosity)

### Methods

- [addEventListener](BridgeClient.md#addeventlistener)
- [apiVersion](BridgeClient.md#apiversion)
- [cast](BridgeClient.md#cast)
- [createOrchestration](BridgeClient.md#createorchestration)
- [deletePlaylist](BridgeClient.md#deleteplaylist)
- [displays](BridgeClient.md#displays)
- [getVerbosity](BridgeClient.md#getverbosity)
- [getVersion](BridgeClient.md#getversion)
- [initializeEventSource](BridgeClient.md#initializeeventsource)
- [setVerbosity](BridgeClient.md#setverbosity)
- [showWindow](BridgeClient.md#showwindow)
- [status](BridgeClient.md#status)
- [getInstance](BridgeClient.md#getinstance)

## Constructors

### constructor

• **new BridgeClient**()

## Properties

### version

• **version**: `number`

___

### instance

▪ `Static` **instance**: [`BridgeClient`](BridgeClient.md)

___

### verbosity

▪ `Static` **verbosity**: ``0`` \| ``2`` \| ``1`` \| ``3`` = `3`

## Methods

### addEventListener

▸ **addEventListener**(`event`, `MessageHandler`): `void`

Adds an event listener that returns a message from Bridge's websocket based event source.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `BridgeEvent` | the event to listen for |
| `MessageHandler` | `any` | the function to call when the event is received |

#### Returns

`void`

___

### apiVersion

▸ **apiVersion**(): `Promise`<{ `response`: `number` ; `success`: `boolean`  }\>

A helper function to get the version of the Looking Glass Bridge API

#### Returns

`Promise`<{ `response`: `number` ; `success`: `boolean`  }\>

the current version of the Looking Glass API

___

### cast

▸ **cast**(`hologram`): `Promise`<{ `success`: `boolean`  }\>

Casting a hologram requires some pretty specific behavior to work with Bridge' new playlist api.
This function will alternate between two playlists so that you can cast a new hologram without interrupting the current one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hologram` | `Hologram` |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### createOrchestration

▸ **createOrchestration**(`name`): `Promise`<{ `response`: ``null`` \| `string` ; `success`: `boolean`  }\>

Creates an orchestration called "default" if one does not already exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<{ `response`: ``null`` \| `string` ; `success`: `boolean`  }\>

string, the name of the current orchestration

___

### deletePlaylist

▸ **deletePlaylist**(`playlist`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = status } ; `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlist` | [`Playlist`](Playlist.md) |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = status } ; `success`: `boolean`  }\>

___

### displays

▸ **displays**(): `Promise`<{ `response`: ``null`` \| `Display`[] ; `success`: `boolean`  }\>

QueryDisplays finds all displays that are connected to the computer,
searches for Looking Glass displays, and returns them as an array of Display objects

#### Returns

`Promise`<{ `response`: ``null`` \| `Display`[] ; `success`: `boolean`  }\>

the display object

___

### getVerbosity

▸ **getVerbosity**(): ``0`` \| ``2`` \| ``1`` \| ``3``

#### Returns

``0`` \| ``2`` \| ``1`` \| ``3``

___

### getVersion

▸ **getVersion**(): `Promise`<{ `response`: `number` ; `success`: `boolean`  }\>

A helper function to get the version of Looking Glass Bridge that is running.

#### Returns

`Promise`<{ `response`: `number` ; `success`: `boolean`  }\>

string of the version of Looking Glass Bridge that is running

___

### initializeEventSource

▸ **initializeEventSource**(): `void`

Connect to Looking Glass Bridge's EventSource.
The event source is a websocket connection that will send events from Bridge to the client.

#### Returns

`void`

the bridge event source

___

### setVerbosity

▸ **setVerbosity**(`verbosity`): `void`

Set the level of console logging that Bridge.js library will do.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verbosity` | ``0`` \| ``2`` \| ``1`` \| ``3`` | 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response |

#### Returns

`void`

___

### showWindow

▸ **showWindow**(`showWindow`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = status } ; `success`: `boolean`  }\>

changes the state of the Looking Glass Bridge Window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `showWindow` | `boolean` | boolean, true to show the Looking Glass window, false to hide the Looking Glass window |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = status } ; `success`: `boolean`  }\>

___

### status

▸ **status**(): `Promise`<`boolean`\>

A helper function to check and see if Looking Glass Bridge is running or not.

#### Returns

`Promise`<`boolean`\>

boolean, true if Bridge is running, false if Bridge is not running

___

### getInstance

▸ `Static` **getInstance**(): [`BridgeClient`](BridgeClient.md)

#### Returns

[`BridgeClient`](BridgeClient.md)
