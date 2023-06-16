[@lookingglass/bridge](../README.md) / [client](../modules/client.md) / BridgeClient

# Class: BridgeClient

[client](../modules/client.md).BridgeClient

## Table of contents

### Constructors

- [constructor](client.BridgeClient.md#constructor)

### Properties

- [currentPlaylistIndex](client.BridgeClient.md#currentplaylistindex)
- [playlists](client.BridgeClient.md#playlists)
- [version](client.BridgeClient.md#version)
- [eventsource](client.BridgeClient.md#eventsource)
- [fallback](client.BridgeClient.md#fallback)
- [instance](client.BridgeClient.md#instance)
- [verbosity](client.BridgeClient.md#verbosity)

### Methods

- [addEventListener](client.BridgeClient.md#addeventlistener)
- [apiVersion](client.BridgeClient.md#apiversion)
- [cast](client.BridgeClient.md#cast)
- [connect](client.BridgeClient.md#connect)
- [createOrchestration](client.BridgeClient.md#createorchestration)
- [deletePlaylist](client.BridgeClient.md#deleteplaylist)
- [disconnect](client.BridgeClient.md#disconnect)
- [displays](client.BridgeClient.md#displays)
- [getVerbosity](client.BridgeClient.md#getverbosity)
- [getVersion](client.BridgeClient.md#getversion)
- [removeEventListener](client.BridgeClient.md#removeeventlistener)
- [setVerbosity](client.BridgeClient.md#setverbosity)
- [showWindow](client.BridgeClient.md#showwindow)
- [status](client.BridgeClient.md#status)
- [getInstance](client.BridgeClient.md#getinstance)

## Constructors

### constructor

• **new BridgeClient**()

## Properties

### currentPlaylistIndex

• **currentPlaylistIndex**: `number`

The index of playlists that is currently active

___

### playlists

• **playlists**: `undefined`[] \| [`Playlist`](playlists_playlist.Playlist.md)[]

an Array containing Playlists, we store this to easily switch between multiple playlists

___

### version

• **version**: `number`

the version of the Looking Glass Driver that's running

___

### eventsource

▪ `Static` **eventsource**: [`BridgeEventSource`](components_eventsource.BridgeEventSource.md)

The websocket connection to Bridge's Event Source, this returns information from Bridge

___

### fallback

▪ `Static` **fallback**: [`Fallback`](components_fallback.Fallback.md)

___

### instance

▪ `Static` **instance**: [`BridgeClient`](client.BridgeClient.md)

the instance of the client that we create, BridgeClient is a singleton, there can only be one

___

### verbosity

▪ `Static` **verbosity**: ``0`` \| ``2`` \| ``1`` \| ``3`` = `3`

control how often we log to the console, 3 is everything, 0 is nothing

## Methods

### addEventListener

▸ **addEventListener**<`T`\>(`event`, `MessageHandler`): `Promise`<`void`\>

Adds an event listener that returns a message from Bridge's websocket based event source.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `T` | the event to listen for |
| `MessageHandler` | (`event`: [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap)[`T`]) => `void` | the function to call when the event is received |

#### Returns

`Promise`<`void`\>

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

This function will allow you to cast a single hologram to the Looking Glass

#### Parameters

| Name | Type |
| :------ | :------ |
| `hologram` | [`HologramType`](../modules/components_hologram.md#hologramtype) |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### connect

▸ **connect**(): `Promise`<{ `response`: { `orchestration`: `string` ; `version`: `number`  } ; `success`: `boolean`  }\>

Attempt to connect to Looking Glass Bridge.

#### Returns

`Promise`<{ `response`: { `orchestration`: `string` ; `version`: `number`  } ; `success`: `boolean`  }\>

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

▸ **deletePlaylist**(`playlist`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status } ; `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlist` | [`Playlist`](playlists_playlist.Playlist.md) |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `payload`: { type: "VARIANT\_MAP"; value: { name: { type: "WSTRING"; value: string; name: string; }; }; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status } ; `success`: `boolean`  }\>

___

### disconnect

▸ **disconnect**(): `Promise`<{ `success`: `boolean`  }\>

Disconnect from Looking Glass Bridge, free up resources.

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### displays

▸ **displays**(): `Promise`<{ `response`: ``null`` \| [`Display`](../interfaces/components_displays.Display.md)[] ; `success`: `boolean`  }\>

QueryDisplays finds all displays that are connected to the computer,
searches for Looking Glass displays, and returns them as an array of Display objects

#### Returns

`Promise`<{ `response`: ``null`` \| [`Display`](../interfaces/components_displays.Display.md)[] ; `success`: `boolean`  }\>

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

### removeEventListener

▸ **removeEventListener**<`T`\>(`event`, `MessageHandler`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `MessageHandler` | (`event`: [`BridgeEventMap`](../modules/schemas_events.md#bridgeeventmap)[`T`]) => `void` |

#### Returns

`Promise`<`void`\>

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

▸ **showWindow**(`showWindow`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status } ; `success`: `boolean`  }\>

changes the state of the Looking Glass Bridge Window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `showWindow` | `boolean` | boolean, true to show the Looking Glass window, false to hide the Looking Glass window |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { type: "WSTRING"; value: string; name: string; } ; `status`: { type: "WSTRING"; value: "Completion" \| "Pending" \| "Failure" \| "UnknownOrchestration"; name: string; } = schema.status } ; `success`: `boolean`  }\>

___

### status

▸ **status**(): `Promise`<`boolean`\>

A helper function to check and see if Looking Glass Bridge is running or not.

#### Returns

`Promise`<`boolean`\>

boolean, true if Bridge is running, false if Bridge is not running

___

### getInstance

▸ `Static` **getInstance**(): [`BridgeClient`](client.BridgeClient.md)

#### Returns

[`BridgeClient`](client.BridgeClient.md)