[@lookingglass/bridge.js](../README.md) / BridgeClient

# Class: BridgeClient

BridgeClient is the main class for interacting with Looking Glass Bridge.
The BridgeClient will attempt to join an orchestration called "default" when it is created.
If the "default" orchestration does not exist, it will be created.
If the BridgeClient is unable to connect to Bridge, it will not create an orchestration.
You can manually call CreateOrchestration() to create an orchestration.
This is useful if Bridge was not running when the class was created.

## Table of contents

### Constructors

- [constructor](BridgeClient.md#constructor)

### Properties

- [instance](BridgeClient.md#instance)
- [verbosity](BridgeClient.md#verbosity)

### Methods

- [addEventListener](BridgeClient.md#addeventlistener)
- [apiVersion](BridgeClient.md#apiversion)
- [cast](BridgeClient.md#cast)
- [createOrchestration](BridgeClient.md#createorchestration)
- [createPlaylist](BridgeClient.md#createplaylist)
- [deletePlaylist](BridgeClient.md#deleteplaylist)
- [displays](BridgeClient.md#displays)
- [getVerbosity](BridgeClient.md#getverbosity)
- [initializeEventSource](BridgeClient.md#initializeeventsource)
- [play](BridgeClient.md#play)
- [query](BridgeClient.md#query)
- [setVerbosity](BridgeClient.md#setverbosity)
- [showWindow](BridgeClient.md#showwindow)
- [version](BridgeClient.md#version)
- [getInstance](BridgeClient.md#getinstance)

## Constructors

### constructor

• **new BridgeClient**()

## Properties

### instance

▪ `Static` **instance**: `any`

___

### verbosity

▪ `Static` **verbosity**: ``0`` \| ``1`` \| ``2`` \| ``3`` = `3`

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

▸ **apiVersion**(): `Promise`<`any`\>

A helper function to get the version of the Looking Glass Bridge API

#### Returns

`Promise`<`any`\>

the current version of the Looking Glass API

___

### cast

▸ **cast**(`playlistItem`): `Promise`<`void`\>

Casting a hologram requires some pretty specific behavior to work with Bridge' new playlist api.
This function will alternate between two playlists so that you can cast a new hologram without interrupting the current one.

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlistItem` | [`PlaylistItemType`](../interfaces/PlaylistItemType.md) |

#### Returns

`Promise`<`void`\>

___

### createOrchestration

▸ **createOrchestration**(`name`): `Promise`<`undefined` \| `string`\>

Creates an orchestration called "default" if one does not already exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

string, the name of the current orchestration

___

### createPlaylist

▸ **createPlaylist**(`name`): [`Playlist`](Playlist.md)

A helper function to create a new Playlist object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the playlist |

#### Returns

[`Playlist`](Playlist.md)

___

### deletePlaylist

▸ **deletePlaylist**(`playlist`): `Promise`<`any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlist` | [`Playlist`](Playlist.md) |

#### Returns

`Promise`<`any`\>

___

### displays

▸ **displays**(): `Promise`<``false`` \| `Display`[]\>

QueryDisplays finds all displays that are connected to the computer,
searches for Looking Glass displays, and returns them as an array of Display objects

#### Returns

`Promise`<``false`` \| `Display`[]\>

the display object

___

### getVerbosity

▸ **getVerbosity**(): ``0`` \| ``1`` \| ``2`` \| ``3``

#### Returns

``0`` \| ``1`` \| ``2`` \| ``3``

___

### initializeEventSource

▸ **initializeEventSource**(): `void`

Connect to Looking Glass Bridge's EventSource.
The event source is a websocket connection that will send events from Bridge to the client.

#### Returns

`void`

the bridge event source

___

### play

▸ **play**(`«destructured»`): `Promise`<`boolean`\>

this function will play a playlist on a Looking Glass display
the playlist must be created and populated with content before calling this function

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | [`PlaylistArgs`](../interfaces/PlaylistArgs.md) |

#### Returns

`Promise`<`boolean`\>

___

### query

▸ **query**(): `Promise`<`boolean`\>

A helper function to check and see if Looking Glass Bridge is running or not.

#### Returns

`Promise`<`boolean`\>

boolean, true if Bridge is running, false if Bridge is not running

___

### setVerbosity

▸ **setVerbosity**(`verbosity`): `void`

Set the level of console logging that Bridge.js library will do.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `verbosity` | ``0`` \| ``1`` \| ``2`` \| ``3`` | 0 = no logging, 1 = errors only, 2 = only bridge values, 3 = full bridge response |

#### Returns

`void`

___

### showWindow

▸ **showWindow**(`showWindow`): `Promise`<`undefined` \| ``false``\>

changes the state of the Looking Glass Bridge Window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `showWindow` | `boolean` | boolean, true to show the Looking Glass window, false to hide the Looking Glass window |

#### Returns

`Promise`<`undefined` \| ``false``\>

___

### version

▸ **version**(): `Promise`<`string` \| `boolean`\>

A helper function to get the version of Looking Glass Bridge that is running.

#### Returns

`Promise`<`string` \| `boolean`\>

string of the version of Looking Glass Bridge that is running

___

### getInstance

▸ `Static` **getInstance**(): `any`

#### Returns

`any`
