[@lookingglass/bridge.js](../README.md) / [components/messageHandler](../modules/components_messageHandler.md) / SyncPlayPlaylistCompleteMessageHandler

# Class: SyncPlayPlaylistCompleteMessageHandler

[components/messageHandler](../modules/components_messageHandler.md).SyncPlayPlaylistCompleteMessageHandler

## Hierarchy

- [`MessageHandler`](components_messageHandler.MessageHandler.md)<``"Sync/Play Playlist Complete"``\>

  ↳ **`SyncPlayPlaylistCompleteMessageHandler`**

## Table of contents

### Constructors

- [constructor](components_messageHandler.SyncPlayPlaylistCompleteMessageHandler.md#constructor)

### Properties

- [bridgeEventName](components_messageHandler.SyncPlayPlaylistCompleteMessageHandler.md#bridgeeventname)
- [client](components_messageHandler.SyncPlayPlaylistCompleteMessageHandler.md#client)

### Methods

- [handle](components_messageHandler.SyncPlayPlaylistCompleteMessageHandler.md#handle)

## Constructors

### constructor

• **new SyncPlayPlaylistCompleteMessageHandler**(`args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `args` | `Object` |
| `args.client` | [`BridgeClient`](client.BridgeClient.md) |

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[constructor](components_messageHandler.MessageHandler.md#constructor)

## Properties

### bridgeEventName

• **bridgeEventName**: ``"Sync/Play Playlist Complete"``

#### Inherited from

[MessageHandler](components_messageHandler.MessageHandler.md).[bridgeEventName](components_messageHandler.MessageHandler.md#bridgeeventname)

___

### client

• **client**: [`BridgeClient`](client.BridgeClient.md)

#### Inherited from

[MessageHandler](components_messageHandler.MessageHandler.md).[client](components_messageHandler.MessageHandler.md#client)

## Methods

### handle

▸ **handle**(`message`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `message` | `Object` | `undefined` |
| `message.name` | `string` | `schema.name` |
| `message.orchestration` | { type: "WSTRING"; value: string; name: string; } | `undefined` |
| `message.payload` | { type: "VARIANT\_MAP"; value: { message: { type: "WSTRING"; value: string; name: string; }; event: { type: "WSTRING"; value: "Monitor Connect" \| "Monitor Disconnect" \| "Progress Start" \| "Progress Completion" \| ... 6 more ... \| "Sync/Play Playlist Cancelled"; name: string; }; progress: { ...; }; progress\_type: { ...... | `undefined` |

#### Returns

`void`

#### Overrides

[MessageHandler](components_messageHandler.MessageHandler.md).[handle](components_messageHandler.MessageHandler.md#handle)
