[@lookingglass/bridge](../README.md) / [client/BridgeClient](../modules/client_BridgeClient.md) / BridgeClient

# Class: BridgeClient

[client/BridgeClient](../modules/client_BridgeClient.md).BridgeClient

## Table of contents

### Constructors

- [constructor](client_BridgeClient.BridgeClient.md#constructor)

### Properties

- [currentPlaylistIndex](client_BridgeClient.BridgeClient.md#currentplaylistindex)
- [currentPlaylistItemIndex](client_BridgeClient.BridgeClient.md#currentplaylistitemindex)
- [isCastPending](client_BridgeClient.BridgeClient.md#iscastpending)
- [isConnected](client_BridgeClient.BridgeClient.md#isconnected)
- [isDisconnecting](client_BridgeClient.BridgeClient.md#isdisconnecting)
- [manualDisconnect](client_BridgeClient.BridgeClient.md#manualdisconnect)
- [playState](client_BridgeClient.BridgeClient.md#playstate)
- [playlists](client_BridgeClient.BridgeClient.md#playlists)
- [version](client_BridgeClient.BridgeClient.md#version)
- [eventsource](client_BridgeClient.BridgeClient.md#eventsource)
- [fallback](client_BridgeClient.BridgeClient.md#fallback)
- [instance](client_BridgeClient.BridgeClient.md#instance)
- [verbosity](client_BridgeClient.BridgeClient.md#verbosity)

### Methods

- [addEventListener](client_BridgeClient.BridgeClient.md#addeventlistener)
- [apiVersion](client_BridgeClient.BridgeClient.md#apiversion)
- [cast](client_BridgeClient.BridgeClient.md#cast)
- [connect](client_BridgeClient.BridgeClient.md#connect)
- [createAutoStartPlaylist](client_BridgeClient.BridgeClient.md#createautostartplaylist)
- [createOrchestration](client_BridgeClient.BridgeClient.md#createorchestration)
- [deletePlaylist](client_BridgeClient.BridgeClient.md#deleteplaylist)
- [disconnect](client_BridgeClient.BridgeClient.md#disconnect)
- [error](client_BridgeClient.BridgeClient.md#error)
- [getAutoStartPlaylist](client_BridgeClient.BridgeClient.md#getautostartplaylist)
- [getCurrentHologram](client_BridgeClient.BridgeClient.md#getcurrenthologram)
- [getCurrentPlaylist](client_BridgeClient.BridgeClient.md#getcurrentplaylist)
- [getDisplays](client_BridgeClient.BridgeClient.md#getdisplays)
- [getVerbosity](client_BridgeClient.BridgeClient.md#getverbosity)
- [getVersion](client_BridgeClient.BridgeClient.md#getversion)
- [log](client_BridgeClient.BridgeClient.md#log)
- [next](client_BridgeClient.BridgeClient.md#next)
- [pause](client_BridgeClient.BridgeClient.md#pause)
- [play](client_BridgeClient.BridgeClient.md#play)
- [playRemotePlaylist](client_BridgeClient.BridgeClient.md#playremoteplaylist)
- [playStudioPlaylist](client_BridgeClient.BridgeClient.md#playstudioplaylist)
- [previous](client_BridgeClient.BridgeClient.md#previous)
- [removeEventListener](client_BridgeClient.BridgeClient.md#removeeventlistener)
- [seek](client_BridgeClient.BridgeClient.md#seek)
- [setAutoStartPlaylist](client_BridgeClient.BridgeClient.md#setautostartplaylist)
- [setVerbosity](client_BridgeClient.BridgeClient.md#setverbosity)
- [showWindow](client_BridgeClient.BridgeClient.md#showwindow)
- [status](client_BridgeClient.BridgeClient.md#status)
- [stopStudioPlaylist](client_BridgeClient.BridgeClient.md#stopstudioplaylist)
- [time](client_BridgeClient.BridgeClient.md#time)
- [timeEnd](client_BridgeClient.BridgeClient.md#timeend)
- [updateCurrentHologram](client_BridgeClient.BridgeClient.md#updatecurrenthologram)
- [warn](client_BridgeClient.BridgeClient.md#warn)
- [getInstance](client_BridgeClient.BridgeClient.md#getinstance)

## Constructors

### constructor

• **new BridgeClient**()

## Properties

### currentPlaylistIndex

• **currentPlaylistIndex**: `number`

The index of playlists that is currently active

___

### currentPlaylistItemIndex

• **currentPlaylistItemIndex**: `number`

The index of the playlist Item that is currently active

___

### isCastPending

• **isCastPending**: `boolean` = `false`

store if we're currently in the middle of a cast

___

### isConnected

• **isConnected**: `boolean`

A boolean that stores if the Bridge session is valid or not
 If the orchestration is not valid, some functions will not work

___

### isDisconnecting

• **isDisconnecting**: `boolean`

A boolean for checking the status of the current disconnect event

___

### manualDisconnect

• **manualDisconnect**: `boolean` = `false`

a boolean for whether a disconnect was triggered automatically or manually

___

### playState

• **playState**: ``"PLAYING"`` \| ``"PAUSED"`` \| ``"STOPPED"`` = `"STOPPED"`

___

### playlists

• **playlists**: `undefined` \| [`Playlist`](playlists_playlist.Playlist.md)[]

an Array containing Playlists, we store this to easily switch between multiple playlists

___

### version

• **version**: [`BridgeVersion`](../modules/components_types.md#bridgeversion)

the version of the Looking Glass Driver that's running

___

### eventsource

▪ `Static` **eventsource**: [`BridgeEventSource`](components_eventsource.BridgeEventSource.md)

The websocket connection to Bridge's Event Source, this returns information from Bridge

___

### fallback

▪ `Static` **fallback**: `undefined` \| [`Fallback`](components_fallback.Fallback.md)

___

### instance

▪ `Static` **instance**: [`BridgeClient`](client_BridgeClient.BridgeClient.md)

the instance of the client that we create, BridgeClient is a singleton, there can only be one

___

### verbosity

▪ `Static` **verbosity**: ``0`` \| ``2`` \| ``1`` \| ``3``

control how often we log to the console, 3 is everything, 0 is nothing

## Methods

### addEventListener

▸ **addEventListener**<`T`\>(`event`, `MessageHandler`): `Promise`<`void`\>

Adds an event listener that returns a message from Bridge's websocket based event source.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `event` | `T` | the event to listen for |
| `MessageHandler` | (`event`: [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)[`T`]) => `void` | the function to call when the event is received |

#### Returns

`Promise`<`void`\>

___

### apiVersion

▸ **apiVersion**(): `Promise`<{ `response`: [`BridgeVersion`](../modules/components_types.md#bridgeversion) ; `success`: `boolean`  }\>

A helper function to get the version of the Looking Glass Bridge API

#### Returns

`Promise`<{ `response`: [`BridgeVersion`](../modules/components_types.md#bridgeversion) ; `success`: `boolean`  }\>

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

▸ **connect**(): `Promise`<{ `response`: { `orchestration`: `string` ; `version`: [`BridgeVersion`](../modules/components_types.md#bridgeversion)  } ; `success`: `boolean`  }\>

Attempt to connect to Looking Glass Bridge.

#### Returns

`Promise`<{ `response`: { `orchestration`: `string` ; `version`: [`BridgeVersion`](../modules/components_types.md#bridgeversion)  } ; `success`: `boolean`  }\>

___

### createAutoStartPlaylist

▸ **createAutoStartPlaylist**(`args`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

set a playlist to auto-start, requires that all files are local on the system

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.playlist` | [`Playlist`](playlists_playlist.Playlist.md) |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

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

▸ **deletePlaylist**(`playlist`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Delete the instance of the playlist from Bridge, this will stop the playlist from playing if it's active.

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlist` | [`Playlist`](playlists_playlist.Playlist.md) |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### disconnect

▸ **disconnect**(): `Promise`<{ `success`: `boolean`  }\>

Disconnect from Looking Glass Bridge, free up resources.

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### error

▸ **error**(`...messages`): `void`

Asbtraction for logging with verbosity setting

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `unknown`[] |

#### Returns

`void`

___

### getAutoStartPlaylist

▸ **getAutoStartPlaylist**(): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; playlist\_path: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Get the current playlist that is set to start automatically

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; playlist\_path: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### getCurrentHologram

▸ **getCurrentHologram**(): `undefined` \| [`HologramType`](../modules/components_hologram.md#hologramtype)

#### Returns

`undefined` \| [`HologramType`](../modules/components_hologram.md#hologramtype)

___

### getCurrentPlaylist

▸ **getCurrentPlaylist**(): `undefined` \| [`Playlist`](playlists_playlist.Playlist.md)

#### Returns

`undefined` \| [`Playlist`](playlists_playlist.Playlist.md)

___

### getDisplays

▸ **getDisplays**(): `Promise`<{ `response`: ``null`` \| [`Display`](../interfaces/components_displays.Display.md)[] ; `success`: `boolean`  }\>

getDisplays finds all displays that are connected to the computer,
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

▸ **getVersion**(): `Promise`<{ `response`: [`BridgeVersion`](../modules/components_types.md#bridgeversion) ; `success`: `boolean`  }\>

A helper function to get the version of Looking Glass Bridge that is running.

#### Returns

`Promise`<{ `response`: [`BridgeVersion`](../modules/components_types.md#bridgeversion) ; `success`: `boolean`  }\>

string of the version of Looking Glass Bridge that is running

___

### log

▸ **log**(`...messages`): `void`

Asbtraction for logging with verbosity setting

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `unknown`[] |

#### Returns

`void`

___

### next

▸ **next**(): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Got to the next playlist item

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### pause

▸ **pause**(): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Pause the currently playing playlist

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### play

▸ **play**(): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Play the currently instanced playlist

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### playRemotePlaylist

▸ **playRemotePlaylist**(`holograms`, `index?`): `Promise`<{ `success`: `boolean` = false }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `holograms` | [`HologramType`](../modules/components_hologram.md#hologramtype)[] | `undefined` |
| `index` | `number` | `0` |

#### Returns

`Promise`<{ `success`: `boolean` = false }\>

___

### playStudioPlaylist

▸ **playStudioPlaylist**(`playlistPath`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { message: { value: string; name: string; type: "WSTRING"; }; id?: { value: string; name: string; type: "WSTRING"; } \| undefined; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Play a Playlist created by Looking Glass Studio, requires the full path to the playlist.json file.

#### Parameters

| Name | Type |
| :------ | :------ |
| `playlistPath` | `string` |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { message: { value: string; name: string; type: "WSTRING"; }; id?: { value: string; name: string; type: "WSTRING"; } \| undefined; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### previous

▸ **previous**(): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Go to the previous playlist item

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### removeEventListener

▸ **removeEventListener**<`T`\>(`event`, `MessageHandler`): `Promise`<`void`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `T` |
| `MessageHandler` | (`event`: [`BridgeEventMap`](../modules/schemas_schema_events.md#bridgeeventmap)[`T`]) => `void` |

#### Returns

`Promise`<`void`\>

___

### seek

▸ **seek**(`index`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Seek to a specific item in a playlist

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### setAutoStartPlaylist

▸ **setAutoStartPlaylist**(`args`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Choose a Playlist that exists on the local file system to set as the start up playlist

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.playlistName` | `string` |
| `args.playlistPath` | `string` |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `payload`: { value: { playlist\_name: { value: string; name: string; type: "WSTRING"; }; }; name: string; type: "VARIANT\_MAP"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

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

▸ **showWindow**(`showWindow`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

changes the state of the Looking Glass Bridge Window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `showWindow` | `boolean` | boolean, true to show the Looking Glass window, false to hide the Looking Glass window |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### status

▸ **status**(): `Promise`<`boolean`\>

A helper function to check and see if Looking Glass Bridge is running or not.

#### Returns

`Promise`<`boolean`\>

boolean, true if Bridge is running, false if Bridge is not running

___

### stopStudioPlaylist

▸ **stopStudioPlaylist**(): `Promise`<{ `success`: `boolean`  }\>

stop playing the studio playlist

#### Returns

`Promise`<{ `success`: `boolean`  }\>

___

### time

▸ **time**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

`void`

___

### timeEnd

▸ **timeEnd**(`label`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `label` | `string` |

#### Returns

`void`

___

### updateCurrentHologram

▸ **updateCurrentHologram**<`T`\>(`«destructured»`): `Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

Update the parameters of the current hologram

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends ``"focus"`` \| ``"aspect"`` \| ``"cols"`` \| ``"rows"`` \| ``"crop_pos_x"`` \| ``"crop_pos_y"`` \| ``"zoom"`` \| ``"filter_mode"`` \| ``"gaussian_sigma"`` \| ``"depth_loc"`` \| ``"depth_inversion"`` \| ``"chroma_depth"`` \| ``"depthiness"`` \| ``"depth_cutoff"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `Object` |
| › `name` | `string` |
| › `parameter` | `T` |
| › `value` | { `aspect?`: `number` ; `chroma_depth`: ``0`` \| ``1`` ; `cols?`: `number` ; `crop_pos_x?`: `number` ; `crop_pos_y?`: `number` ; `depth_cutoff?`: ``0`` \| ``1`` ; `depth_inversion`: ``0`` \| ``1`` ; `depth_loc`: ``0`` \| ``2`` \| ``1`` \| ``3`` ; `depthiness`: `number` = DEPTHINESS.range; `filter_mode`: `number` = FILTER\_MODE.range; `focus?`: `number` ; `gaussian_sigma`: `number` = GAUSSIAN\_SIGMA.range; `rows?`: `number` ; `zoom`: `number` = ZOOM.range }[`T`] |

#### Returns

`Promise`<{ `response`: ``null`` \| { `name`: `string` = schema.name; `orchestration`: { value: string; name: string; type: "WSTRING"; } ; `status`: { value: "Completion" \| "UnknownOrchestration" \| "Pending" \| "Failure"; name: string; type: "WSTRING"; } = schema.status } ; `success`: `boolean`  }\>

___

### warn

▸ **warn**(`...messages`): `void`

Asbtraction for logging with verbosity setting

#### Parameters

| Name | Type |
| :------ | :------ |
| `...messages` | `unknown`[] |

#### Returns

`void`

___

### getInstance

▸ `Static` **getInstance**(): [`BridgeClient`](client_BridgeClient.BridgeClient.md)

#### Returns

[`BridgeClient`](client_BridgeClient.BridgeClient.md)
